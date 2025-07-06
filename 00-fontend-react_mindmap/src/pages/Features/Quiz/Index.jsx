import { useNavigate } from "react-router-dom";

import {
    BookOpen,
    TestTube,
    PlusCircle,
    Gamepad,
    Layers3,
    Sparkles,
    Brain,
    Target,
    Trophy,
} from "lucide-react";
import { NavigationCard } from "@/components/NavigationCard";
import Layout from "@/components/Layout";
const QuizApp = () => {
    const navigate = useNavigate();

    const navigationOptions = [
        {
            title: "Tạo Câu Hỏi",
            description: "Upload tài liệu và tạo câu hỏi tự động bằng AI",
            icon: PlusCircle,
            path: "/user/quizs/create",
            className: "bg-create/20 border-create/30 hover:bg-create/30",
            iconColor: "bg-create text-create-foreground",
        },
        {
            title: "Ôn Tập",
            description: "Luyện tập với câu hỏi đã tạo, lặp lại thông minh giúp bạn nhớ lâu",
            icon: BookOpen,
            path: "/user/quizs/study",
            className: "bg-study/20 border-study/30 hover:bg-study/30",
            iconColor: "bg-study text-study-foreground",
        },
        {
            title: "Bài Kiểm Tra",
            description: "Thử thách kiến thức và xem lại kết quả chi tiết",
            icon: TestTube,
            path: "/test",
            className: "bg-test/20 border-test/30 hover:bg-test/30",
            iconColor: "bg-test text-test-foreground",
        },
        {
            title: "Trò Chơi",
            description: "Học tập qua trò chơi thú vị và tương tác",
            icon: Gamepad,
            path: "/games",
            className: "bg-review/20 border-review/30 hover:bg-review/30",
            iconColor: "bg-review text-review-foreground",
        },
    ];

    return (
        <Layout showBackButton={false}>
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-6 py-12">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-float">
                            <Layers3 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Quiz Master
                            </h1>
                            <div className="flex items-center gap-1 justify-center mt-2">
                                <Sparkles className="w-4 h-4 text-accent" />
                                <span className="text-sm text-muted-foreground">
                                    Design by MickeAI
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Tạo câu hỏi tự động, luyện tập, kiểm tra và chơi game - tất cả trong một nền tảng học tập thông minh.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span>Tạo câu hỏi bằng AI</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent"></div>
                            <span>Ôn tập lặp lại thông minh</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-test"></div>
                            <span>Chấm điểm và thống kê</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {navigationOptions.map((option, index) => (
                        <div
                            key={option.path}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <NavigationCard
                                title={option.title}
                                description={option.description}
                                icon={option.icon}
                                path={option.path}
                                className={option.className}
                                iconColor={option.iconColor}
                            />
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-card rounded-2xl border p-8 max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-primary">10,000+</div>
                            <div className="text-sm text-muted-foreground">
                                Câu hỏi đã tạo
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-accent">5,000+</div>
                            <div className="text-sm text-muted-foreground">
                                Học viên đang học
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-test">95%</div>
                            <div className="text-sm text-muted-foreground">
                                Chính xác AI tạo câu hỏi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default QuizApp;