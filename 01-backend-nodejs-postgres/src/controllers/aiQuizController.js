const axios = require("axios");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const quizModel = require("../models/quizModel");
const folderQuizModel = require("../models/folderQuizModel");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// 1. Extract text from image
async function extractTextFromImage(imagePath) {
    const base64 = fs.readFileSync(imagePath, { encoding: "base64" });
    const body = {
        requests: [
            {
                image: { content: base64 },
                features: [{ type: "TEXT_DETECTION" }],
            },
        ],
    };

    const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`,
        body
    );

    return response.data.responses[0]?.fullTextAnnotation?.text || "";
}

// 2. Extract from file
async function extractTextFromFile(filePath, mimeType) {
    if (mimeType === "application/pdf") {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        return data.text;
    }
    if (
        mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

    throw new Error("Unsupported file type");
}

// 3. Generate quizzes
async function generateQuizzes(text, count) {
    const prompt = `
Tôi sẽ cung cấp một đoạn văn bản. Hãy tạo ra ${count} câu hỏi trắc nghiệm để giúp người học ôn luyện kiến thức.

Yêu cầu:
- Mỗi câu hỏi có:
  - "question": câu hỏi rõ ràng, ngắn gọn.
  - "choices": mảng gồm 4 đáp án.
  - "answer": chỉ rõ đáp án đúng, khớp 1 trong 4 lựa chọn.
- Trả về kết quả dưới dạng MẢNG JSON:
[
  {
    "question": "Câu hỏi?",
    "choices": ["A", "B", "C", "D"],
    "answer": "A"
  },
  ...
]

Nội dung văn bản:
"""
${text}
"""
`;

    try {
        const result = await model.generateContent(prompt);
        const raw = result.response.text();
        const match = raw.match(/\[\s*{[\s\S]*?}\s*\]/);
        if (!match) throw new Error("Không trích được JSON.");

        const questions = JSON.parse(match[0]);
        return questions.slice(0, count);
    } catch (err) {
        console.error("❌ Lỗi tạo quiz:", err.message);
        return [];
    }
}

// 🧠 Từ văn bản
exports.generateQuizFromText = async (req, res) => {
    try {
        const { content, count, folder_id } = req.body;
        if (!content || !folder_id) return res.status(400).json({ error: "Thiếu nội dung hoặc folder_id." });

        const quizzes = await generateQuizzes(content, count);
        const saved = [];

        for (const q of quizzes) {
            const inserted = await quizModel.insertQuiz({
                folder_id,
                question: q.question,
                choices: q.choices,
                answer: q.answer
            });
            saved.push(inserted);
        }

        await folderQuizModel.updateQuizCount(folder_id);
        res.status(200).json(saved);
    } catch (err) {
        console.error("❌ Lỗi AI Text Quiz:", err);
        res.status(500).json({ error: "Lỗi server." });
    }
};

// 📁 Từ file (PDF/DOC/IMG)
exports.generateQuizFromFile = async (req, res) => {
    try {
        const file = req.file;
        const folder_id = req.body.folder_id;
        // const count = parseInt(req.body.count) || 10;

        if (!file || !folder_id) return res.status(400).json({ error: "Thiếu file hoặc folder_id." });

        let text = "";
        const mime = file.mimetype;

        if (mime.startsWith("image/")) {
            text = await extractTextFromImage(file.path);
        } else if (mime.includes("pdf") || mime.includes("word") || mime.includes("officedocument")) {
            text = await extractTextFromFile(file.path, mime);
        } else {
            return res.status(400).json({ error: "Định dạng file không được hỗ trợ." });
        }

        const quizzes = await generateQuizzes(text, count);
        const saved = [];

        for (const q of quizzes) {
            const inserted = await quizModel.insertQuiz({
                folder_id,
                question: q.question,
                choices: q.choices,
                answer: q.answer
            });
            saved.push(inserted);
        }

        await folderQuizModel.updateQuizCount(folder_id);
        res.status(200).json(saved);
    } catch (err) {
        console.error("❌ Lỗi AI File Quiz:", err);
        res.status(500).json({ error: "Lỗi xử lý quiz từ file." });
    } finally {
        if (req.file?.path) fs.unlink(req.file.path, () => { });
    }
};
