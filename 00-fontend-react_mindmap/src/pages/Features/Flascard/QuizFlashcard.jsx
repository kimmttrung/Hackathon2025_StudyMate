import { useState, useEffect } from "react";
import axios from "@/utils/axios.customize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuizFlashcard({ testId, folderId }) {
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchQuizData() {
            try {
                const res = await axios.get(`/api/flashcards/quiz/${folderId}`);
                // console.log("check quiz", res);
                setQuizData(res);
            } catch (err) {
                console.error("Error loading quiz data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchQuizData();
    }, [folderId]);

    const handleAnswer = (qId, aIndex) => {
        setAnswers({ ...answers, [qId]: aIndex });
    };

    const getDurationText = () => {
        switch (testId) {
            case 1: return "5 phút";
            case 2: return "15 phút";
            case 3: return "40 phút";
            default: return "15 phút";
        }
    };

    if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="md:col-span-2 space-y-6 max-h-[80vh] overflow-y-auto pr-2">
                {quizData.map((q, idx) => (
                    <Card key={q.id} id={`question-${q.id}`} className="border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Câu {idx + 1}: {q.question}
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
                                    <label htmlFor={`q${q.id}_a${index}`}>
                                        {String.fromCharCode(65 + index)}. {choice}
                                    </label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-base">📝 Bài kiểm tra từ vựng N3</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-600 mb-2">⏰ Thời gian: {getDurationText()}</div>
                        <div className="grid grid-cols-5 gap-2">
                            {quizData.map((q, idx) => (
                                <Button
                                    key={q.id}
                                    size="sm"
                                    variant={answers[q.id] !== undefined ? "default" : "outline"}
                                    onClick={() => {
                                        const el = document.getElementById(`question-${q.id}`);
                                        el?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                >
                                    {idx + 1}
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
