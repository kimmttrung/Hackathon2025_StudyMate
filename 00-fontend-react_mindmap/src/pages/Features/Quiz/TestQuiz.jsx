import { useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout.jsx";
import {
    Search,
    FileCheck,
    FolderOpen,
    Timer,
    Award,
    BarChart3,
    Settings,
} from "lucide-react";

export default function TestQuiz() {
    const [searchTerm, setSearchTerm] = useState("");
    const [questionCount, setQuestionCount] = useState([10]);
    const [timeLimit, setTimeLimit] = useState([15]);
    const [folders] = useState([
        {
            id: "1",
            name: "Toán học lớp 10",
            questionCount: 25,
            lastTestScore: 85,
            averageScore: 78,
            testsTaken: 5,
        },
        {
            id: "2",
            name: "Tiếng Anh cơ bản",
            questionCount: 18,
            lastTestScore: 92,
            averageScore: 87,
            testsTaken: 3,
        },
        {
            id: "3",
            name: "Lịch sử Việt Nam",
            questionCount: 32,
            lastTestScore: 76,
            averageScore: 81,
            testsTaken: 7,
        },
    ]);

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Bài Kiểm Tra</h1>
                        <p className="text-gray-600">
                            Tạo bài kiểm tra từ thư mục câu hỏi và đánh giá kiến thức.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-2">
                                    <Award className="w-5 h-5 text-yellow-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">92%</p>
                                        <p className="text-sm text-gray-600">Điểm cao nhất</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-2">
                                    <BarChart3 className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">82%</p>
                                        <p className="text-sm text-gray-600">Điểm trung bình</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-2">
                                    <FileCheck className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">15</p>
                                        <p className="text-sm text-gray-600">Bài thi đã làm</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Test Settings */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Settings className="w-5 h-5 mr-2" />
                                Cài Đặt Bài Thi
                            </CardTitle>
                            <CardDescription>
                                Tùy chỉnh số câu hỏi và thời gian làm bài
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <Label>Số câu hỏi: {questionCount[0]} câu</Label>
                                <Slider
                                    value={questionCount}
                                    onValueChange={setQuestionCount}
                                    max={50}
                                    min={5}
                                    step={5}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>5 câu</span>
                                    <span>50 câu</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label>Thời gian: {timeLimit[0]} phút</Label>
                                <Slider
                                    value={timeLimit}
                                    onValueChange={setTimeLimit}
                                    max={60}
                                    min={5}
                                    step={5}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>5 phút</span>
                                    <span>60 phút</span>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center space-x-2 text-blue-700">
                                    <Timer className="w-4 h-4" />
                                    <span className="font-medium">Thông tin bài thi</span>
                                </div>
                                <div className="mt-2 text-sm text-blue-600">
                                    <p>• {questionCount[0]} câu hỏi</p>
                                    <p>• {timeLimit[0]} phút làm bài</p>
                                    <p>• Chấm điểm tự động</p>
                                    <p>• Hiển thị đáp án sau khi nộp</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Folders List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search */}
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Tìm kiếm thư mục để thi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Folders Grid */}
                        <div className="space-y-4">
                            {filteredFolders.map((folder) => (
                                <Card
                                    key={folder.id}
                                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 flex-1">
                                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                    <FolderOpen className="w-6 h-6 text-purple-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                        {folder.name}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {folder.questionCount} câu hỏi có sẵn
                                                    </p>
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        {folder.lastTestScore && (
                                                            <div className="flex items-center space-x-1">
                                                                <span className="text-sm text-gray-500">
                                                                    Lần cuối:
                                                                </span>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className={
                                                                        folder.lastTestScore >= 80
                                                                            ? "bg-green-100 text-green-700"
                                                                            : folder.lastTestScore >= 60
                                                                                ? "bg-yellow-100 text-yellow-700"
                                                                                : "bg-red-100 text-red-700"
                                                                    }
                                                                >
                                                                    {folder.lastTestScore}%
                                                                </Badge>
                                                            </div>
                                                        )}
                                                        {folder.averageScore && (
                                                            <div className="flex items-center space-x-1">
                                                                <span className="text-sm text-gray-500">
                                                                    TB:
                                                                </span>
                                                                <Badge variant="outline">
                                                                    {folder.averageScore}%
                                                                </Badge>
                                                            </div>
                                                        )}
                                                        {folder.testsTaken && (
                                                            <span className="text-sm text-gray-500">
                                                                {folder.testsTaken} bài đã thi
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button className="bg-purple-600 hover:bg-purple-700">
                                                <FileCheck className="w-4 h-4 mr-2" />
                                                Bắt đầu thi
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredFolders.length === 0 && (
                            <div className="text-center py-12">
                                <FileCheck className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {searchTerm
                                        ? "Không tìm thấy thư mục"
                                        : "Chưa có thư mục nào để thi"}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {searchTerm
                                        ? "Thử tìm kiếm với từ khóa khác"
                                        : "Tạo câu hỏi trước để bắt đầu làm bài kiểm tra"}
                                </p>
                                {!searchTerm && (
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        Tạo câu hỏi đầu tiên
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
