import { Card, CardContent } from "@/components/ui/card";
import { Activity, Clock, Target, RotateCcw, Map } from "lucide-react";

export function StatisticsCards({ statistics }) {
    const {
        totalSessions,
        totalTimeSpent,
        averageQuizScore,
        totalFlashcardsReviewed,
        totalMindmapsCreated
    } = statistics;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm">Tổng phiên học</p>
                            <p className="text-2xl font-bold">{totalSessions}</p>
                        </div>
                        <Activity className="h-8 w-8 text-blue-200" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm">Thời gian học</p>
                            <p className="text-2xl font-bold">
                                {Math.floor(totalTimeSpent / 60)}h {totalTimeSpent % 60}p
                            </p>
                        </div>
                        <Clock className="h-8 w-8 text-purple-200" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm">Quiz trung bình</p>
                            <p className="text-2xl font-bold">{averageQuizScore}%</p>
                        </div>
                        <Target className="h-8 w-8 text-green-200" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100 text-sm">Flashcard ôn</p>
                            <p className="text-2xl font-bold">{totalFlashcardsReviewed}</p>
                        </div>
                        <RotateCcw className="h-8 w-8 text-orange-200" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-indigo-100 text-sm">Mindmap tạo</p>
                            <p className="text-2xl font-bold">{totalMindmapsCreated}</p>
                        </div>
                        <Map className="h-8 w-8 text-indigo-200" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
