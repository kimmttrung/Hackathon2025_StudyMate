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
    Minus,
    UploadIcon
} from "lucide-react";
import axios from "@/utils/axios.customize";
import { toast } from 'react-toastify';
import UploadImageCloudinary from "@/components/UploadImageCloudinary";

export default function CreateQuestions() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [newFolderName, setNewFolderName] = useState("");
    const [editingFolder, setEditingFolder] = useState(null);
    const [modeQuiz, setModeQuiz] = useState("manual"); // "manual" | "ai"
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [foldersQuiz, setFoldersQuiz] = useState([]);
    const initialQuestion = {
        question_text: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_option: "a",
        explanation: "",
        question_image: "",
        preview_image: "",
        file: null,
    };
    const [questions, setQuestions] = useState([initialQuestion]);
    const [questionsList, setQuestionsList] = useState([initialQuestion]);
    const [resetCount, setResetCount] = useState(0);

    // Edit Delete quiz
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Cretate quiz AI
    const [quizCount, setQuizCount] = useState(5);
    const [mode, setMode] = useState("upload"); // "upload" | "text"
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [uploadedContent, setUploadedContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

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

    // Tạo Quiz thủ công 

    const handleChangeField = (qIndex, field, value) => {
        setQuestions((prev) => {
            const updated = [...prev];
            updated[qIndex] = {
                ...updated[qIndex],
                [field]: value,
            };
            return updated;
        });
    };

    const addQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            {
                question_text: "",
                option_a: "",
                option_b: "",
                option_c: "",
                option_d: "",
                correct_option: "a",
                explanation: "",
                question_image: "",
            },
        ]);
    };

    const removeQuestion = (qIndex) => {
        setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
    };

    const fetchAllQuizzes = async () => {
        try {
            const res = await axios.get(`/api/quiz/folder/${selectedFolder.id}`);
            // console.log("✅ Quiz list from folder", res);
            if (res && res.quizzes) {
                setQuestionsList(res.quizzes); // cập nhật danh sách câu hỏi đã tạo
            } else {
                setQuestionsList([]); // fallback nếu không có quiz
            }
        } catch (error) {
            console.error("❌ Lỗi lấy danh sách quiz:", error.res);
            return [];
        }
    };

    const handleSubmitAll = async () => {
        const uploadedQuestions = await Promise.all(
            questions.map(async (q) => {
                let imageUrl = "";

                if (q.question_image && q.question_image.constructor.name === "File") {
                    const formData = new FormData();
                    formData.append("file", q.question_image);
                    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                    // ✅ Log kiểm tra
                    for (let [key, value] of formData.entries()) {
                        // console.log("🧾 FormData:", key, value);
                    }

                    try {
                        const res = await fetch(
                            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                            {
                                method: "POST",
                                body: formData,
                            }
                        );
                        const data = await res.json();
                        imageUrl = data.secure_url || "";
                        // console.log("✅ Upload thành công:", imageUrl);
                    } catch (error) {
                        toast.error("❌ Lỗi upload ảnh:", error);
                    }
                } else if (typeof q.question_image === "string") {
                    imageUrl = q.question_image;
                }

                return {
                    ...q,
                    question_image: imageUrl,
                };
            })
        );

        try {
            const res = await axios.post("/api/quiz/create", {
                folder_id: selectedFolder.id, // 👈 đừng quên nếu cần folder_id
                quizzes: uploadedQuestions,
            });

            // console.log("check create", res)

            if (res.CD === 1) {
                toast.success("✅ Tạo quiz thành công!");
                setQuestions([{ ...initialQuestion }]);
                setResetCount((prev) => prev + 1);
                await fetchAllQuizzes();
            }
        } catch (error) {
            console.error("❌ Lỗi gửi dữ liệu:", error);
            toast.error("❌ Có lỗi xảy ra khi gửi dữ liệu.");
        }
    };

    // Tạo Quiz AI 

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);              // lưu file gốc
        setSelectedFileName(file.name); // 👉 lưu tên file để hiển thị
        // TODO: upload file or preview content
        console.log("Selected file:", file);
    };

    const handleGenerateQuestions = async () => {
        setIsGenerating(true);

        try {
            if (!selectedFolder?.id) {
                toast.error("⚠️ Bạn cần chọn folder trước.");
                return;
            }

            const formData = new FormData();
            const count = quizCount || 5;

            if (mode === "upload") {
                if (!selectedFile) {
                    toast.error("❌ Vui lòng chọn file hợp lệ.");
                    return;
                }

                formData.append("file", selectedFile);
                formData.append("folder_id", selectedFolder.id);
                formData.append("count", count);

                const res = await axios.post("/api/quiz/ai/upload", formData);
                console.log("check res AI upload", res);
                if (res.length > 0) {
                    toast.success(`✅ Tạo ${res.length} câu hỏi từ file thành công.`);
                    setSelectedFile(null);
                    setSelectedFileName("");
                }
            } else {
                if (!uploadedContent.trim()) {
                    toast.error("❌ Vui lòng nhập nội dung văn bản.");
                    return;
                }

                const res = await axios.post("/api/quiz/ai/text", {
                    content: uploadedContent,
                    count,
                    folder_id: selectedFolder.id,
                });
                console.log("check res AI text", res);
                if (res.length > 0) {
                    toast.success(`✅ Tạo ${res.length} câu hỏi từ văn bản thành công.`);
                    setUploadedContent("");
                }
            }

            await fetchAllQuizzes(); // reload lại danh sách quiz sau khi tạo
        } catch (err) {
            console.error("❌ Lỗi khi tạo quiz:", err);
            toast.error("❌ Tạo quiz thất bại.");
        } finally {
            setIsGenerating(false);
        }
    };


    useEffect(() => {
        fetchFoldersQuiz();
    }, []);

    useEffect(() => {
        if (selectedFolder?.id) {
            fetchAllQuizzes();
        }
    }, [selectedFolder]);

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
                                <CardTitle className="text-lg font-bold text-indigo-700">✍️ Tạo Quiz Thủ Công</CardTitle>
                                <CardDescription>
                                    Nhập câu hỏi, lựa chọn, giải thích, ảnh minh họa, đánh dấu đáp án đúng rồi nhấn "Tạo tất cả"
                                </CardDescription>
                            </CardHeader>

                            {questions.map((q, qIndex) => (
                                <div key={qIndex} className="border border-gray-300 rounded-lg p-4 bg-white/90 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Input
                                            placeholder={`Câu hỏi ${qIndex + 1}`}
                                            value={q.question_text}
                                            onChange={(e) => handleChangeField(qIndex, "question_text", e.target.value)}
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

                                    <UploadImageCloudinary
                                        onFileSelect={(file) => handleChangeField(qIndex, "question_image", file)}
                                        resetTrigger={resetCount}
                                    />


                                    {/* Các lựa chọn */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {["a", "b", "c", "d"].map((optKey) => (
                                            <div key={optKey} className="flex items-center space-x-2">
                                                <Button
                                                    size="icon"
                                                    variant={q.correct_option === optKey ? "default" : "outline"}
                                                    onClick={() => handleChangeField(qIndex, "correct_option", optKey)}
                                                >
                                                    {q.correct_option === optKey ? (
                                                        <Check className="w-4 h-4 text-white" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-red-500" />
                                                    )}
                                                </Button>
                                                <Input
                                                    placeholder={`Đáp án ${optKey.toUpperCase()}`}
                                                    value={q[`option_${optKey}`]}
                                                    onChange={(e) => handleChangeField(qIndex, `option_${optKey}`, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Giải thích */}
                                    <Textarea
                                        placeholder="Giải thích cho đáp án đúng (nếu có)"
                                        value={q.explanation}
                                        onChange={(e) => handleChangeField(qIndex, "explanation", e.target.value)}
                                        className="h-24"
                                    />
                                </div>
                            ))}

                            {/* Nút thêm và submit */}
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

                                {/* Upload hoặc Text */}
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
                                                <p className="text-sm text-gray-500">PDF, DOC, JPG, PNG (Max 10MB)</p>
                                            </div>
                                        </div>

                                        {/* ✅ Input số lượng dưới upload */}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="text-sm text-gray-600">Số câu:</span>
                                            <Input
                                                type="number"
                                                className="w-16 h-8 px-2 py-0 text-sm"
                                                min={1}
                                                max={20}
                                                value={quizCount}
                                                onChange={(e) => setQuizCount(Number(e.target.value))}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="content" className="text-xl font-semibold text-center w-full block">
                                                Nhập nội dung
                                            </Label>
                                            <Textarea
                                                id="content"
                                                placeholder="Paste nội dung tài liệu vào đây để AI tạo câu hỏi..."
                                                value={uploadedContent}
                                                onChange={(e) => setUploadedContent(e.target.value)}
                                                rows={8}
                                            />
                                        </div>

                                        {/* ✅ Input số lượng dưới textarea */}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="text-sm text-gray-600">Số câu:</span>
                                            <Input
                                                type="number"
                                                className="w-16 h-8 px-2 py-0 text-sm"
                                                min={1}
                                                max={20}
                                                value={quizCount}
                                                onChange={(e) => setQuizCount(Number(e.target.value))}
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
                                    disabled={(mode === "text" && !uploadedContent.trim()) || isGenerating}
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
                            <div className="space-y-4  hide-scrollbar">
                                {/* List quiz  */}
                                {questionsList.map((question) => (
                                    <div
                                        key={question.id}
                                        className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-10 items-start">
                                                {question.question_image && (
                                                    <img
                                                        src={question.question_image}
                                                        alt="Question"
                                                        className="w-48 h-48 object-cover rounded shadow border"
                                                    />
                                                )}

                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 mb-2">
                                                        {question.question_text}
                                                    </p>

                                                    <ul className="text-sm text-gray-700 mb-3 space-y-1 list-disc list-inside">
                                                        <li>A. {question.option_a}</li>
                                                        <li>B. {question.option_b}</li>
                                                        <li>C. {question.option_c}</li>
                                                        <li>D. {question.option_d}</li>
                                                    </ul>

                                                    <p className="text-sm text-indigo-600 font-semibold">
                                                        Đáp án đúng: {question.correct_option?.toUpperCase()}
                                                    </p>

                                                    {question.explanation && (
                                                        <p className="text-sm text-gray-600 mt-2">
                                                            Giải thích: {question.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>


                                            <div className="flex space-x-1 ml-4">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedQuiz(question);
                                                        setShowEditModal(true);
                                                    }}
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700"
                                                    onClick={() => {
                                                        setSelectedQuiz(question);
                                                        setShowDeleteModal(true);
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Modal Edit Quiz  */}
                                {showEditModal && selectedQuiz && (
                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-xl p-6 w-full max-w-xl space-y-4 shadow-lg">
                                            <h2 className="text-xl font-bold text-indigo-700">📝 Chỉnh sửa câu hỏi</h2>

                                            {/* Ảnh hiển thị */}
                                            <div className="flex justify-center items-center gap-4">
                                                {/* Nếu có ảnh thì hiển thị */}
                                                {selectedQuiz.question_image && (
                                                    <img
                                                        src={
                                                            typeof selectedQuiz.question_image === "string"
                                                                ? selectedQuiz.question_image
                                                                : URL.createObjectURL(selectedQuiz.question_image)
                                                        }
                                                        alt="Preview"
                                                        className="w-40 h-40 object-cover rounded shadow border"
                                                    />
                                                )}

                                                {/* Nút upload ảnh luôn hiển thị */}
                                                <label
                                                    htmlFor="upload-image"
                                                    className="cursor-pointer flex flex-col items-center justify-center w-12 h-12 border-2 border-dashed border-gray-400 rounded-full hover:bg-gray-100 transition"
                                                    title="Tải ảnh mới"
                                                >
                                                    <UploadIcon className="w-5 h-5 text-gray-600" />
                                                </label>

                                                <input
                                                    id="upload-image"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            setSelectedQuiz({ ...selectedQuiz, question_image: file });
                                                        }
                                                    }}
                                                />
                                            </div>

                                            {/* Câu hỏi */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Câu hỏi</label>
                                                <Input
                                                    value={selectedQuiz.question_text}
                                                    onChange={(e) =>
                                                        setSelectedQuiz({ ...selectedQuiz, question_text: e.target.value })
                                                    }
                                                    placeholder="Nhập nội dung câu hỏi"
                                                />
                                            </div>

                                            {/* Các đáp án */}
                                            {["a", "b", "c", "d"].map((optKey) => (
                                                <div key={optKey}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Đáp án {optKey.toUpperCase()}
                                                    </label>
                                                    <Input
                                                        value={selectedQuiz[`option_${optKey}`]}
                                                        onChange={(e) =>
                                                            setSelectedQuiz({ ...selectedQuiz, [`option_${optKey}`]: e.target.value })
                                                        }
                                                        placeholder={`Nhập đáp án ${optKey.toUpperCase()}`}
                                                    />
                                                </div>
                                            ))}

                                            {/* Đáp án đúng */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Đáp án đúng (a, b, c, d)</label>
                                                <Input
                                                    value={selectedQuiz.correct_option}
                                                    onChange={(e) =>
                                                        setSelectedQuiz({ ...selectedQuiz, correct_option: e.target.value.toLowerCase() })
                                                    }
                                                    placeholder="Nhập đáp án đúng"
                                                />
                                            </div>

                                            {/* Giải thích */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Giải thích (nếu có)</label>
                                                <Input
                                                    value={selectedQuiz.explanation}
                                                    onChange={(e) =>
                                                        setSelectedQuiz({ ...selectedQuiz, explanation: e.target.value })
                                                    }
                                                    placeholder="Nhập giải thích cho đáp án"
                                                />
                                            </div>

                                            {/* Nút hành động */}
                                            <div className="flex justify-end space-x-2 pt-2">
                                                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                                                    Hủy
                                                </Button>
                                                <Button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                                    onClick={async () => {
                                                        try {
                                                            let updatedQuiz = { ...selectedQuiz };
                                                            // Nếu là File -> upload lên Cloudinary
                                                            if (updatedQuiz.question_image &&
                                                                typeof updatedQuiz.question_image === "object" &&
                                                                updatedQuiz.question_image.constructor?.name === "File") {
                                                                const formData = new FormData();
                                                                formData.append("file", updatedQuiz.question_image);
                                                                formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                                                                const res = await fetch(
                                                                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                                                    { method: "POST", body: formData }
                                                                );

                                                                const data = await res.json();
                                                                updatedQuiz.question_image = data.secure_url;
                                                            }

                                                            await axios.put(`/api/quiz/${updatedQuiz.id}`, updatedQuiz);
                                                            toast.success("✅ Cập nhật thành công");
                                                            setShowEditModal(false);
                                                            await fetchAllQuizzes();
                                                        } catch (err) {
                                                            toast.error("❌ Lỗi khi cập nhật quiz");
                                                            console.error(err);
                                                        }
                                                    }}

                                                >
                                                    Lưu
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {/* Modal Delete Quiz  */}
                                {showDeleteModal && selectedQuiz && (
                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 shadow-lg text-center">
                                            <h2 className="text-lg font-bold text-red-600">⚠️ Xác nhận xóa quiz</h2>
                                            <p>Bạn có chắc chắn muốn xóa câu hỏi này không?</p>
                                            <p className="text-gray-600 font-medium">"{selectedQuiz.question_text}"</p>

                                            <div className="flex justify-center space-x-4 mt-4">
                                                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                                                    Hủy
                                                </Button>
                                                <Button
                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                    onClick={async () => {
                                                        try {
                                                            await axios.delete(`/api/quiz/${selectedQuiz.id}`);
                                                            toast.success("✅ Đã xóa quiz");
                                                            setShowDeleteModal(false);
                                                            fetchAllQuizzes();
                                                        } catch (err) {
                                                            toast.error("❌ Lỗi khi xóa quiz");
                                                        }
                                                    }}
                                                >
                                                    Xóa
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {questionsList.length === 0 && (
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
