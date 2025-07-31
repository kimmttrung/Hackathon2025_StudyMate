const { generateFlashcardsWithCohere } = require("../services/cohere.service");
const { generateFlashcardsWithGemini } = require("../services/gemini.service");
const { generateFlashcardsWithOpenAI } = require("../services/openai.service");

const { parseTextFromFile } = require("../services/fileParser.service")
exports.handleFileUpload = async (req, res) => {
    try {
        console.log(">>> check req", req);
        console.log("📥 File nhận được:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "Không có file nào được truyền vào." });
        }
        const text = await parseTextFromFile(req.file);
        if (text.length < 50) return res.status(400).json({ error: "Không đọc được nội dung từ file." });

        console.log("📄 Text trích xuất:", text);

        const cardCount = Number(req.body.cardCount) || 5;
        const flashcards = await generateFlashcardsWithOpenAI(text, cardCount);
        res.json(flashcards);
    } catch (error) {
        console.error("AI flashcard error:", error);
        res.status(500).json({ error: "Lỗi tạo flashcard" });
    }
};

exports.handleTextInput = async (req, res) => {
    try {
        const { text } = req.body;
        console.log(">>> check text1", text);
        const flashcards = await generateFlashcardsWithOpenAI(text);
        res.json(flashcards);
    } catch (error) {
        console.error("Text input AI error:", error);
        res.status(500).json({ error: "Lỗi tạo flashcard từ văn bản" });
    }
};
