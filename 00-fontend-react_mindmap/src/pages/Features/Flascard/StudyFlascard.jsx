import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, BookOpen, Clock, Star } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const StudyFlascard = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [searchSet, setSearchSet] = useState("");
    const [viewingSet, setViewingSet] = useState(null);

    const folders = [
        {
            id: 1,
            name: "Tiếng Anh Cơ Bản",
            progress: 78,
            lastStudied: "2 giờ trước",
            difficulty: "Dễ",
            color: "bg-blue-100 text-blue-800",
            sets: [
                { name: "Từ vựng A1", cards: 10, createdAt: "2024-06-01", createdBy: "ai" },
                { name: "Từ vựng A2", cards: 15, createdAt: "2024-06-20", createdBy: "user" },
                { name: "Từ vựng A3", cards: 20, createdAt: "2024-06-25", createdBy: "ai" },
            ],
        },
        {
            id: 2,
            name: "Toán Học Lớp 12",
            progress: 65,
            lastStudied: "1 ngày trước",
            difficulty: "Khó",
            color: "bg-red-100 text-red-800",
            sets: [
                { name: "Đạo hàm", cards: 12, createdAt: "2024-05-10", createdBy: "user" },
                { name: "Hàm số", cards: 18, createdAt: "2024-06-02", createdBy: "ai" },
            ],
        },
        {
            id: 3,
            name: "Lịch Sử Việt Nam",
            progress: 92,
            lastStudied: "3 giờ trước",
            difficulty: "Trung bình",
            color: "bg-yellow-100 text-yellow-800",
            sets: [
                { name: "Kháng chiến chống Pháp", cards: 14, createdAt: "2024-05-28", createdBy: "ai" },
                { name: "Kháng chiến chống Mỹ", cards: 16, createdAt: "2024-06-05", createdBy: "user" },
            ],
        },
        {
            id: 4,
            name: "Khoa Học Tự Nhiên",
            progress: 67,
            lastStudied: "5 giờ trước",
            difficulty: "Trung bình",
            color: "bg-green-100 text-green-800",
            sets: [
                { name: "Vật lý cơ bản", cards: 10, createdAt: "2024-06-10", createdBy: "ai" },
                { name: "Hóa học lớp 8", cards: 15, createdAt: "2024-06-15", createdBy: "user" },
                { name: "Sinh học tế bào", cards: 8, createdAt: "2024-06-19", createdBy: "ai" },
            ],
        },
    ];


    return (
        <Layout title="Học Phần">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 text-study-foreground">
                        <div className="w-12 h-12 rounded-xl bg-study flex items-center justify-center">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold">Thư Mục Học Tập</h1>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Chọn thư mục để bắt đầu học tập với các flashcard được tổ chức theo chủ đề
                    </p>
                </div>

                {/* Study Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-primary">4</div>
                            <div className="text-sm text-muted-foreground">Thư mục</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-accent">161</div>
                            <div className="text-sm text-muted-foreground">
                                Tổng flashcard
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-test">71%</div>
                            <div className="text-sm text-muted-foreground">
                                Tiến độ trung bình
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-create">12</div>
                            <div className="text-sm text-muted-foreground">Ngày streak</div>
                        </CardContent>
                    </Card>
                </div>

                {!selectedFolder && !viewingSet && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {folders.map((folder) => (
                            <Card
                                key={folder.id}
                                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-study/50"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-study/20 flex items-center justify-center">
                                            <Folder className="w-5 h-5 text-study-foreground" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{folder.name}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="secondary" className={folder.color}>
                                                    {folder.difficulty}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Star className="w-3 h-3" />
                                                    <span>{folder.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tiến độ học tập</span>
                                            <span className="font-medium">{folder.progress}%</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2">
                                            <div
                                                className="bg-study h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${folder.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <BookOpen className="w-4 h-4" />
                                            <span>
                                                {folder.sets?.reduce((acc, s) => acc + s.cards, 0) || 0} thẻ
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Clock className="w-4 h-4" />
                                            <span>{folder.lastStudied}</span>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full bg-study hover:bg-study/90 text-study-foreground"
                                        size="sm"
                                        onClick={() => setSelectedFolder(folder)}
                                    >
                                        Tiếp tục học
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {selectedFolder && !viewingSet && (
                    <Card className="border border-study">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>📂 {selectedFolder.name}</CardTitle>
                                <Button variant="ghost" onClick={() => setSelectedFolder(null)}>
                                    ← Quay lại thư mục
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                placeholder="Tìm bộ flashcard..."
                                value={searchSet}
                                onChange={(e) => setSearchSet(e.target.value)}
                            />
                            {selectedFolder.sets
                                .filter((s) =>
                                    s.name.toLowerCase().includes(searchSet.toLowerCase())
                                )
                                .map((set, index) => (
                                    <Card key={index} className="p-4 border border-muted/50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-medium text-lg">{set.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    🃏 {set.cards} thẻ – 📅 {set.createdAt} – 👤 {set.createdBy === "ai" ? "AI tạo" : "Người tạo"}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        const newName = prompt("Đổi tên bộ:", set.name);
                                                        if (newName) {
                                                            const updatedSets = [...selectedFolder.sets];
                                                            updatedSets[index].name = newName;
                                                            setSelectedFolder({ ...selectedFolder, sets: updatedSets });
                                                        }
                                                    }}
                                                >
                                                    ✏️
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        if (confirm(`Xóa bộ "${set.name}"?`)) {
                                                            const updatedSets = selectedFolder.sets.filter((_, i) => i !== index);
                                                            setSelectedFolder({ ...selectedFolder, sets: updatedSets });
                                                        }
                                                    }}
                                                >
                                                    🗑️
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-study text-white"
                                                    onClick={() => setViewingSet(set)}
                                                >
                                                    Học
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                        </CardContent>
                    </Card>
                )}

                {viewingSet && (
                    <Card className="border border-study">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>📘 {viewingSet.name}</CardTitle>
                                <Button variant="ghost" onClick={() => setViewingSet(null)}>
                                    ← Quay lại bộ thẻ
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>Hiển thị các flashcard ở đây (gợi ý: dùng Swiper hoặc FlipCard)</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export default StudyFlascard;
