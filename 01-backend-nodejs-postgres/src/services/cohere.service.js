require("dotenv").config();
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

exports.generateFlashcardsWithCohere = async (text, cardCount = 2) => {
    const MAX_CHAR = 10000;
    const cleanText = text.length > MAX_CHAR ? text.slice(0, MAX_CHAR) : text;

    const prompt = `
Đọc đoạn văn sau và tạo đúng ${cardCount} flashcard tiếng Việt. 
Mỗi flashcard là một object gồm 2 trường: "front" và "back".
Trả về kết quả duy nhất dưới dạng JSON array []. Không viết thêm chữ nào khác.

Đoạn văn: """${cleanText}"""
`;

    try {
        const response = await cohere.generate({
            model: "command",
            prompt,
            maxTokens: 1000,
            temperature: 0.3,
            stopSequences: ["\n\n"]
        });

        const output = response.generations[0].text;
        console.log("🧠 Output từ Cohere:", output);

        const start = output.indexOf("[");
        const end = output.lastIndexOf("]") + 1;
        const jsonRaw = output.slice(start, end);

        try {
            return JSON.parse(output); // thử parse toàn bộ luôn trước
        } catch (e1) {
            try {
                const start = output.indexOf("[");
                const end = output.lastIndexOf("]") + 1;
                const jsonRaw = output.slice(start, end);
                return JSON.parse(jsonRaw); // nếu toàn bộ lỗi, thử cắt từ [ ] như cũ
            } catch (e2) {
                console.error("❌ JSON Parse Error:", e2.message);
                console.error("📦 Output lỗi:", output);
                return [];
            }
        }
    } catch (error) {
        console.error("❌ Lỗi tạo flashcard với Cohere:", error);
        return [];
    }
};
