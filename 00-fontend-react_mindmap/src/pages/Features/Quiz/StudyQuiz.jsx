import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout.jsx";
import {
    Search,
    RotateCcw,
    FolderOpen,
    Clock,
    Target,
    TrendingUp,
} from "lucide-react";
import axios from "@/utils/axios.customize";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function StudyQuiz() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [foldersQuiz, setFoldersQuiz] = useState([]);
    const navigate = useNavigate();

    const filteredFolders = foldersQuiz.filter((folder) =>
        folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
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

    const fetchFoldersQuiz = async () => {
        const user_id = getUserIdFromToken();
        if (!user_id) return;

        try {
            setLoading(true);
            const res = await axios.get(`/api/folder-quiz/user/${user_id}`);
            // console.log("check folder", res);
            setFoldersQuiz(res.folders);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thư mục quiz:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoldersQuiz();
    }, []);

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Ôn Tập</h1>
                        <p className="text-gray-600">
                            Luyện tập với câu hỏi đã tạo. Theo dõi tiến trình và cải thiện kết
                            quả.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">45 phút</p>
                                        <p className="text-sm text-gray-600">
                                            Thời gian ôn tập hôm nay
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-2">
                                    <Target className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">85%</p>
                                        <p className="text-sm text-gray-600">
                                            Độ chính xác trung bình
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">127</p>
                                        <p className="text-sm text-gray-600">Câu hỏi đã ôn tập</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Tìm kiếm thư mục để ôn tập..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Folders Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFolders.map((folder) => (
                        <Card
                            key={folder.id}
                            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3 flex-1">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <FolderOpen className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                                                {folder.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {folder.num_quizzes} câu hỏi
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Ngày tạo</span>
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-100 text-blue-700"
                                        >
                                            {new Date(folder.created_at).toLocaleDateString("vi-VN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric"
                                            })}
                                        </Badge>
                                    </div>
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        onClick={() => navigate(`/user/quizs/review/${folder.id}`, { state: { folder } })}
                                    >
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Bắt đầu ôn tập
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredFolders.length === 0 && (
                    <div className="text-center py-12">
                        <RotateCcw className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm
                                ? "Không tìm thấy thư mục"
                                : "Chưa có thư mục nào để ôn tập"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm
                                ? "Thử tìm kiếm với từ khóa khác"
                                : "Tạo câu hỏi trước để bắt đầu ôn tập"}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
