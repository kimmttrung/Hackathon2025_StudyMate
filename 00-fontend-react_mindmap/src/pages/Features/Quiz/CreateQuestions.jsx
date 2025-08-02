import { useEffect, useRef, useState } from "react";
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
import {
    Dialog,
    DialogClose,
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
    SwitchCamera,
    Minus
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
    const [mode, setMode] = useState("upload"); // "upload" | "text"
    const [modeQuiz, setModeQuiz] = useState("manual"); // "manual" | "ai"
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");

    // Tạo Quiz AI 
    const [foldersQuiz, setFoldersQuiz] = useState([]);
    const [questions, setQuestions] = useState([
        {
            question: "",
            options: ["", "", "", ""],
            correctIndex: 1,
        },
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
            // console.log("check folder", res);
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
            // setEditingFolder(null);
            await fetchFoldersQuiz();
        } catch (err) {
            toast.error("❌ Lỗi khi tạo thư mục");
            console.error("Lỗi tạo thư mục quiz:", err);
        }
    };

    // Chỉnh sửa folder
    const handleEditFolder = async (folder) => {
        if (!folder || !folder.name.trim()) {
            toast.error("Tên thư mục không được để trống");
            return;
        }

        try {
            const res = await axios.put(`/api/folder-quiz/${folder.id}`, {
                name: folder.name.trim(),
            });
            // console.log("check res1", res);
            toast.success("Cập nhật thư mục thành công");

            // Cập nhật lại danh sách folderQuiz
            await fetchFoldersQuiz();
            setEditingFolder(null);
        } catch (error) {
            console.error("Lỗi khi cập nhật thư mục:", error);
            toast.error("Lỗi khi cập nhật thư mục");
        }
    };

    // Xóa folder
    const handleDeleteFolder = async (folderId) => {
        try {
            const res = await axios.delete(`/api/folder-quiz/${folderId}`);
            toast.success("Đã xóa thư mục");

            // Cập nhật lại danh sách folderQuiz
            await fetchFoldersQuiz();
        } catch (error) {
            console.error("Lỗi khi xóa thư mục:", error);
            toast.error("Lỗi khi xóa thư mục");
        }
    };


    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFileName(file.name); // 👉 lưu tên file để hiển thị
        // TODO: upload file or preview content
        console.log("Selected file:", file);
    };

    const handleGenerateQuestions = () => {
        setIsGenerating(true);
        // TODO: call API to generate questions
        setTimeout(() => setIsGenerating(false), 2000);
    };

    // Tạo Quiz thủ công 
    const handleChangeQuestion = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleChangeOption = (qIndex, optIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[optIndex] = value;
        setQuestions(newQuestions);
    };

    const handleSelectCorrect = (qIndex, optIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctIndex = optIndex;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: "",
                options: ["", "", "", ""],
                correctIndex: null,
            },
        ]);
    };

    const removeQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleSubmitAll = () => {
        console.log("Generated Questions:", questions);
        // Call backend API here if needed
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
                            <div className="flex gap-10">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {selectedFolder.name}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <Button
                            variant={modeQuiz === "manual" ? "default" : "outline"}
                            onClick={() => setModeQuiz("manual")}
                            className="mr-2"
                        >
                            ✍️ Thủ công
                        </Button>
                        <Button
                            variant={modeQuiz === "ai" ? "default" : "outline"}
                            onClick={() => setModeQuiz("ai")}
                        >
                            🤖 Tự động (AI)
                        </Button>
                    </div>
                    {modeQuiz === "manual" ? (
                        // Tao thủ công 
                        <Card className="bg-white/80 shadow-xl backdrop-blur rounded-2xl p-6 space-y-6">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-indigo-700">
                                    ✍️ Tạo Quiz Thủ Công
                                </CardTitle>
                                <CardDescription>
                                    Nhập câu hỏi và lựa chọn, đánh dấu đáp án đúng, sau đó nhấn "Tạo tất cả"
                                </CardDescription>
                            </CardHeader>

                            {questions.map((q, qIndex) => (
                                <div
                                    key={qIndex}
                                    className="border border-gray-300 rounded-lg p-4 bg-white/90 space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <Input
                                            placeholder={`Câu hỏi ${qIndex + 1}`}
                                            value={q.question}
                                            onChange={(e) => handleChangeQuestion(qIndex, e.target.value)}
                                        />
                                        {questions.length > 1 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 ml-4"
                                                onClick={() => removeQuestion(qIndex)}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {q.options.map((opt, optIndex) => (
                                            <div key={optIndex} className="flex items-center space-x-2">
                                                <Button
                                                    size="icon"
                                                    variant={q.correctIndex === optIndex ? "default" : "outline"}
                                                    onClick={() => handleSelectCorrect(qIndex, optIndex)}
                                                >
                                                    {q.correctIndex === optIndex ? (
                                                        <Check className="w-4 h-4 text-white" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-red-500" />
                                                    )}
                                                </Button>
                                                <Input
                                                    placeholder={`Đáp án ${String.fromCharCode(65 + optIndex)}`}
                                                    value={opt}
                                                    onChange={(e) => handleChangeOption(qIndex, optIndex, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between items-center">
                                <Button variant="secondary" onClick={addQuestion}>
                                    <Plus className="w-4 h-4 mr-2" /> Thêm câu hỏi
                                </Button>

                                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmitAll}>
                                    Tạo tất cả
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        // Tạo bằng AI
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
                            {/* Upload file or text  */}
                            <div className="space-y-6">
                                <div className="flex justify-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => setMode(mode === "upload" ? "text" : "upload")}
                                    >
                                        <SwitchCamera className="w-4 h-4 mr-2" />
                                        {mode === "upload" ? "Nhập nội dung thủ công" : "Tải tệp từ máy"}
                                    </Button>
                                </div>

                                {mode === "upload" ? (
                                    <>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.doc,.docx,.jpg,.png"
                                            className="hidden"
                                            onChange={handleFileSelect}
                                        />
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <div className="space-y-2">
                                                <div className="flex justify-center space-x-2">
                                                    <File className="w-8 h-8 text-gray-400" />
                                                    <Image className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <p className="text-gray-600">Kéo thả file hoặc click để chọn</p>
                                                <p className="text-sm text-gray-500">
                                                    PDF, DOC, JPG, PNG (Max 10MB)
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="content" className="text-xl font-semibold text-center w-full block">Nhập nội dung</Label>
                                            <Textarea
                                                id="content"
                                                placeholder="Paste nội dung tài liệu vào đây để AI tạo câu hỏi..."
                                                value={uploadedContent}
                                                onChange={(e) => setUploadedContent(e.target.value)}
                                                rows={8}
                                            />
                                        </div>
                                    </>
                                )}
                                {selectedFileName && (
                                    <p className="text-sm text-blue-600 font-medium mt-2">
                                        📄 Đã chọn: {selectedFileName}
                                    </p>
                                )}

                                <Button
                                    className="w-full"
                                    onClick={handleGenerateQuestions}
                                    disabled={mode === "text" && !uploadedContent.trim() || isGenerating}
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
                            </div>
                        </Card>
                    )}

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
            </Layout >
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
                    <Dialog >
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
                                <DialogClose asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => setNewFolderName("")}>
                                        Hủy
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        onClick={handleCreateFolder}
                                        disabled={!newFolderName.trim()}
                                    >
                                        Tạo thư mục
                                    </Button>
                                </DialogClose>
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
                                        <Dialog >
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
                                            {editingFolder && (
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Sửa tên thư mục</DialogTitle>
                                                        <DialogDescription>
                                                            Nhập tên mới cho thư mục
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="edit-folder-name">Tên thư mục</Label>
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
                                                        <DialogClose asChild>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setEditingFolder(null);
                                                                }}
                                                            >
                                                                Hủy
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button onClick={() => {
                                                                handleEditFolder(editingFolder)
                                                            }}>
                                                                Lưu
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            )}

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
                            {/* Quiz bên trong */}
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
