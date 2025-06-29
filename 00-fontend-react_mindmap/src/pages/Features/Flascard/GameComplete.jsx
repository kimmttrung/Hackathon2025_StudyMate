import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Target, RotateCcw, Home, Star } from "lucide-react";

export default function GameComplete() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;

    useEffect(() => {
        if (!state) {
            navigate("/user/flascards");
        }
    }, [state, navigate]);

    if (!state) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">
                        Không có dữ liệu trò chơi
                    </p>
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Về trang chủ
                    </Button>
                </div>
            </div>
        );
    }

    const { won, stats, folderName, folderId } = state;
    const completionPercentage = Math.round(
        (stats.matchedPairs / (stats.totalCards / 2)) * 100,
    );
    const timeUsed = stats.totalTime - stats.timeRemaining;
    const timeUsedMinutes = Math.floor(timeUsed / 60);
    const timeUsedSeconds = timeUsed % 60;

    const getPerformanceRating = () => {
        if (won && stats.attempts <= stats.matchedPairs * 1.2) return "Xuất sắc!";
        if (won && stats.attempts <= stats.matchedPairs * 1.5) return "Rất tốt!";
        if (won) return "Tốt!";
        if (completionPercentage >= 80) return "Gần thành công!";
        if (completionPercentage >= 50) return "Cố gắng thêm!";
        return "Thử lại nhé!";
    };

    const getStarRating = () => {
        if (won && stats.attempts <= stats.matchedPairs * 1.2) return 3;
        if (won && stats.attempts <= stats.matchedPairs * 1.5) return 2;
        if (won) return 1;
        return 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Result Header */}
                    <div className="text-center mb-8">
                        <div className={`text-8xl mb-4 ${won ? "animate-bounce" : ""}`}>
                            {won ? "🎉" : "⏰"}
                        </div>

                        <h1
                            className={`text-4xl font-bold mb-2 ${won ? "text-green-600" : "text-orange-600"
                                }`}
                        >
                            {won ? "Chúc mừng!" : "Hết giờ!"}
                        </h1>

                        <p className="text-xl text-gray-600 mb-4">
                            {won
                                ? "Bạn đã hoàn thành thử thách!"
                                : "Thời gian đã hết, thử lại nhé!"}
                        </p>

                        <div className="flex items-center justify-center gap-1 mb-4">
                            {[1, 2, 3].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-8 w-8 ${star <= getStarRating()
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="text-lg font-semibold text-purple-600">
                            {getPerformanceRating()}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Progress Card */}
                        <div className="bg-white rounded-2xl shadow-lg border p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="h-6 w-6 text-blue-500" />
                                <h3 className="text-lg font-semibold text-gray-800">Tiến độ</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Cặp đã ghép</span>
                                        <span>
                                            {stats.matchedPairs}/{stats.totalCards / 2}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${completionPercentage}%` }}
                                        />
                                    </div>
                                    <div className="text-right text-sm text-gray-600 mt-1">
                                        {completionPercentage}%
                                    </div>
                                </div>

                                <div className="text-center text-2xl font-bold text-blue-600">
                                    {stats.matchedPairs} cặp
                                </div>
                            </div>
                        </div>

                        {/* Time Card */}
                        <div className="bg-white rounded-2xl shadow-lg border p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="h-6 w-6 text-green-500" />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Thời gian
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-1">
                                        {timeUsedMinutes}:{String(timeUsedSeconds).padStart(2, "0")}
                                    </div>
                                    <div className="text-sm text-gray-600">Thời gian sử dụng</div>
                                </div>

                                {stats.timeRemaining > 0 && (
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-blue-600">
                                            {Math.floor(stats.timeRemaining / 60)}:
                                            {String(stats.timeRemaining % 60).padStart(2, "0")}
                                        </div>
                                        <div className="text-sm text-gray-600">Còn lại</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Trophy className="h-6 w-6 text-purple-500" />
                            <h3 className="text-lg font-semibold text-gray-800">
                                Thống kê chi tiết
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-800">
                                    {stats.attempts}
                                </div>
                                <div className="text-sm text-gray-600">Lượt thử</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-800">
                                    {stats.attempts > 0
                                        ? Math.round((stats.matchedPairs / stats.attempts) * 100)
                                        : 0}
                                    %
                                </div>
                                <div className="text-sm text-gray-600">Tỷ lệ thành công</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-800">
                                    {stats.totalCards}
                                </div>
                                <div className="text-sm text-gray-600">Tổng thẻ</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-800">
                                    {folderName}
                                </div>
                                <div className="text-sm text-gray-600">Chủ đề</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => navigate(`/user/flashcards/game/${folderId}`)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                        >
                            <RotateCcw className="h-5 w-5 mr-2" />
                            Chơi lại
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => navigate("/user/flashcards/game")}
                            className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
                        >
                            <Home className="h-5 w-5 mr-2" />
                            Chọn chủ đề khác
                        </Button>
                    </div>

                    {/* Motivational Message */}
                    <div className="text-center mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
                        <p className="text-gray-700">
                            {won
                                ? "🌟 Tuyệt vời! Trí nhớ của bạn thật ấn tượng. Hãy thử thách bản thân với chủ đề khác nhé!"
                                : "💪 Đừng bỏ cuộc! Mỗi lần chơi đều giúp cải thiện trí nhớ. Thử lại để đạt kết quả tốt hơn!"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
