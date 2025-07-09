const { generateFlashcardsWithCohere } = require("../services/cohere.service");
const { parseTextFromFile } = require("../services/fileParser.service")
exports.handleFileUpload = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ error: "Không có file nào được truyền vào." });
        }
        const text = await parseTextFromFile(req.file);
        const cardCount = Number(req.body.cardCount) || 5;
        const flashcards = await generateFlashcardsWithGemini(text, cardCount);
        res.json(flashcards);
    } catch (error) {
        console.error("AI flashcard error:", error);
        res.status(500).json({ error: "Lỗi tạo flashcard" });
    }
};

exports.handleTextInput = async (req, res) => {
    try {
        const { text } = req.body;
        const flashcards = await generateFlashcardsWithGemini(text);
        res.json(flashcards);
    } catch (error) {
        console.error("Text input AI error:", error);
        res.status(500).json({ error: "Lỗi tạo flashcard từ văn bản" });
    }
};
