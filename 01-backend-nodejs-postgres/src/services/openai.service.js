// src/services/openai.service.js
require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.generateFlashcardsWithOpenAI = async (text, cardCount = 5) => {
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
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // hoặc "gpt-4" nếu có quyền
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.5
        });

        const output = completion.choices?.[0]?.message?.content || "";
        const jsonStart = output.indexOf("[");
        const jsonEnd = output.lastIndexOf("]") + 1;
        const jsonText = output.slice(jsonStart, jsonEnd);

        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Lỗi tạo flashcard với OpenAI:", error.response?.data || error.message);
        return [];
    }
};
