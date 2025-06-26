import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    RotateCcw,
    Search,
    Filter,
    BookOpen,
    Clock,
    Star,
    TrendingUp,
} from "lucide-react";

const ReviewFlascard = () => {
    const allFlashcards = [
        {
            id: 1,
            folder: "Tiếng Anh Cơ Bản",
            front: "Hello",
            back: "Xin chào",
            difficulty: "Dễ",
            lastReviewed: "2 giờ trước",
            reviewCount: 8,
            mastery: 85,
            color: "bg-blue-100 text-blue-800",
        },
        {
            id: 2,
            folder: "Toán Học Lớp 12",
            front: "∫x²dx = ?",
            back: "x³/3 + C",
            difficulty: "Khó",
            lastReviewed: "1 ngày trước",
            reviewCount: 3,
            mastery: 45,
            color: "bg-red-100 text-red-800",
        },
        {
            id: 3,
            folder: "Lịch Sử Việt Nam",
            front: "Chiến thắng Bạch Đằng năm nào?",
            back: "1288",
            difficulty: "Trung bình",
            lastReviewed: "3 giờ trước",
            reviewCount: 12,
            mastery: 92,
            color: "bg-yellow-100 text-yellow-800",
        },
        {
            id: 4,
            folder: "Khoa Học Tự Nhiên",
            front: "Công thức nước",
            back: "H₂O",
            difficulty: "Dễ",
            lastReviewed: "5 giờ trước",
            reviewCount: 15,
            mastery: 98,
            color: "bg-green-100 text-green-800",
        },
        {
            id: 5,
            folder: "Tiếng Anh Cơ Bản",
            front: "Beautiful",
            back: "Đẹp",
            difficulty: "Dễ",
            lastReviewed: "1 giờ trước",
            reviewCount: 6,
            mastery: 78,
            color: "bg-blue-100 text-blue-800",
        },
    ];

    const folders = [...new Set(allFlashcards.map((card) => card.folder))];

    return (
        <Layout title="Ôn Tập">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 text-review-foreground">
                        <div className="w-12 h-12 rounded-xl bg-review flex items-center justify-center">
                            <RotateCcw className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold">Ôn Tập Toàn Diện</h1>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Xem lại tất cả flashcard từ các thư mục và theo dõi tiến độ học tập
                        của bạn
                    </p>
                </div>

                {/* Review Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-review">
                                {allFlashcards.length}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Tổng flashcard
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-primary">
                                {Math.round(
                                    allFlashcards.reduce((acc, card) => acc + card.mastery, 0) /
                                    allFlashcards.length,
                                )}
                                %
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Độ thành thạo TB
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-accent">
                                {folders.length}
                            </div>
                            <div className="text-sm text-muted-foreground">Thư mục</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-test">
                                {allFlashcards.filter((card) => card.mastery < 70).length}
                            </div>
                            <div className="text-sm text-muted-foreground">Cần ôn tập</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters and Search */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Filter className="w-5 h-5" />
                                    Bộ lọc
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tìm kiếm</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Tìm flashcard..." className="pl-9" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Thư mục</label>
                                    <div className="space-y-2">
                                        {folders.map((folder) => (
                                            <div key={folder} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-border"
                                                    defaultChecked
                                                />
                                                <label className="text-sm">{folder}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Độ khó</label>
                                    <div className="space-y-2">
                                        {["Dễ", "Trung bình", "Khó"].map((level) => (
                                            <div key={level} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-border"
                                                    defaultChecked
                                                />
                                                <label className="text-sm">{level}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="bg-gradient-to-br from-review/10 to-primary/5 border-review/30">
                            <CardHeader>
                                <CardTitle className="text-review-foreground">
                                    Ôn tập nhanh
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    className="w-full bg-review hover:bg-review/90 text-review-foreground"
                                    size="sm"
                                >
                                    Thẻ cần ôn tập
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-review text-review-foreground hover:bg-review/10"
                                    size="sm"
                                >
                                    Thẻ yêu thích
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-review text-review-foreground hover:bg-review/10"
                                    size="sm"
                                >
                                    Ôn tập ngẫu nhiên
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Flashcards List */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Tất cả Flashcard</h2>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    Sắp xếp theo độ thành thạo
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {allFlashcards.map((card) => (
                                <Card
                                    key={card.id}
                                    className="group cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-md border-2 hover:border-review/50"
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {card.folder}
                                                            </Badge>
                                                            <Badge className={card.color}>
                                                                {card.difficulty}
                                                            </Badge>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Mặt trước:
                                                                </p>
                                                                <p className="font-medium">{card.front}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Mặt sau:
                                                                </p>
                                                                <p className="font-medium">{card.back}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right space-y-1">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-500" />
                                                            <span className="text-sm font-medium">
                                                                {card.mastery}%
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={`text-xs px-2 py-1 rounded-full ${card.mastery >= 90
                                                                ? "bg-green-100 text-green-800"
                                                                : card.mastery >= 70
                                                                    ? "bg-blue-100 text-blue-800"
                                                                    : "bg-orange-100 text-orange-800"
                                                                }`}
                                                        >
                                                            {card.mastery >= 90
                                                                ? "Thành thạo"
                                                                : card.mastery >= 70
                                                                    ? "Tốt"
                                                                    : "Cần ôn tập"}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{card.lastReviewed}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <TrendingUp className="w-4 h-4" />
                                                            <span>{card.reviewCount} lần ôn tập</span>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-review text-review-foreground hover:bg-review/10"
                                                    >
                                                        Ôn tập
                                                    </Button>
                                                </div>

                                                {/* Progress bar */}
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-muted-foreground">
                                                            Độ thành thạo
                                                        </span>
                                                        <span className="font-medium">{card.mastery}%</span>
                                                    </div>
                                                    <div className="w-full bg-secondary rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full transition-all duration-500 ${card.mastery >= 90
                                                                ? "bg-green-500"
                                                                : card.mastery >= 70
                                                                    ? "bg-blue-500"
                                                                    : "bg-orange-500"
                                                                }`}
                                                            style={{ width: `${card.mastery}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ReviewFlascard;
