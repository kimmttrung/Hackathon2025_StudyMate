require("dotenv").config();
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

exports.generateFlashcardsWithCohere = async (text, cardCount = 5) => {
    const prompt = `
Tạo ${cardCount} flashcard ngắn gọn bằng tiếng Việt từ đoạn văn sau.
Mỗi flashcard gồm 2 trường "front" và "back", trả dưới dạng JSON trong mảng [] như:
[
  { "front": "Câu hỏi 1", "back": "Trả lời 1" },
  { "front": "Câu hỏi 2", "back": "Trả lời 2" }
]
Chỉ trả JSON, không thêm chú thích.

Đoạn văn: """${text}"""
`;

    try {
        const response = await cohere.generate({
            model: "command",
            prompt,
            maxTokens: 800,
            temperature: 0.3,
            stopSequences: ["\n\n"]
        });

        const output = response.generations[0].text;
        console.log("🧠 Output từ Cohere:", output);

        // Cố gắng chỉ lấy đoạn JSON
        const start = output.indexOf("[");
        const end = output.lastIndexOf("]") + 1;
        const jsonRaw = output.slice(start, end);

        return JSON.parse(jsonRaw);
    } catch (error) {
        console.error("❌ Lỗi tạo flashcard với Cohere:", error);
        return [];
    }
};
