const axios = require("axios");
const path = require("path");
const flashcardModel = require("../models/flashcardModel");
require("dotenv").config();
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// 1. OCR IMAGE bằng Google Cloud Vision API
async function extractTextFromImage(imagePath) {
    const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

    const body = {
        requests: [
            {
                image: { content: imageBase64 },
                features: [{ type: "TEXT_DETECTION" }],
            },
        ],
    };

    const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
        body
    );

    return response.data.responses[0]?.fullTextAnnotation?.text || "";
}

// 2. Trích text từ file PDF/DOC
async function extractTextFromFile(filePath, mimeType) {
    if (mimeType === "application/pdf") {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        return data.text;
    }

    if (
        mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

    throw new Error("Unsupported file type");
}

// 3. Tạo flashcard từ văn bản (giả lập AI hoặc tích hợp OpenAI/Gemini)

async function generateFlashcards(text, count) {
    const prompt = `
Tôi sẽ cung cấp một đoạn văn bản. Hãy tạo ra ${count} flashcards để giúp người học ghi nhớ nội dung.

Yêu cầu:
- Mỗi flashcard có:
  - "front": câu hỏi ngắn gọn, súc tích, liên quan nội dung.
  - "back": câu trả lời rõ ràng, đúng trọng tâm.
- Trả về MẢNG JSON đúng định dạng: 
[
  { "front": "Câu hỏi 1", "back": "Câu trả lời 1" },
  ...
]

Nội dung văn bản:
"""
${text}
"""
`;

    try {
        const result = await model.generateContent(prompt);
        const raw = result.response.text(); // Trả về kiểu text thường

        // ✅ Cố gắng trích JSON Array từ text
        const jsonMatch = raw.match(/\[\s*{[\s\S]*?}\s*\]/);
        if (!jsonMatch) throw new Error("Không tìm thấy định dạng JSON phù hợp.");

        const flashcards = JSON.parse(jsonMatch[0]);
        if (Array.isArray(flashcards)) {
            return flashcards.slice(0, count);
        } else {
            throw new Error("Kết quả không phải mảng JSON hợp lệ.");
        }
    } catch (err) {
        console.error("❌ Lỗi khi tạo flashcard từ Gemini:", err.message);
        return [];
    }
}

// 🧠 Từ input TEXT
exports.handleTextInput = async (req, res) => {
    try {
        const { content, count } = req.body;

        if (!content) return res.status(400).json({ error: "Thiếu nội dung." });

        const flashcards = await generateFlashcards(content, count);
        res.status(200).json({ flashcards });
    } catch (error) {
        console.error("Lỗi AI (Text):", error);
        res.status(500).json({ error: "Lỗi xử lý nội dung bằng AI." });
    }
};

// 📁 Từ FILE (PDF, DOC, IMAGE)
exports.handleFileUpload = async (req, res) => {
    try {
        const file = req.file;
        const count = parseInt(req.body.cardCount) || 10;
        console.log("Card count request:", req.body.cardCount);
        const folder_id = req.body.folder_id; // 👈 phải truyền từ FE

        if (!file) return res.status(400).json({ error: "Chưa có file." });
        if (!folder_id) return res.status(400).json({ error: "Thiếu folder_id." });

        const mimetype = file.mimetype;
        let text = "";

        if (mimetype.startsWith("image/")) {
            text = await extractTextFromImage(file.path);
        } else if (
            mimetype === "application/pdf" ||
            mimetype === "application/msword" ||
            mimetype.includes("officedocument")
        ) {
            text = await extractTextFromFile(file.path, mimetype);
        } else {
            return res.status(400).json({ error: "Định dạng file không hỗ trợ." });
        }

        const aiFlashcards = await generateFlashcards(text, count); // [{ front, back }]

        console.log("check aiFlashcards", aiFlashcards);

        // Cắt bớt nếu Gemini trả nhiều hơn yêu cầu
        const limitedFlashcards = aiFlashcards.slice(0, count);

        const savedFlashcards = [];

        for (const fc of limitedFlashcards) {
            const saved = await flashcardModel.insertFlashcard({
                folder_id,
                front_text: fc.front,
                back_text: fc.back,
            });
            savedFlashcards.push(saved);
        }

        return res.status(200).json(savedFlashcards);
    } catch (error) {
        console.error("Lỗi AI (Upload):", error);
        res.status(500).json({ error: "Lỗi xử lý AI khi tạo flashcards." });
    } finally {
        if (req.file?.path) {
            fs.unlink(req.file.path, () => { });
        }
    }
};
