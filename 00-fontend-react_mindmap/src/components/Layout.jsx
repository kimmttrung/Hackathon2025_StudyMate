import { Button } from "@/components/ui/button";
import {
    BookOpen,
    RotateCcw,
    FileCheck,
    Gamepad2,
    Brain,
    Menu,
    X,
    ArrowLeft,
    LogOut,
    User,
    Bell, Rocket
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "./lib/utils";
import { AuthContext } from "./context/auth.context";
import axios from "@/utils/axios.customize";

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
    const { auth, setAuth } = useContext(AuthContext);
    const location = useLocation();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const navigate = useNavigate();
    const getCurrentModule = () => {
        if (location.pathname.includes("/user/flashcards")) return "flashcards";
        if (location.pathname.includes("/user/quiz")) return "quiz";
        if (location.pathname.includes("/user/mindmaps")) return "mindmaps";
        return null;
    };

    const currentModule = getCurrentModule();
    const isHome = location.pathname === navigationMap[currentModule]?.basePath;
    const title = navigationMap[currentModule]?.title || "Settings MickeAI";
    const subtitle = isHome ? navigationMap[currentModule]?.subtitle : "";
    const menuItems = navigationMap[currentModule]?.menu || [];
    const backLink = navigationMap[currentModule]?.basePath || "/user/settings  ";
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Hoàn thành bài tập từ vựng hôm nay", type: "task", read: false },
        { id: 2, text: "Giao tiếp tiếng Anh lúc 19:00", type: "schedule", read: false },
        { id: 3, text: "Tin nhắn mới từ Văn Cường: 'Chúc bạn học tốt!'", type: "message", read: true },
        { id: 4, text: "Thảo luận mới: 'Nên học flashcard theo chủ đề'", type: "discussion", read: false },
    ]);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const res = await axios.get("/api/users/account");
                // Axios đã tự parse JSON → res.data chính là object
                setAuth({
                    isAuthenticated: true,
                    user: res.user,
                });
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };

        fetchUser();
    }, []);
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

                        <div className="relative flex items-center gap-2">
                            {/* Thông báo */}
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="relative p-2 rounded-full hover:bg-gray-100"
                            >
                                <Bell className="w-6 h-6 text-yellow-500" />
                                {/* Số lượng thông báo chưa đọc */}
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                        {notifications.filter(n => !n.read).length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 p-2 rounded-full"
                            >
                                <img
                                    src={auth.user?.avatar}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                />
                                <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                                    {auth.user?.username}
                                </span>
                            </button>



                        </div>
                    </div>
                </div>
                {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                        <Link
                            to="/user/settings/profile"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <User className="w-4 h-4 text-blue-500" />
                            Chỉnh sửa hồ sơ
                        </Link>

                        {/* Nâng cấp */}
                        <Link
                            to="/user/settings/upgrade"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            <Rocket className="w-4 h-4 text-purple-600" />
                            Nâng cấp tài khoản
                        </Link>

                        <button
                            onClick={() => {
                                setAuth({
                                    isAuthenticated: false,
                                    user: {
                                        email: "",
                                        username: "",
                                        phonenumber: "",
                                        gender: "",
                                        nationality: "",
                                        date_of_birth: "",
                                        district: "",
                                        full_name: "",
                                        province: "",
                                        avatar: "",
                                    }
                                })
                                localStorage.clear();
                                navigate("/login");
                            }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                            <LogOut className="w-4 h-4 text-red-500" />
                            Đăng xuất
                        </button>
                    </div>
                )}

                {isNotificationOpen && (
                    <div className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-lg z-50 p-4 border border-gray-200">
                        <h4 className="text-lg font-semibold mb-3">Thông báo</h4>

                        {/* Chưa đọc */}
                        <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-600 mb-2">🔴 Chưa đọc</h5>
                            <ul className="text-sm space-y-2 max-h-40 overflow-y-auto">
                                {notifications.filter(n => !n.read).length === 0 && (
                                    <li className="text-gray-500">Không có thông báo mới.</li>
                                )}
                                {notifications.filter(n => !n.read).map(n => (
                                    <li key={n.id} className="flex items-start gap-2 bg-yellow-50 px-3 py-2 rounded-md">
                                        <span>{getIcon(n.type)}</span>
                                        <span>{n.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Đã đọc */}
                        <div>
                            <h5 className="text-sm font-semibold text-gray-600 mb-2">⚪ Đã đọc</h5>
                            <ul className="text-sm space-y-2 max-h-40 overflow-y-auto">
                                {notifications.filter(n => n.read).length === 0 && (
                                    <li className="text-gray-500">Chưa có thông báo nào đã đọc.</li>
                                )}
                                {notifications.filter(n => n.read).map(n => (
                                    <li key={n.id} className="flex items-start gap-2 text-gray-500 px-3 py-2 hover:bg-gray-50 rounded-md">
                                        <span>{getIcon(n.type)}</span>
                                        <span>{n.text}</span>
                                    </li>
                                ))}
                            </ul>
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

function getIcon(type) {
    switch (type) {
        case "task":
            return "✅";
        case "schedule":
            return "📅";
        case "message":
            return "💬";
        case "discussion":
            return "🗨️";
        default:
            return "🔔";
    }
}
