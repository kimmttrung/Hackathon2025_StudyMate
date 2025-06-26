import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, BookOpen, Clock, Star, Heart, Repeat, AlertCircle, RotateCw } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import classNames from "classnames";

const StudyFlashcard = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [showBack, setShowBack] = useState(false);

    const [cardTags, setCardTags] = useState({}); // { "folderId_cardIndex": { review: true, favorite: true, wrong: false } }

    const folders = [
        {
            id: 1,
            name: "Tiếng Anh Cơ Bản",
            progress: 78,
            lastStudied: "2 giờ trước",
            difficulty: "Dễ",
            color: "bg-blue-100 text-blue-800",
            cards: [
                { front: "Hello", back: "Xin chào" },
                { front: "Thank you", back: "Cảm ơn" },
                { front: "Goodbye", back: "Tạm biệt" },
                { front: "Apple", back: "Quả táo" },
            ],
        },
        {
            id: 2,
            name: "Từ Vựng Toeic",
            progress: 35,
            lastStudied: "1 ngày trước",
            difficulty: "Trung bình",
            color: "bg-yellow-100 text-yellow-800",
            cards: [
                { front: "Revenue", back: "Doanh thu" },
                { front: "Employee", back: "Nhân viên" },
                { front: "Meeting", back: "Cuộc họp" },
                { front: "Project", back: "Dự án" },
            ],
        },
        {
            id: 3,
            name: "Từ Vựng IELTS",
            progress: 12,
            lastStudied: "5 ngày trước",
            difficulty: "Khó",
            color: "bg-red-100 text-red-800",
            cards: [
                { front: "Analyze", back: "Phân tích" },
                { front: "Evaluate", back: "Đánh giá" },
                { front: "Summarize", back: "Tóm tắt" },
                { front: "Contrast", back: "Tương phản" },
            ],
        },
        {
            id: 4,
            name: "Ngữ Pháp Cơ Bản",
            progress: 60,
            lastStudied: "3 giờ trước",
            difficulty: "Trung bình",
            color: "bg-green-100 text-green-800",
            cards: [
                { front: "Present Simple", back: "Thì hiện tại đơn" },
                { front: "Past Perfect", back: "Thì quá khứ hoàn thành" },
                { front: "Passive Voice", back: "Câu bị động" },
                { front: "Conditional", back: "Câu điều kiện" },
            ],
        },
        {
            id: 5,
            name: "Giao Tiếp Hằng Ngày",
            progress: 45,
            lastStudied: "6 ngày trước",
            difficulty: "Dễ",
            color: "bg-indigo-100 text-indigo-800",
            cards: [
                { front: "How are you?", back: "Bạn khỏe không?" },
                { front: "Nice to meet you", back: "Rất vui được gặp bạn" },
                { front: "Where are you from?", back: "Bạn đến từ đâu?" },
                { front: "See you later", back: "Hẹn gặp lại" },
            ],
        },
    ];

    const currentFolder = selectedFolder;
    const currentCard = currentFolder?.cards?.[currentCardIndex];
    const cardKey = `${selectedFolder?.id}_${currentCardIndex}`;

    const handleNextCard = () => {
        setShowBack(false);
        if (currentCardIndex < currentFolder.cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            alert("Đã hoàn thành tất cả flashcard trong thư mục này!");
            setSelectedFolder(null);
            setCurrentCardIndex(0);
        }
    };

    const toggleTag = (type) => {
        setCardTags((prev) => ({
            ...prev,
            [cardKey]: {
                ...prev[cardKey],
                [type]: !prev[cardKey]?.[type],
            },
        }));
    };

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout title="Học Phần">
            <div className="max-w-5xl mx-auto space-y-8">
                {!selectedFolder && (
                    <>
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl font-bold">🎓 Chọn Thư Mục Học Tập</h1>
                            <p className="text-muted-foreground">Học từ vựng, cấu trúc ngữ pháp và hơn thế nữa!</p>
                            <div className="max-w-sm mx-auto">
                                <Input
                                    placeholder="🔍 Tìm thư mục..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-primary">5</div>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredFolders.map((folder) => (
                                <Card
                                    key={folder.id}
                                    className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
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
                                    <CardContent className="space-y-3">
                                        <div className="w-full bg-secondary rounded-full h-2">
                                            <div
                                                className="bg-study h-2 rounded-full"
                                                style={{ width: `${folder.progress}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="w-4 h-4" /> {folder.cards.length} thẻ
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" /> {folder.lastStudied}
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full bg-study hover:bg-study/90 text-white"
                                            onClick={() => setSelectedFolder(folder)}
                                        >
                                            🚀 Bắt đầu học
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                )}

                {selectedFolder && currentCard && (
                    <Card className="border border-study">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>📘 {selectedFolder.name}</CardTitle>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setSelectedFolder(null);
                                        setCurrentCardIndex(0);
                                        setShowBack(false);
                                    }}
                                >
                                    ← Thoát học
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 text-center">
                            <div
                                className="relative w-full h-64 sm:h-72 cursor-pointer [perspective:1000px]"
                                onClick={() => setShowBack(!showBack)}
                            >
                                <div
                                    className={`relative w-full h-full duration-700 rounded-2xl shadow-xl [transform-style:preserve-3d] ${showBack ? "[transform:rotateY(180deg)]" : ""
                                        }`}
                                >
                                    {/* Mặt trước */}
                                    <div className="absolute w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 rounded-2xl flex items-center justify-center text-2xl font-bold [backface-visibility:hidden]">
                                        {currentCard.front}
                                    </div>

                                    {/* Mặt sau */}
                                    <div className="absolute w-full h-full bg-gradient-to-br from-green-100 to-green-200 text-green-800 rounded-2xl flex items-center justify-center text-2xl font-bold [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                        {currentCard.back}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {["❌ Chưa nhớ", "🟡 Khó", "🟢 Tạm nhớ", "💚 Rất dễ"].map((label, i) => (
                                    <Button
                                        key={i}
                                        variant="outline"
                                        className="hover:bg-study/20 rounded-xl text-sm"
                                        onClick={handleNextCard}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex justify-center gap-4 text-sm">
                                <Button
                                    variant={cardTags[cardKey]?.review ? "default" : "outline"}
                                    onClick={() => toggleTag("review")}
                                >
                                    <Repeat className="w-4 h-4 mr-1" /> Cần ôn
                                </Button>
                                <Button
                                    variant={cardTags[cardKey]?.favorite ? "default" : "outline"}
                                    onClick={() => toggleTag("favorite")}
                                >
                                    <Heart className="w-4 h-4 mr-1" /> Yêu thích
                                </Button>
                                <Button
                                    variant={cardTags[cardKey]?.wrong ? "default" : "outline"}
                                    onClick={() => toggleTag("wrong")}
                                >
                                    <AlertCircle className="w-4 h-4 mr-1" /> Sai nhiều
                                </Button>
                            </div>

                            <div className="text-xs text-muted-foreground mt-2">
                                Thẻ {currentCardIndex + 1} / {selectedFolder.cards.length}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export default StudyFlashcard;
