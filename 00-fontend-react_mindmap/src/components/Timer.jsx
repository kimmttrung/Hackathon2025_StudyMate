import { Clock } from "lucide-react";

export default function Timer({ timeRemaining, totalTime, isActive }) {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const percentage = (timeRemaining / totalTime) * 100;

    const getColorClass = () => {
        if (percentage > 50) return "text-green-600";
        if (percentage > 25) return "text-yellow-600";
        return "text-red-600";
    };

    const getProgressColor = () => {
        if (percentage > 50) return "bg-green-500";
        if (percentage > 25) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border">
            <div className="flex items-center gap-2">
                <Clock className={`h-6 w-6 ${getColorClass()}`} />
                <span className={`text-2xl font-bold ${getColorClass()}`}>
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </span>
            </div>

            <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor()}`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <div className="text-sm text-gray-600">
                {isActive ? "Đang chơi" : "Đã kết thúc"}
            </div>
        </div>
    );
}
