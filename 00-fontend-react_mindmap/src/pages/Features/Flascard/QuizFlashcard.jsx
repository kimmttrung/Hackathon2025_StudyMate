import { useState, useEffect } from "react";
import axios from "@/utils/axios.customize";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // nếu dùng react-router


export default function QuizFlashcard({ testId, folderId }) {
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleConfirmExit = () => {
        setIsOpen(false);
        navigate("/user/flashcards"); // ví dụ về lại trang chính
    };

    const getDurationInSeconds = () => {
        switch (testId) {
            case 1: return 5 * 60;
            case 2: return 15 * 60;
            case 3: return 40 * 60;
            default: return 15 * 60;
        }
    };
    const [timeLeft, setTimeLeft] = useState(getDurationInSeconds());
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleAnswer = (qId, aIndex) => {
        setAnswers({ ...answers, [qId]: aIndex });
    };

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

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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
                        <div className="text-sm text-gray-600 mb-4 flex justify-between items-center">
                            <div>⏰ Còn lại: <span className="font-medium text-red-600">{formatTime(timeLeft)}</span></div>
                            <div>📌 Đã làm: {Object.keys(answers).length}/{quizData.length}</div>
                        </div>

                        <div className="grid grid-cols-5 gap-x-4 gap-y-4 justify-center">
                            {quizData.map((q, idx) => (
                                <Button
                                    key={q.id}
                                    className={`w-12 h-12 rounded-full text-base font-semibold border-2 ${answers[q.id] !== undefined
                                        ? "bg-green-500 text-white border-green-600"
                                        : "border-gray-300"
                                        }`}
                                    variant="ghost"
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
                    Nộp bài
                </Button>
                <Button
                    variant="outline"
                    className="bg-red-600 text-white hover:bg-red-700 px-4 w-full"
                    onClick={() => setIsOpen(true)}
                >
                    Thoát kiểm tra
                </Button>
                <Card className="border border-pink-200 bg-pink-50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center justify-center gap-2 text-pink-700">
                            🌸 Mẹo học nhẹ nhàng như hoa anh đào
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-700 space-y-2 text-center">
                        <p>Học mỗi ngày một chút, như cánh hoa rơi nhẹ – đều đặn và bền bỉ.</p>
                        <ul className="list-disc list-inside text-left text-pink-800">
                            <li>⏱ Luyện quiz nhanh – tối đa 10 phút</li>
                            <li>🧠 Nhắc lại flashcard 3 lần/ngày</li>
                            <li>📅 Đặt lịch học cố định mỗi sáng</li>
                        </ul>
                        <img
                            src="https://topanh.com/wp-content/uploads/2024/02/anh-anime-cute-01.jpg"
                            alt="Sakura Branch"
                            className="w-20 h-20 mx-auto mt-4"
                        />
                    </CardContent>
                </Card>

            </div>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold text-red-600">⚠️ Bạn có chắc chắn muốn thoát?</h2>
                        <p className="text-sm text-gray-600 mt-2">Kết quả kiểm tra sẽ <span className="text-red-500 font-semibold">không được lưu lại</span>.</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="ghost" onClick={() => setIsOpen(false)}>Hủy</Button>
                            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={handleConfirmExit}>
                                Thoát
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
