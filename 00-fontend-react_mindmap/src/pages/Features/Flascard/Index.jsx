import { useNavigate } from "react-router-dom";

import {
    BookOpen,
    TestTube,
    PlusCircle,
    RotateCcw,
    Layers3,
    Sparkles,
} from "lucide-react";
import { NavigationCard } from "@/components/NavigationCard";
import { Layout } from "@/components/Layout";

const FlascardApp = () => {
    const navigate = useNavigate();

    const navigationOptions = [
        {
            title: "Học Phần",
            description:
                "Khám phá và học tập với các thẻ flashcard được tổ chức trong thư mục",
            icon: BookOpen,
            path: "/study",
            className: "bg-study/20 border-study/30 hover:bg-study/30",
            iconColor: "bg-study text-study-foreground",
        },
        {
            title: "Bài Kiểm Tra",
            description: "Thử thách kiến thức của bạn với các bài kiểm tra thực hành",
            icon: TestTube,
            path: "/practice",
            className: "bg-test/20 border-test/30 hover:bg-test/30",
            iconColor: "bg-test text-test-foreground",
        },
        {
            title: "Tạo Flashcard",
            description:
                "Tạo flashcard mới bằng cách tự viết hoặc sử dụng AI thông minh",
            icon: PlusCircle,
            path: "/admin/flashcards/create",
            className: "bg-create/20 border-create/30 hover:bg-create/30",
            iconColor: "bg-create text-create-foreground",
        },
        {
            title: "Ôn Tập",
            description: "Xem lại tất cả flashcard và thư mục để củng cố kiến thức",
            icon: RotateCcw,
            path: "/review",
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
                                FlashCard Master
                            </h1>
                            <div className="flex items-center gap-1 justify-center mt-2">
                                <Sparkles className="w-4 h-4 text-accent" />
                                <span className="text-sm text-muted-foreground">
                                    Powered by AI
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Nền tảng học tập thông minh giúp bạn tạo, quản lý và ôn tập
                        flashcard một cách hiệu quả
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span>Tạo flashcard bằng AI</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent"></div>
                            <span>Quản lý thư mục thông minh</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-test"></div>
                            <span>Kiểm tra kiến thức</span>
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
                            <div className="text-3xl font-bold text-primary">1,234</div>
                            <div className="text-sm text-muted-foreground">
                                Flashcard đã tạo
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-accent">456</div>
                            <div className="text-sm text-muted-foreground">
                                Bài kiểm tra hoàn thành
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-test">89%</div>
                            <div className="text-sm text-muted-foreground">
                                Tỷ lệ nhớ trung bình
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FlascardApp;
