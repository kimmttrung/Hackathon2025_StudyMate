import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Brain,
    User,
    FileText,
    BookOpen,
    Shield,
    Users,
    Bell,
    Puzzle,
    TrendingUp,
    Clock,
    Target,
    Award,
    ChevronRight,
    Sparkles,
    Zap
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/components/context/auth.context";

export default function SettingPage() {
    const { auth } = useContext(AuthContext);
    const quickStats = [
        { label: "Tài liệu đã xử lý", value: "24", trend: "+3 tuần này", icon: FileText, color: "text-blue-600" },
        { label: "Flashcard đã học", value: "1,247", trend: "+89 hôm nay", icon: Brain, color: "text-purple-600" },
        { label: "Thời gian học", value: "42h", trend: "+8h tuần này", icon: Clock, color: "text-green-600" },
        { label: "Điểm tích lũy", value: "2,840", trend: "+120 điểm", icon: Award, color: "text-orange-600" },
    ];

    const settingsCards = [
        {
            href: "/user/settings/profile",
            title: "Tài khoản",
            description: "Quản lý hồ sơ cá nhân, ngôn ngữ và giao diện",
            icon: User,
            color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
            iconColor: "text-blue-600",
            features: ["Thông tin cá nhân", "Ngôn ngữ giao diện", "Chế độ sáng/tối"]
        },
        {
            href: "/user/settings/ai-settings",
            title: "Cài đặt AI",
            description: "Tùy chỉnh độ thông minh và phong cách học tập",
            icon: Brain,
            color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
            iconColor: "text-purple-600",
            features: ["Mức độ AI", "Mục tiêu học tập", "Flashcard & Mindmap"]
        },
        {
            href: "/user/settings/input-settings",
            title: "Xử lý tài liệu",
            description: "Cài đặt định dạng và OCR cho tài liệu đầu vào",
            icon: FileText,
            color: "bg-green-50 border-green-200 hover:bg-green-100",
            iconColor: "text-green-600",
            features: ["PDF/Word/Image", "OCR tự động", "Lọc nội dung"]
        },
        {
            href: "/user/settings/study-preferences",
            title: "Học tập",
            description: "Lập lịch học và theo dõi tiến độ",
            icon: BookOpen,
            color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
            iconColor: "text-orange-600",
            features: ["Lịch học", "Spaced Repetition", "Gamification"]
        },
        {
            href: "/user/settings/privacy-sharing",
            title: "Quyền riêng tư",
            description: "Kiểm soát chia sẻ và bảo mật dữ liệu",
            icon: Shield,
            color: "bg-red-50 border-red-200 hover:bg-red-100",
            iconColor: "text-red-600",
            features: ["Quyền xem", "Chia sẻ link", "Xóa dữ liệu"]
        },
        {
            href: "/user/settings/group-study",
            title: "Nhóm học tập",
            description: "Quản lý nhóm và hoạt động cộng tác",
            icon: Users,
            color: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
            iconColor: "text-cyan-600",
            features: ["Quản lý nhóm", "Vai trò thành viên", "Hoạt động nhóm"]
        },
        {
            href: "/user/settings/notifications",
            title: "Thông báo",
            description: "Cài đặt nhắc nhở và bao cáo tiến độ",
            icon: Bell,
            color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
            iconColor: "text-yellow-600",
            features: ["Nhắc học hàng ngày", "Báo cáo tiến độ", "Email/App"]
        },
        {
            href: "/user/settings/integrations",
            title: "Tích hợp",
            description: "Kết nối với các dịch vụ bên thứ ba",
            icon: Puzzle,
            color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
            iconColor: "text-indigo-600",
            features: ["Google Drive", "Đăng nhập social", "Apps khác"]
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Welcome Header */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                        <h1 className="text-3xl font-bold text-foreground">Chào mừng trở lại, {auth.user?.username}!</h1>
                        <p className="text-muted-foreground">Hôm nay là ngày tuyệt vời để học tập 🚀</p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Badge variant="secondary" className="gap-1">
                        <Zap className="w-3 h-3" />
                        Streak 7 ngày
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Tiến bộ +15%
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                        <Award className="w-3 h-3" />
                        Premium User
                    </Badge>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className="relative overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                        <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
                                    </div>
                                    <Icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Settings Overview */}
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-primary" />
                    Cài đặt & Tùy chỉnh
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {settingsCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Link key={card.href} to={card.href}>
                                <Card className={`h-full transition-all duration-200 hover:shadow-lg ${card.color} border-2`}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <Icon className={`w-5 h-5 ${card.iconColor}`} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{card.title}</CardTitle>
                                            </div>
                                        </div>
                                        <CardDescription className="text-sm">
                                            {card.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-1 mb-4">
                                            {card.features.map((feature, index) => (
                                                <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                                                    <div className="w-1 h-1 bg-current rounded-full" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center text-sm font-medium text-primary">
                                            Cài đặt ngay
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
