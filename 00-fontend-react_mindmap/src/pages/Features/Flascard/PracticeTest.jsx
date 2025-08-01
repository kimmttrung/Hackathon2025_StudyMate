// import { Layout } from "@/components/Layout";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube, Clock, Target, Trophy, Play, BarChart, BookOpen, Folder, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { QuizContainer } from "./QuizContainer";
import axios from "@/utils/axios.customize";
import { Button } from "@/components/ui/Button";
import QuizFlashcard from "./QuizFlashcard";

const PracticeTest = () => {
    const [selectedFolderId, setSelectedFolderId] = useState(false);
    const [folders, setFolders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState("choose"); // 'choose' | 'quiz'
    const [selectedTestId, setSelectedTestId] = useState(null);


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

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getUserIdFromToken = () => {
        const access_token = localStorage.getItem("access_token");
        const payloadBase64 = access_token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        if (!payload) return null;

        try {
            return payload.id; // hoặc decoded.user_id tùy backend
        } catch (err) {
            console.error("Token invalid:", err);
            return null;
        }
    };

    useEffect(() => {
        const fetchFolders = async () => {
            const userId = getUserIdFromToken();
            if (!userId) return;
            try {
                const res = await axios.get(`/api/folders/${userId}`);
                // console.log(">>>check res", res);
                setFolders(res);
            } catch (error) {
                console.error("Lỗi khi tải thư mục:", error);
            }
        };
        fetchFolders();
    }, []);

    return (
        <Layout title="Bài Kiểm Tra">
            <div className="max-w-6xl mx-auto space-y-8">
                {!selectedFolderId ? (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-center">Chọn thư mục để bắt đầu</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredFolders.map((folder) => (
                                <Card
                                    key={folder.id}
                                    className="border border-gray-200 transition-all duration-300 hover:shadow-lg"
                                    onClick={() => setSelectedFolderId(folder.id)}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                                <Folder className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg text-black">{folder.name}</CardTitle>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-3">
                                        {/* Số thẻ và ngày */}
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1 text-green-600">
                                                <BookOpen className="w-4 h-4" />
                                                {folder.flascardcount || 0} thẻ
                                            </div>
                                            <div className="flex items-center gap-1 text-black">
                                                <Clock className="w-4 h-4" />
                                                {new Date(folder.created_at).toLocaleDateString("vi-VN")}
                                            </div>
                                        </div>

                                        {/* Nút bắt đầu học */}
                                        <Button
                                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            🚀 Bắt đầu
                                        </Button>
                                    </CardContent>
                                </Card>

                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {view === "choose" && (
                            <QuizContainer
                                testTypes={testTypes}
                                selectedFolderId={selectedFolderId}
                                onBack={() => setSelectedFolderId(false)}
                                onStartQuiz={(testId) => {
                                    setSelectedTestId(testId);
                                    setView("quiz");
                                }}

                            />
                        )}
                        {view === "quiz" && selectedTestId === 1 && (
                            <QuizFlashcard testId={1} folderId={selectedFolderId} />
                        )}

                        {view === "quiz" && selectedTestId === 2 && (
                            <QuizFlashcard testId={2} folderId={selectedFolderId} />
                        )}
                        {view === "quiz" && selectedTestId === 3 && (
                            <QuizFlashcard testId={3} folderId={selectedFolderId} />
                        )}
                    </>
                )}
            </div>
        </Layout>

    );
};

export default PracticeTest;

