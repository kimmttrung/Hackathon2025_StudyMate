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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Layout from "@/components/Layout.jsx";
import {
    Plus,
    Search,
    Edit3,
    Trash2,
    Upload,
    FileText,
    Brain,
    FolderOpen,
    ArrowLeft,
    Check,
    X,
    Sparkles,
    File,
    Image,
} from "lucide-react";
import axios from "@/utils/axios.customize";
import { toast } from 'react-toastify';

export default function CreateQuestions() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [newFolderName, setNewFolderName] = useState("");
    const [editingFolder, setEditingFolder] = useState(null);
    const [uploadedContent, setUploadedContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [foldersQuiz, setFoldersQuiz] = useState([]);
    const [questions, setQuestions] = useState([
    ]);

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
            console.log("check folder", res);
            setFoldersQuiz(res.folders);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thư mục quiz:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFolder = async () => {
        const user_id = getUserIdFromToken();
        // console.log("check user_id", user_id);
        if (!user_id || !newFolderName.trim()) return;

        try {
            const res = await axios.post('/api/folder-quiz/create', {
                user_id,
                name: newFolderName.trim()
            });

            toast.success("✅ Tạo thư mục thành công");
            setNewFolderName(""); // Reset input
            setOpen(false); // Nếu bạn có setOpen cho Dialog, đóng nó lại
            fetchFoldersQuiz();
        } catch (err) {
            toast.error("❌ Lỗi khi tạo thư mục");
            console.error("Lỗi tạo thư mục quiz:", err);
        }
    };

    const handleEditFolder = (folder) => {

    };

    const handleDeleteFolder = (folderId) => {

    };

    const handleGenerateQuestions = async () => {
    };

    useEffect(() => {
        fetchFoldersQuiz();
    }, []);

    if (selectedFolder) {
        return (
            <Layout>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" onClick={() => setSelectedFolder(null)}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Quay lại
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {selectedFolder.name}
                                </h1>
                                <p className="text-gray-600">{questions.length} câu hỏi</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Content Upload Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Upload className="w-5 h-5 mr-2" />
                                    Upload Tài Liệu
                                </CardTitle>
                                <CardDescription>
                                    Upload PDF, DOC, hình ảnh hoặc nhập nội dung để tạo câu hỏi
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                                    <div className="space-y-2">
                                        <div className="flex justify-center space-x-2">
                                            <File className="w-8 h-8 text-gray-400" />
                                            <Image className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600">
                                            Kéo thả file hoặc click để chọn
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            PDF, DOC, JPG, PNG (Max 10MB)
                                        </p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Separator className="my-4" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="bg-white px-2 text-sm text-gray-500">
                                            hoặc
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Nhập nội dung</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Paste nội dung tài liệu vào đây để AI tạo câu hỏi..."
                                        value={uploadedContent}
                                        onChange={(e) => setUploadedContent(e.target.value)}
                                        rows={8}
                                    />
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={handleGenerateQuestions}
                                    disabled={!uploadedContent.trim() || isGenerating}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                            Đang tạo câu hỏi...
                                        </>
                                    ) : (
                                        <>
                                            <Brain className="w-4 h-4 mr-2" />
                                            Tạo câu hỏi bằng AI
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Questions List */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="w-5 h-5 mr-2" />
                                    Danh Sách Câu Hỏi
                                </CardTitle>
                                <CardDescription>
                                    Các câu hỏi đã được tạo cho thư mục này
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {questions.map((question) => (
                                        <div
                                            key={question.id}
                                            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 mb-2">
                                                        {question.question}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mb-3">
                                                        Đáp án: {question.answer}
                                                    </p>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge
                                                            variant={
                                                                question.type === "multiple-choice"
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                        >
                                                            {question.type === "multiple-choice"
                                                                ? "Trắc nghiệm"
                                                                : "Tự luận"}
                                                        </Badge>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                question.difficulty === "easy"
                                                                    ? "border-green-500 text-green-700"
                                                                    : question.difficulty === "medium"
                                                                        ? "border-yellow-500 text-yellow-700"
                                                                        : "border-red-500 text-red-700"
                                                            }
                                                        >
                                                            {question.difficulty === "easy"
                                                                ? "Dễ"
                                                                : question.difficulty === "medium"
                                                                    ? "Trung bình"
                                                                    : "Khó"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-1 ml-4">
                                                    <Button variant="ghost" size="sm">
                                                        <Edit3 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {questions.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p>Chưa có câu hỏi nào</p>
                                            <p className="text-sm">
                                                Upload tài liệu để bắt đầu tạo câu hỏi
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                {loading && <p>Đang tải thư mục...</p>}
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tạo Câu Hỏi</h1>
                        <p className="text-gray-600">
                            Quản lý thư mục và tạo câu hỏi từ tài liệu
                        </p>
                    </div>
                    {/* Thêm thư mục  */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm thư mục
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tạo thư mục mới</DialogTitle>
                                <DialogDescription>
                                    Nhập tên cho thư mục chứa câu hỏi của bạn
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="folder-name">Tên thư mục</Label>
                                    <Input
                                        id="folder-name"
                                        placeholder="Ví dụ: Toán học lớp 12, Tiếng Anh cơ bản..."
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setNewFolderName("")}>
                                    Hủy
                                </Button>
                                <Button
                                    onClick={handleCreateFolder}
                                    disabled={!newFolderName.trim()}
                                >
                                    Tạo thư mục
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Tìm kiếm thư mục..."
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
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FolderOpen className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                                {folder.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {folder.num_quizzes} câu hỏi •{" "}
                                                {new Date(folder.created_at).toLocaleDateString("vi-VN")}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {/* Edit thư mục  */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingFolder({ ...folder });
                                                    }}
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Sửa tên thư mục</DialogTitle>
                                                    <DialogDescription>
                                                        Nhập tên mới cho thư mục
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label htmlFor="edit-folder-name">
                                                            Tên thư mục
                                                        </Label>
                                                        <Input
                                                            id="edit-folder-name"
                                                            value={editingFolder?.name || ""}
                                                            onChange={(e) =>
                                                                setEditingFolder(
                                                                    editingFolder
                                                                        ? { ...editingFolder, name: e.target.value }
                                                                        : null,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setEditingFolder(null)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button onClick={() => handleEditFolder(folder)}>
                                                        Lưu
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        {/* Xóa thư mục  */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Xóa thư mục</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Bạn có chắc chắn muốn xóa thư mục "{folder.name}"?
                                                        Tất cả câu hỏi trong thư mục sẽ bị xóa và không thể
                                                        khôi phục.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDeleteFolder(folder.id)}
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        Xóa
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent
                                className="pt-0 cursor-pointer"
                                onClick={() => setSelectedFolder(folder)}
                            >
                                <div className="flex items-center justify-between">
                                    <Badge
                                        variant="secondary"
                                        className="bg-blue-50 text-blue-700"
                                    >
                                        {folder.questionCount} câu hỏi
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Mở thư mục
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredFolders.length === 0 && (
                    <div className="text-center py-12">
                        <FolderOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm ? "Không tìm thấy thư mục" : "Chưa có thư mục nào"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm
                                ? "Thử tìm kiếm với từ khóa khác"
                                : "Tạo thư mục đầu tiên để bắt đầu tổ chức câu hỏi của bạn"}
                        </p>
                        {!searchTerm && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Tạo thư mục đầu tiên
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Tạo thư mục mới</DialogTitle>
                                        <DialogDescription>
                                            Nhập tên cho thư mục chứa câu hỏi của bạn
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="folder-name">Tên thư mục</Label>
                                            <Input
                                                id="folder-name"
                                                placeholder="Ví dụ: Toán học lớp 12, Tiếng Anh cơ bản..."
                                                value={newFolderName}
                                                onChange={(e) => setNewFolderName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setNewFolderName("")}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            onClick={handleCreateFolder}
                                            disabled={!newFolderName.trim()}
                                        >
                                            Tạo thư mục
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
