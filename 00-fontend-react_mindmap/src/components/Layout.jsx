// import { useNavigate, useLocation } from "react-router-dom";

// import { ArrowLeft, Layers3 } from "lucide-react";
// import { cn } from "./lib/utils";
// import { Button } from "./ui/Button";



// export function Layout({ children, title, showBackButton = true }) {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const isHomePage = location.pathname === "/";

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//             {/* Header */}
//             <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//                 <div className="container flex h-16 items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         {showBackButton && !isHomePage && (
//                             <Button
//                                 size="sm"
//                                 onClick={() => navigate("/user/flashcards")}
//                                 className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition duration-200"
//                             >
//                                 <ArrowLeft className="w-4 h-4" />
//                                 Trang chủ
//                             </Button>
//                         )}

//                         <div className="flex items-center gap-2">
//                             <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
//                                 <Layers3 className="w-5 h-5 text-primary" />
//                             </div>
//                             <h1 className={cn("font-bold", title ? "text-lg" : "text-xl")}>
//                                 {title || "FlashCard Master"}
//                             </h1>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             {/* Main Content */}
//             <main className="container py-8">{children}</main>
//         </div>
//     );
// }

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    BookOpen,
    RotateCcw,
    FileCheck,
    Gamepad2,
    Brain,
    Menu,
    X,
    ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "./lib/utils";

const navigationMap = {
    flashcards: {
        basePath: "/user/flashcards",
        title: "FlashcardMaster",
        subtitle: "Học thông minh hơn",
        menu: [
            {
                title: "Tạo",
                href: "/user/flashcards/create",
                icon: BookOpen,
                description: "Tạo và quản lý câu hỏi từ tài liệu",
            },
            {
                title: "Ôn Tập",
                href: "/user/flashcards/study",
                icon: RotateCcw,
                description: "Luyện tập với câu hỏi đã tạo",
            },
            {
                title: "Bài Kiểm Tra",
                href: "/user/flashcards/test",
                icon: FileCheck,
                description: "Làm bài kiểm tra và đánh giá",
            },
            {
                title: "Trò Chơi",
                href: "/user/flashcards/game",
                icon: Gamepad2,
                description: "Học qua các trò chơi thú vị",
            },
        ],
    },
    quiz: {
        basePath: "/user/quizs",
        title: "QuizMaster",
        subtitle: "",
        menu: [
            {
                title: "Tạo",
                href: "/user/quizs/create",
                icon: BookOpen,
                description: "Tạo và quản lý câu hỏi từ tài liệu",
            },
            {
                title: "Ôn Tập",
                href: "/user/quizs/study",
                icon: RotateCcw,
                description: "Luyện tập với câu hỏi đã tạo",
            },
            {
                title: "Bài Kiểm Tra",
                href: "/user/quizs/test",
                icon: FileCheck,
                description: "Làm bài kiểm tra và đánh giá",
            },
            {
                title: "Trò Chơi",
                href: "/user/quizs/games",
                icon: Gamepad2,
                description: "Học qua các trò chơi thú vị",
            },
        ],
    },
    mindmaps: {
        basePath: "/user/mindmaps",
        title: "MindmapMaster",
        subtitle: "",
        menu: [
            // tuỳ chỉnh menu mindmap tại đây nếu cần
        ],
    },
};

export default function Layout({ children }) {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const getCurrentModule = () => {
        if (location.pathname.includes("/user/flashcards")) return "flashcards";
        if (location.pathname.includes("/user/quiz")) return "quiz";
        if (location.pathname.includes("/user/mindmaps")) return "mindmaps";
        return null;
    };

    const currentModule = getCurrentModule();
    const isHome = location.pathname === navigationMap[currentModule]?.basePath;
    const title = navigationMap[currentModule]?.title || "QuizMaster";
    const subtitle = isHome ? navigationMap[currentModule]?.subtitle : "";
    const menuItems = navigationMap[currentModule]?.menu || [];
    const backLink = navigationMap[currentModule]?.basePath || "/";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center justify-between">
                            {isHome ? (
                                <Link to="/user/dashboard" className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <Brain className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                                        <p className="text-xs text-gray-500">{subtitle}</p>
                                    </div>
                                </Link>
                            ) : (
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate(backLink)}
                                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Quay lại
                                </Button>
                            )}

                            {!isHome && (
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                                </div>
                            )}
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-1">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link key={item.href} to={item.href}>
                                        <Button
                                            variant={isActive ? "default" : "ghost"}
                                            className={cn(
                                                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                                                isActive
                                                    ? "bg-blue-500 text-white shadow-md"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-blue-50"
                                            )}
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span className="font-medium">{item.title}</span>
                                        </Button>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-4 py-3 space-y-2">
                            {navigationItems.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div
                                            className={cn(
                                                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                                                isActive
                                                    ? "bg-blue-500 text-white"
                                                    : "text-gray-600 hover:bg-blue-50",
                                            )}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <div>
                                                <div className="font-medium">{item.title}</div>
                                                <div
                                                    className={cn(
                                                        "text-sm",
                                                        isActive ? "text-blue-100" : "text-gray-500",
                                                    )}
                                                >
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
