import { Badge } from "@/components/ui/badge";
import { Activity, Timer, Award } from "lucide-react";

export function Header({ totalTimeSpent, totalSessions }) {
    return (
        <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Lịch sử học tập
                            </h1>
                            <p className="text-sm text-gray-600">Theo dõi chi tiết quá trình học của bạn</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="px-3 py-1">
                            <Timer className="h-4 w-4 mr-1" />
                            {totalTimeSpent}p tổng
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                            <Award className="h-4 w-4 mr-1" />
                            {totalSessions} phiên
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}
