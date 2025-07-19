import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quizData = [
    {
        id: 1,
        question: "\u98df\u3079\u7269 (tabemono) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Ăn", "Đồ ăn", "Uống", "Đói"],
        correct: 1,
    },
    {
        id: 2,
        question: "\u884c\u304f (iku) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Đi", "Đến", "Ngủ", "Học"],
        correct: 0,
    },
    {
        id: 3,
        question: "\u6c17\u6301\u3061 (kimochi) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Cảm xúc", "Thời tiết", "Tâm hồn", "Cơ thể"],
        correct: 0,
    },
    {
        id: 4,
        question: "\u958b\u3051\u308b (akeru) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Đóng", "Mở", "Bật", "Tắt"],
        correct: 1,
    },
    {
        id: 5,
        question: "\u9759\u304b (shizuka) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Ồn ào", "Yên tĩnh", "Nhanh", "Chậm"],
        correct: 1,
    },
    {
        id: 6,
        question: "\u96e3\u3057\u3044 (muzukashii) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Dễ", "Khó", "Vui", "Buồn"],
        correct: 1,
    },
    {
        id: 7,
        question: "\u65b0\u3057\u3044 (atarashii) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Mới", "Cũ", "Lạ", "Khác"],
        correct: 0,
    },
    {
        id: 8,
        question: "\u53cb\u9054 (tomodachi) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Gia đình", "Người yêu", "Bạn bè", "Thầy cô"],
        correct: 2,
    },
    {
        id: 9,
        question: "\u4e0a\u624b (jouzu) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Giỏi", "Tệ", "Chậm", "Nhanh"],
        correct: 0,
    },
    {
        id: 10,
        question: "\u8fd1\u304f (chikaku) \u306e\u610f\u5473\u306f\uff1f",
        choices: ["Xa", "Gần", "Trên", "Dưới"],
        correct: 1,
    }
];

export default function QuizFlashcard({ testId }) {
    const [answers, setAnswers] = useState({});
    const [current, setCurrent] = useState(1);

    const handleAnswer = (qId, aIndex) => {
        setAnswers({ ...answers, [qId]: aIndex });
    };

    const getDurationText = () => {
        switch (testId) {
            case 1:
                return "5 phút";
            case 2:
                return "15 phút";
            case 3:
                return "40 phút";
            default:
                return "15 phút";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* LEFT: Questions */}
            <div className="md:col-span-2 space-y-6 max-h-[80vh] overflow-y-auto pr-2">
                {quizData.map((q) => (
                    <Card key={q.id} id={`question-${q.id}`} className="border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Câu {q.id}: {q.question}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {q.choices.map((choice, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id={`q${q.id}_a${index}`}
                                        name={`q${q.id}`}
                                        checked={answers[q.id] === index}
                                        onChange={() => handleAnswer(q.id, index)}
                                    />
                                    <label htmlFor={`q${q.id}_a${index}`}>{String.fromCharCode(65 + index)}. {choice}</label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* RIGHT: Summary Panel */}
            <div className="space-y-4">
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-base">📝 Bài kiểm tra từ vựng N3</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-600 mb-2">⏰ Thời gian: {getDurationText()}</div>
                        <div className="grid grid-cols-5 gap-2">
                            {quizData.map((q) => (
                                <Button
                                    key={q.id}
                                    size="sm"
                                    variant={answers[q.id] !== undefined ? "default" : "outline"}
                                    onClick={() => {
                                        const el = document.getElementById(`question-${q.id}`);
                                        el?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    {q.id}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                    ✅ Nộp bài
                </Button>
            </div>
        </div>
    );
}
