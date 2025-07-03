// import { Layout } from "@/components/Layout";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestTube, Clock, Target, Trophy, Play, BarChart } from "lucide-react";

const PracticeTest = () => {
    const testTypes = [
        {
            id: 1,
            name: "Kiểm tra nhanh",
            description: "Bài test 10 câu hỏi để kiểm tra kiến thức cơ bản",
            duration: "5 phút",
            questions: 10,
            difficulty: "Dễ",
            color: "bg-green-100 text-green-800",
            icon: Play,
        },
        {
            id: 2,
            name: "Kiểm tra toàn diện",
            description: "Bài test chi tiết với 25 câu hỏi từ tất cả chủ đề",
            duration: "15 phút",
            questions: 25,
            difficulty: "Trung bình",
            color: "bg-blue-100 text-blue-800",
            icon: Target,
        },
        {
            id: 3,
            name: "Thử thách chuyên sâu",
            description: "Bài test khó với 40 câu hỏi để thử thách bản thân",
            duration: "25 phút",
            questions: 40,
            difficulty: "Khó",
            color: "bg-red-100 text-red-800",
            icon: Trophy,
        },
    ];

    const recentTests = [
        { name: "Tiếng Anh Cơ Bản", score: 85, date: "Hôm nay" },
        { name: "Toán Học Lớp 12", score: 72, date: "Hôm qua" },
        { name: "Lịch Sử Việt Nam", score: 94, date: "2 ngày trước" },
    ];

    return (
        <Layout title="Bài Kiểm Tra">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 text-test-foreground">
                        <div className="w-12 h-12 rounded-xl bg-test flex items-center justify-center">
                            <TestTube className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold">Bài Kiểm Tra Thực Hành</h1>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Thử thách kiến thức của bạn với các bài kiểm tra được thiết kế để
                        đánh giá mức độ hiểu biết
                    </p>
                </div>

                {/* Test Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-test">23</div>
                            <div className="text-sm text-muted-foreground">
                                Bài test đã làm
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-primary">87%</div>
                            <div className="text-sm text-muted-foreground">
                                Điểm trung bình
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-accent">15</div>
                            <div className="text-sm text-muted-foreground">Streak ngày</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-create">5h 30m</div>
                            <div className="text-sm text-muted-foreground">Thời gian học</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Test Types */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold">Chọn loại bài kiểm tra</h2>

                        <div className="space-y-4">
                            {testTypes.map((test) => {
                                const IconComponent = test.icon;
                                return (
                                    <Card
                                        key={test.id}
                                        className="group cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg border-2 hover:border-test/50"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-test/20 flex items-center justify-center flex-shrink-0">
                                                    <IconComponent className="w-6 h-6 text-test-foreground" />
                                                </div>

                                                <div className="flex-1 space-y-3">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-lg">
                                                                {test.name}
                                                            </h3>
                                                            <p className="text-muted-foreground text-sm">
                                                                {test.description}
                                                            </p>
                                                        </div>
                                                        <Badge className={test.color}>
                                                            {test.difficulty}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{test.duration}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Target className="w-4 h-4" />
                                                            <span>{test.questions} câu hỏi</span>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        className="bg-test hover:bg-test/90 text-test-foreground"
                                                        size="sm"
                                                    >
                                                        Bắt đầu kiểm tra
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Tests & Statistics */}
                    <div className="space-y-6">
                        {/* Recent Tests */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart className="w-5 h-5" />
                                    Kết quả gần đây
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentTests.map((test, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                    >
                                        <div>
                                            <div className="font-medium text-sm">{test.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {test.date}
                                            </div>
                                        </div>
                                        <div
                                            className={`font-bold ${test.score >= 90
                                                ? "text-green-600"
                                                : test.score >= 70
                                                    ? "text-blue-600"
                                                    : "text-orange-600"
                                                }`}
                                        >
                                            {test.score}%
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Performance Tips */}
                        <Card className="bg-gradient-to-br from-test/10 to-primary/5 border-test/30">
                            <CardHeader>
                                <CardTitle className="text-test-foreground">
                                    Mẹo cải thiện
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2">
                                    <p className="text-sm">🎯 Tập trung vào các chủ đề yếu</p>
                                    <p className="text-sm">📚 Ôn tập đều đặn mỗi ngày</p>
                                    <p className="text-sm">⏰ Quản lý thời gian hiệu quả</p>
                                    <p className="text-sm">🔄 Làm bài test thường xuyên</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PracticeTest;
