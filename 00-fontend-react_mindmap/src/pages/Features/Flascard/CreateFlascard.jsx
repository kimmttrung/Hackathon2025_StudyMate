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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    FileUp,
    ImageIcon,
    PlusCircle,
    User,
    Bot,
    MinusCircle,
} from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import axios from "@/utils/axios.customize";
import { DialogClose } from "@radix-ui/react-dialog";

const CreateFlascard = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [name, setName] = useState("");
    const [editingFolder, setEditingFolder] = useState(null);
    const [cards, setCards] = useState([
        { id: crypto.randomUUID(), front: "", back: "" }
    ]);
    const [showUploadMode, setShowUploadMode] = useState(true);
    const [uploadedIndex, setUploadedIndex] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [folders, setFolders] = useState([]);
    const [flashcards, setFlashcards] = useState([]);

    // Flashcard
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("edit"); // 'edit' | 'delete'
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [editFront, setEditFront] = useState("");
    const [editBack, setEditBack] = useState("");


    const recentlyCreated = [
        { name: "Từ vựng tiếng Anh", cards: 15, type: "user", date: "Hôm nay" },
        { name: "Công thức Toán học", cards: 8, type: "ai", date: "Hôm qua" },
        { name: "Lịch sử Việt Nam", cards: 12, type: "user", date: "2 ngày trước" },
    ];
    const uploadTemplates = [
        {
            name: "Upload PDF",
            description: "Tải lên file PDF chứa nội dung flashcard",
            icon: FileText,
            accept: ".pdf",
        },
        {
            name: "Upload DOC",
            description: "Tải lên file Word (DOC/DOCX)",
            icon: FileUp,
            accept: ".doc,.docx",
        },
        {
            name: "Upload Image",
            description: "Tải lên hình ảnh chứa nội dung để trích xuất flashcard",
            icon: ImageIcon,
            accept: "image/*",
        },
    ];

    const fileInputsRef = useRef([]);

    const handleAddCardInput = () => {
        setCards((prev) => [
            ...prev,
            { id: crypto.randomUUID(), front: "", back: "" }
        ]);
    };

    const handleRemoveCardInput = () => {
        setCards((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    };

    const handleChange = (index, field, value) => {
        setCards((prev) => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    };

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );


    const handleCreateFolder = async () => {
        const user_id = getUserIdFromToken();
        if (!user_id || !name.trim()) return;
        try {
            const res = await axios.post(`/api/folders/create`, { user_id, name });
            // Cập nhật state nếu muốn
            await fetchFolders();

            toast.success("Cập nhật thành công");
            setEditingFolder(null); // Đóng Dialog
        } catch (error) {
            toast.error("Lỗi khi tạo thư mục");
            console.error(err);
        }
    };

    const handleEditFolder = async (folder) => {
        if (!folder?.id || !folder?.name?.trim()) {
            toast.error("Tên thư mục không hợp lệ");
            return;
        }
        console.log(">>> check folder", folder);
        try {
            const res = await axios.put(`/api/folders/${folder.id}`, {
                name: folder.name.trim(),
            })
            toast.success("Đã cập nhật thư mục");
            await fetchFolders();
            // setEditingFolder(null);
        } catch (error) {

        }
    };

    const handleDeleteFolder = async (folderId) => {
        if (!folderId) return;
        try {
            await axios.delete(`/api/folders/${folderId}`);
            // Xoá thành công → cập nhật danh sách
            setFolders((prev) => prev.filter((f) => f.id !== folderId));
            toast.success("Xóa thư mục thành công");
        } catch (error) {
            console.error("Lỗi khi xóa thư mục:", err);
            toast.error("Không thể xóa thư mục");
        }
    };

    //     if (!uploadedContent.trim()) return;
    //     setIsGenerating(true);
    //     // Simulate AI generation
    //     setTimeout(() => {
    //         const newQuestions = [
    //             {
    //                 id: Date.now().toString(),
    //                 question: "Câu hỏi mới được tạo từ nội dung đã upload",
    //                 answer: "Đáp án được AI tạo ra",
    //                 type: "open-ended",
    //                 difficulty: "medium",
    //             },
    //             {
    //                 id: (Date.now() + 1).toString(),
    //                 question: "Câu hỏi trắc nghiệm từ tài liệu",
    //                 answer: "Đáp án A",
    //                 options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    //                 type: "multiple-choice",
    //                 difficulty: "easy",
    //             },
    //         ];
    //         setQuestions([...questions, ...newQuestions]);
    //         setUploadedContent("");
    //         setIsGenerating(false);
    //     }, 2000);
    // };


    // Hàm lấy user_id từ token
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

    const fetchFolders = async () => {
        const user_id = getUserIdFromToken();
        if (!user_id) {
            return;
        } else {
            try {
                const res = await axios.get(`/api/folders/${user_id}`)
                console.log(">>>check res", res);
                setFolders(res); // gán dữ liệu vào state
            } catch (error) {
                toast.error("Lỗi khi lấy danh sách thư mục:", err);
            }
        }
    }

    const handleSaveFlashcards = async () => {
        try {
            for (const card of cards) {
                if (!card.front.trim() && !card.back.trim()) continue;

                await axios.post("/api/flashcards/create", {
                    folder_id: selectedFolder?.id, // hoặc truyền folderId khác nếu có
                    front_text: card.front,
                    back_text: card.back,
                });
            }
            fetchFlashcards();
            toast.success("Đã lưu các flashcard thành công!");
            setCards([{ id: crypto.randomUUID(), front: "", back: "" }]); // reset
        } catch (error) {
            console.error("Error inserting flashcard:", error);
            toast.error("Lỗi khi thêm flashcard");
        }
    };

    const handleEditFlashcard = (index) => {
        toast.info(`📝 Bạn đã nhấn Edit cho thẻ #${index}`, {
            position: "top-center",
            autoClose: 2000
        })
    }

    const handleDeleteFlashcard = (index) => {
        toast.warn(`🗑️ Bạn đã nhấn Xóa thẻ #${index}`, {
            position: "top-center",
            autoClose: 2000
        })
    }

    const fetchFlashcards = async () => {
        if (!selectedFolder?.id) return;
        try {
            const res = await axios.get(`/api/flashcards/folder/${selectedFolder.id}`);
            // console.log(">>> check flashcards", res);
            setFlashcards(res);
        } catch (error) {
            toast.error("Lỗi khi lấy flashcard");
            console.error(error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await fetchFolders();
        };

        fetchData();
    }, []);



    useEffect(() => {
        const fetchFlashcards = async () => {
            if (!selectedFolder?.id) return;
            try {
                const res = await axios.get(`/api/flashcards/folder/${selectedFolder.id}`);
                // console.log(">>> check flashcards", res);
                setFlashcards(res);
            } catch (error) {
                toast.error("Lỗi khi lấy flashcard");
                console.error(error);
            }
        };
        fetchFlashcards();
    }, [selectedFolder]);


    if (selectedFolder) {
        // console.log(">>>>check selectedFolder", selectedFolder);
        return (
            <Layout >
                <div className="text-left">
                    <button
                        onClick={() => setSelectedFolder(null)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách thư mục
                    </button>
                </div>
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-3 text-create-foreground">
                            <div className="w-12 h-12 rounded-xl bg-create flex items-center justify-center">
                                <PlusCircle className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-bold">Tạo Flashcard Mới</h1>
                        </div>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Tạo flashcard bằng cách tự nhập hoặc sử dụng AI để tạo tự động từ
                            nội dung
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Creation Area */}
                        <div className="lg:col-span-2">
                            <Tabs defaultValue="manual" className="space-y-6">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="manual" className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Tạo thủ công
                                    </TabsTrigger>
                                    <TabsTrigger value="ai" className="flex items-center gap-2">
                                        <Bot className="w-4 h-4" />
                                        Tạo bằng AI
                                    </TabsTrigger>
                                </TabsList>

                                {/* Manual Creation */}
                                <TabsContent value="manual" className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <User className="w-5 h-5" />
                                                Tạo flashcard thủ công
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">

                                            <div className="space-y-4">
                                                <label className="text-sm font-medium">
                                                    Thẻ flashcard
                                                </label>

                                                <Card className="border-dashed border-2 border-create/30">
                                                    <CardContent className="p-4 space-y-4">
                                                        {cards.map((card, index) => (
                                                            <div key={card.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="text-sm font-medium">Mặt trước</label>
                                                                    <Textarea
                                                                        placeholder="Nhập nội dung mặt trước"
                                                                        className="min-h-[100px]"
                                                                        value={card.front}
                                                                        onChange={(e) => handleChange(index, "front", e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-sm font-medium">Mặt sau</label>
                                                                    <Textarea
                                                                        placeholder="Nhập nội dung mặt sau"
                                                                        className="min-h-[100px]"
                                                                        value={card.back}
                                                                        onChange={(e) => handleChange(index, "back", e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div className="flex gap-4">
                                                            <Button
                                                                variant="outline"
                                                                className="w-full border-create text-create-foreground hover:bg-create/10"
                                                                onClick={handleAddCardInput}
                                                            >
                                                                <PlusCircle className="w-4 h-4 mr-2" />
                                                                Thêm thẻ mới
                                                            </Button>

                                                            <Button
                                                                variant="outline"
                                                                className="w-full border-destructive text-red-600 hover:bg-red-50"
                                                                onClick={handleRemoveCardInput}
                                                            >
                                                                <MinusCircle className="w-4 h-4 mr-2" />
                                                                Giảm thẻ
                                                            </Button>
                                                        </div>

                                                        <Button
                                                            className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                                            onClick={handleSaveFlashcards}
                                                        >
                                                            Lưu tất cả thẻ
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    {/* Xem flashcard */}
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className="px-4 py-2">ID</th>
                                                            <th className="px-4 py-2">Mặt trước</th>
                                                            <th className="px-4 py-2">Mặt sau</th>
                                                            <th className="px-4 py-2">Ngày tạo</th>
                                                            <th className="px-4 py-2 text-center">Hành động</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {flashcards.map((card, index) => (
                                                            <tr key={index} className="border-t">
                                                                <td className="px-4 py-2">{index + 1}</td>
                                                                <td className="px-4 py-2">{card.front_text}</td>
                                                                <td className="px-4 py-2">{card.back_text}</td>
                                                                <td className="px-4 py-2">{new Date(card.created_at).toLocaleDateString("vi-VN")}</td>
                                                                <td className="px-4 py-2 flex gap-2 justify-center">
                                                                    <Button variant="outline" onClick={() => handleEditFlashcard(index)}>Edit</Button>
                                                                    <Button variant="destructive" onClick={() => handleDeleteFlashcard(index)}>Xóa</Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <ToastContainer />
                                        </CardContent>
                                    </Card>

                                </TabsContent>

                                {/* AI Creation */}
                                <TabsContent value="ai" className="space-y-6">

                                    {/* Nút toggle duy nhất */}
                                    <div className="flex justify-end">
                                        <Button onClick={() => setShowUploadMode(!showUploadMode)}>
                                            {showUploadMode ? "Text" : "Upload"}
                                        </Button>
                                    </div>

                                    {/* Nếu đang ở chế độ Upload */}
                                    {showUploadMode ? (
                                        <>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2">
                                                        <Upload className="w-5 h-5" />
                                                        Chọn tệp để tải lên
                                                    </CardTitle>
                                                </CardHeader>

                                                <CardContent className="space-y-6">
                                                    {/* Các lựa chọn upload (PDF, DOC, IMAGE) */}
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {uploadTemplates.map((template, index) => {
                                                            const IconComponent = template.icon;
                                                            return (
                                                                <Card
                                                                    key={index}
                                                                    className="cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-md border-2 hover:border-create/50"
                                                                    onClick={() => {
                                                                        if (uploadedFileName) {
                                                                            toast.error("Bạn đã upload file rồi!");
                                                                        } else {
                                                                            document.getElementById(`file-${index}`)?.click();
                                                                        }
                                                                    }}
                                                                >
                                                                    <CardContent className="p-4 space-y-2">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 rounded-lg bg-create/20 flex items-center justify-center">
                                                                                <IconComponent className="w-5 h-5 text-create-foreground" />
                                                                            </div>
                                                                            <div className="flex-1">
                                                                                <h3 className="font-medium">{template.name}</h3>
                                                                                <p className="text-sm text-muted-foreground">{template.description}</p>
                                                                            </div>
                                                                        </div>

                                                                        {/* input file */}
                                                                        <input
                                                                            id={`file-${index}`}
                                                                            type="file"
                                                                            accept={template.accept}
                                                                            onChange={(e) => {
                                                                                const file = e.target.files?.[0];
                                                                                if (file) {
                                                                                    setUploadedFileName(file.name);
                                                                                    setUploadedIndex(index);
                                                                                }
                                                                            }}
                                                                            className="hidden"
                                                                        />

                                                                        {/* Hiển thị tên file chỉ khi đúng index */}
                                                                        {uploadedIndex === index && uploadedFileName && (
                                                                            <div className="text-sm text-green-600">📄 Đã chọn: {uploadedFileName}</div>
                                                                        )}
                                                                    </CardContent>
                                                                </Card>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Nút Tạo bằng AI */}
                                                    <div className="flex justify-center">
                                                        <Button className="mt-4 px-6 py-2 bg-gradient-to-r from-create to-accent text-white rounded-xl shadow-lg">
                                                            <Sparkles className="w-4 h-4 mr-2" />
                                                            Tạo bằng AI
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                        </>
                                    ) : (
                                        <>
                                            {/* Giao diện nhập nội dung */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center gap-2">
                                                        <Upload className="w-5 h-5" />
                                                        Tạo với AI Assistant
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Chủ đề hoặc nội dung</label>
                                                        <Textarea
                                                            placeholder="VD: Tạo 10 flashcard về từ vựng tiếng Anh chủ đề gia đình..."
                                                            className="min-h-[120px]"
                                                        />
                                                    </div>
                                                    <Button className="w-full bg-gradient-to-r from-create to-accent text-white">
                                                        <Sparkles className="w-4 h-4 mr-2" />
                                                        Tạo bằng AI
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </>
                                    )}
                                </TabsContent>

                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Recently Created */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Gần đây</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {recentlyCreated.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium text-sm">{item.name}</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-muted-foreground">
                                                        {item.cards} thẻ
                                                    </span>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {item.type === "ai" ? (
                                                            <>
                                                                <Bot className="w-3 h-3 mr-1" />
                                                                AI
                                                            </>
                                                        ) : (
                                                            <>
                                                                <User className="w-3 h-3 mr-1" />
                                                                User
                                                            </>
                                                        )}
                                                    </Badge>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.date}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Tips */}
                            <Card className="bg-gradient-to-br from-create/10 to-accent/5 border-create/30">
                                <CardHeader>
                                    <CardTitle className="text-create-foreground">
                                        Mẹo tạo flashcard hiệu quả
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="space-y-2">
                                        <p className="text-sm">💡 Giữ nội dung ngắn gọn và rõ ràng</p>
                                        <p className="text-sm">
                                            🎯 Tập trung vào một khái niệm mỗi thẻ
                                        </p>
                                        <p className="text-sm">🖼️ Sử dụng hình ảnh khi có thể</p>
                                        <p className="text-sm">
                                            🔄 Kiểm tra và chỉnh sửa thường xuyên
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tạo Flashcard</h1>
                        <p className="text-gray-600">
                            Quản lý thư mục và tạo flashcard từ tài liệu
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-yellow-500 hover:bg-yellow-600">
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => setName("")}>
                                        Hủy
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        onClick={handleCreateFolder}
                                        disabled={!name.trim()}
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
                    {filteredFolders.map((folder, index) => (
                        <Card
                            key={index}
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
                                                {folder.flashcardCount} flashcard •{" "}
                                                {new Date(folder.created_at).toLocaleDateString("vi-VN")}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingFolder(folder); // Gán folder đang sửa
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
                                                            <Label htmlFor="edit-folder-name">
                                                                Tên thư mục
                                                            </Label>
                                                            <Input
                                                                id="edit-folder-name"
                                                                value={editingFolder?.name || ""}
                                                                onChange={(e) =>
                                                                    setEditingFolder((prev) =>
                                                                        prev ? { ...prev, name: e.target.value } : prev
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => setEditingFolder(null)}
                                                            >
                                                                Hủy
                                                            </Button>
                                                        </DialogClose>

                                                        <DialogClose asChild>
                                                            <Button
                                                                onClick={() => {
                                                                    handleEditFolder(editingFolder);
                                                                }}
                                                            >
                                                                Lưu
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            )}
                                        </Dialog>

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
                                                        className="bg-red-600 hover:bg-red-700"
                                                        onClick={() => handleDeleteFolder(folder.id)}
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
                                        {folder.flashcardCount} câu hỏi
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
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={() => setName("")}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            onClick={handleCreateFolder}
                                            disabled={!name.trim()}
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
export default CreateFlascard;
