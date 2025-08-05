import { useEffect, useState } from "react";
import axios from "@/utils/axios.customize";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import QuizCardList from "./QuizCardList";
import { Button } from "@/components/ui/button";

export default function ReviewPageQuiz() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const folder = location.state?.folder;

    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 phút

    // Fetch quiz list
    useEffect(() => {
        const fetchAllQuizzes = async () => {
            try {
                const res = await axios.get(`/api/quiz/folder/${id}`);
                if (res.quizzes) setQuizzes(res.quizzes);
            } catch (e) {
                console.error("Lỗi:", e);
            }
        };
        fetchAllQuizzes();
    }, [id]);

    // Countdown timer
    useEffect(() => {
        if (submitted) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [submitted]);

    const handleSelect = (quizId, option) => {
        setAnswers((prev) => ({ ...prev, [quizId]: option }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleReset = () => {
        setAnswers({});
        setSubmitted(false);
        setTimeLeft(600);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const formatTime = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    const score = Object.keys(answers).filter((id) => {
        const q = quizzes.find((q) => q.id === +id);
        return q && q.correct_option === answers[id];
    }).length;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-8">
            {/* LEFT SIDE: QUESTIONS */}
            <div className="lg:col-span-3 space-y-6">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    📘 Ôn tập: {folder?.name}
                </h1>
                {quizzes.map((quiz, index) => (
                    <div key={quiz.id} id={`question-${quiz.id}`}>
                        <QuizCardList
                            quiz={quiz}
                            index={index}
                            selected={answers[quiz.id]}
                            submitted={submitted}
                            onSelect={handleSelect}
                        />
                    </div>
                ))}
            </div>

            {/* RIGHT SIDE: PANEL */}
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50 sticky top-4 h-fit shadow-sm">
                <h2 className="text-3xl font-bold text-green-700 text-center">{folder?.name}</h2>

                {folder?.created_at && (
                    <p className="text-xs text-gray-500">
                        Ngày tạo:{" "}
                        {new Date(folder.created_at).toLocaleDateString("vi-VN")}
                    </p>
                )}

                <div className="text-sm text-gray-600">
                    ⏱ Còn lại: <span className="font-medium text-red-600">{formatTime(timeLeft)}</span>
                </div>

                <div className="text-sm text-gray-600">
                    🟢 Đã làm: {Object.keys(answers).length}/{quizzes.length}
                </div>

                {/* Câu hỏi lưới */}
                <div className="grid grid-cols-5 gap-2">
                    {quizzes.map((q, idx) => (
                        <button
                            key={q.id}
                            className={`w-10 h-10 rounded-full font-semibold text-sm border-2 transition-all hover:ring-2 hover:ring-green-300 ${answers[q.id]
                                ? "bg-green-500 text-white border-green-600"
                                : "border-gray-300"
                                }`}
                            onClick={() => {
                                const el = document.getElementById(`question-${q.id}`);
                                el?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>

                {!submitted ? (
                    <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleSubmit}
                    >
                        ✅ Nộp bài
                    </Button>
                ) : (
                    <Button
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={handleReset}
                    >
                        🔄 Làm lại bài
                    </Button>
                )}

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(-1)}
                >
                    ❌ Thoát ôn tập
                </Button>

                {submitted && (
                    <div className="space-y-4">
                        {/* Thông báo điểm */}
                        <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center">
                            ✅ Hoàn thành!<br />
                            Điểm: <strong>{score}/{quizzes.length}</strong>
                        </div>

                        {/* Nhận xét và số sao */}
                        <div className="p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg">
                            <h3 className="font-semibold text-lg mb-2">📊 Nhận xét:</h3>
                            <p>
                                {
                                    score / quizzes.length >= 0.9 ? "🌟 Xuất sắc! Bạn thật tuyệt vời!" :
                                        score / quizzes.length >= 0.75 ? "👍 Rất tốt! Tiếp tục phát huy nhé!" :
                                            score / quizzes.length >= 0.5 ? "👌 Ổn đấy, nhưng hãy luyện tập thêm!" :
                                                "💡 Đừng nản! Ôn tập lại và cố gắng lần sau nhé!"
                                }
                            </p>

                            {/* Số sao đánh giá */}
                            <div className="mt-2">
                                {
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i}>
                                            {i < Math.round((score / quizzes.length) * 5) ? "⭐" : "☆"}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Thẻ động lực học tập - ảnh lớn và căn giữa */}
                        <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg text-center gap-1">
                            <img
                                src="https://sohocmattroi.com/wp-content/uploads/2022/12/anh-chat-luong-cao-tao-dong-luc-cuoc-song.jpg"
                                alt="Cố gắng học tập"
                                className="mx-auto w-40 h-auto rounded-lg shadow-lg"
                            />
                            <h3 className="text-2xl font-bold text-blue-800 mt-4">🎯 Học nữa, học mãi!</h3>
                            <p className="text-blue-700 italic">“Không có áp lực, không có kim cương.”</p>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
