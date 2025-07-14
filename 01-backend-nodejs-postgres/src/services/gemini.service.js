require("dotenv").config();
const axios = require("axios");

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.generateFlashcardsWithGemini = async (text, cardCount = 3) => {
    const prompt = `
Hãy đọc đoạn văn sau và tạo ra flashcards ngắn gọn bằng tiếng Việt. Mỗi flashcard có 2 trường: "front" và "back".
Yêu cầu:
- Tối đa ${cardCount} flashcards
- Trả kết quả dưới dạng JSON mảng, ví dụ:
[
  { "front": "Câu hỏi 1", "back": "Câu trả lời 1" },
  { "front": "Câu hỏi 2", "back": "Câu trả lời 2" }
]
- Trả về duy nhất JSON, không thêm chữ nào.

Đoạn văn: """${text}"""
`;

    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const jsonStart = rawText.indexOf("[");
        const jsonEnd = rawText.lastIndexOf("]") + 1;
        const jsonString = rawText.slice(jsonStart, jsonEnd);

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Lỗi tạo flashcard với Gemini:", error.response?.data || error.message);
        return [];
    }
};
