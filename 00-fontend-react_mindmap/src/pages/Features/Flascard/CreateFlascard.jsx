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
    FolderOpen,
    ArrowLeft,
    Sparkles,
    FileUp,
    ImageIcon,
    PlusCircle,
    User,
    Bot,
    MinusCircle,
    X,
    Bell,
    Loader2,
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
    const [showRecentPanel, setShowRecentPanel] = useState(false);
    const [cardCount, setCardCount] = useState(2);
    const [loading, setLoading] = useState(false);
    const [reloadFlashcards, setReloadFlashcards] = useState(false);


    const recentlyCreated = [
        { name: "Từ vựng tiếng Anh", cards: 15, type: "user", date: "Hôm nay" },
        { name: "Công thức Toán học", cards: 8, type: "ai", date: "Hôm qua" },
        { name: "Lịch sử Việt Nam", cards: 12, type: "user", date: "2 ngày trước" },
        { name: "Idioms in English", cards: 10, type: "ai", date: "3 ngày trước" },
        { name: "Ngữ pháp tiếng Nhật N4", cards: 20, type: "user", date: "4 ngày trước" },
        { name: "Chủ nghĩa xã hội khoa học", cards: 18, type: "ai", date: "5 ngày trước" },
        { name: "Kinh tế chính trị Mác – Lênin", cards: 14, type: "user", date: "6 ngày trước" },
        { name: "Kanji thường gặp N3", cards: 25, type: "user", date: "1 tuần trước" }
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

    const handleUploadAndGenerate = async () => {
        try {
            setLoading(true);

            const file = document.getElementById(`file-${uploadedIndex}`).files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("cardCount", cardCount);
            formData.append("folder_id", selectedFolder.id);

            console.log("check folderid", selectedFolder.id);

            const res = await axios.post("/api/ai/upload", formData);
            // console.log("check res ", res);
            toast.success("Đã tạo và lưu flashcards!");

            // Reset upload
            setUploadedFileName("");
            setUploadedIndex(null);
            setReloadFlashcards((prev) => !prev);
        } catch (error) {
            console.error("Lỗi khi tạo flashcard:", error);
            toast.error("Không thể tạo flashcard từ AI");
        } finally {
            setLoading(false);
        }
    };

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
        // console.log(">>> check folder", folder);
        try {
            const res = await axios.put(`/api/folders/${folder.id}`, {
                name: folder.name.trim(),
            })
            toast.success("Đã cập nhật thư mục");
            await fetchFolders();
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
                setFolders(res); // gán dữ liệu vào state
            } catch (error) {
                toast.error("Lỗi khi lấy danh sách thư mục:", error);
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
            toast.success("Đã lưu các flashcard thành công!");
            setCards([{ id: crypto.randomUUID(), front: "", back: "" }]); // reset
            setReloadFlashcards((prev) => !prev);
        } catch (error) {
            console.error("Error inserting flashcard:", error);
            toast.error("Lỗi khi thêm flashcard");
        }
    };

    const handleEditFlashcard = (index) => {
        const card = flashcards[index];
        setEditFront(card.front_text);
        setEditBack(card.back_text);
        setSelectedIndex(index);
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const handleDeleteFlashcard = (index) => {
        setSelectedIndex(index);
        setDialogMode("delete");
        setDialogOpen(true);
    };

    // Gọi API edit
    const handleConfirmEdit = async () => {
        try {
            const id = flashcards[selectedIndex]?.id;
            if (!id) return toast.error("Không tìm thấy ID thẻ để cập nhật");

            const res = await axios.put(`/api/flashcards/${id}`, {
                front_text: editFront,
                back_text: editBack,
            });
            // Cập nhật lại danh sách flashcards 
            toast.success(`Cập nhật thành công thẻ ${selectedIndex + 1}`);
            setReloadFlashcards((prev) => !prev);
            setDialogOpen(false);
        } catch (error) {
            console.error("Lỗi cập nhật flashcard:", error);
            toast.error("Cập nhật thất bại");
        }
    };

    // Gọi API delete
    const handleConfirmDelete = async () => {
        const id = flashcards[selectedIndex]?.id;
        if (!id) return toast.error("Không tìm thấy ID thẻ để xóa");

        await axios.delete(`/api/flashcards/${id}`);
        setReloadFlashcards((prev) => !prev);
        toast.success(`🗑️ Đã xoá thẻ ${selectedIndex}`);
        setDialogOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchFolders();
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedFolder?.id) return;
        let cancelled = false;

        const fetch = async () => {
            try {
                const res = await axios.get(`/api/flashcards/folder/${selectedFolder.id}`);
                if (!cancelled) setFlashcards(res);
            } catch (error) {
                toast.error("Lỗi khi lấy flashcard");
            }
        };

        fetch();

        return () => {
            cancelled = true; // huỷ nếu component unmount
        };
    }, [selectedFolder?.id, reloadFlashcards]);

    if (selectedFolder) {
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
                        <div className="lg:col-span-3">
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
                                                    <div className="flex items-center gap-4">
                                                        <label htmlFor="card-count" className="text-sm font-medium">Số lượng flashcard:</label>
                                                        <input
                                                            id="card-count"
                                                            type="number"
                                                            value={cardCount}
                                                            onChange={(e) => setCardCount(Number(e.target.value))}
                                                            min={1}
                                                            max={20}
                                                            className="border p-2 rounded w-20 text-center"
                                                        />
                                                    </div>

                                                    {/* Nút Tạo bằng AI */}
                                                    <div className="flex justify-center">
                                                        <Button
                                                            className="mt-4 px-6 py-2 bg-gradient-to-r from-create to-accent text-white rounded-xl shadow-lg"
                                                            onClick={handleUploadAndGenerate}
                                                        >
                                                            <Sparkles className="w-4 h-4 mr-2" />
                                                            Tạo bằng AI
                                                        </Button>
                                                    </div>
                                                    {loading && (
                                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                                                            <div className="flex flex-col items-center gap-4 text-white">
                                                                <Loader2 className="w-10 h-10 animate-spin text-white" />
                                                                <p className="text-lg font-medium animate-pulse">Đang xử lý, vui lòng chờ...</p>
                                                            </div>
                                                        </div>
                                                    )}


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
                                                    <Button
                                                        className="w-full bg-gradient-to-r from-create to-accent text-white"
                                                        onClick={handleUploadAndGenerate}
                                                    >
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
                        {/* Thông báo */}
                        <Button
                            className="fixed top-1/2 right-10 z-50 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
                            onClick={() => setShowRecentPanel(true)}
                        >
                            <Bell className="w-5 h-5" />
                        </Button>
                        {showRecentPanel && (
                            <div className="fixed top-1/2 right-4 transform -translate-y-1/2 
                  w-[360px] bg-white border border-gray-300 rounded-xl 
                  shadow-xl z-50 p-6 overflow-y-auto transition-all 
                  animate-fade-in hide-scrollbar">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">📂 Gần đây</h2>
                                    <Button variant="ghost" size="icon" onClick={() => setShowRecentPanel(false)}>
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Danh sách */}
                                <div className="space-y-3 pr-1 hide-scrollbar max-h-[60vh]">
                                    {recentlyCreated.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">Không có thẻ nào gần đây.</p>
                                    ) : (
                                        recentlyCreated.map((item, index) => (
                                            <div
                                                key={index}
                                                className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors shadow-sm"
                                            >
                                                <div className="font-medium text-sm">{item.name}</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-muted-foreground">{item.cards} thẻ</span>
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
                                                <div className="text-xs text-muted-foreground">{item.date}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}



                    </div>
                    {/* Xem flashcard */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2">STT</th>
                                            <th className="px-4 py-2">Mặt trước</th>
                                            <th className="px-4 py-2">Mặt sau</th>
                                            <th className="px-4 py-2">Ngày tạo</th>
                                            <th className="px-4 py-2">Ngày sửa</th>
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
                                                <td className="px-4 py-2">
                                                    {card.last_update
                                                        ? new Date(card.last_update).toLocaleDateString("vi-VN")
                                                        : "Chưa cập nhật"}
                                                </td>
                                                <td className="px-4 py-2 flex gap-2 justify-center">
                                                    <Button variant="outline" onClick={() => handleEditFlashcard(index)}>Edit</Button>
                                                    <Button variant="destructive" onClick={() => handleDeleteFlashcard(index)}>Xóa</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                                    <DialogContent className="max-w-md mx-auto bg-purple-100">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {dialogMode === "edit" ? "Chỉnh sửa Flashcard" : "Xác nhận xoá"}
                                            </DialogTitle>
                                        </DialogHeader>

                                        {dialogMode === "edit" ? (
                                            <>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-sm font-medium">Mặt trước</label>
                                                        <Textarea
                                                            value={editFront}
                                                            onChange={(e) => setEditFront(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium">Mặt sau</label>
                                                        <Textarea
                                                            value={editBack}
                                                            onChange={(e) => setEditBack(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter className="mt-4">
                                                    <Button onClick={handleConfirmEdit} className="bg-purple-600 text-white">Lưu thay đổi</Button>
                                                </DialogFooter>
                                            </>
                                        ) : (
                                            <>
                                                <DialogDescription className="py-2">
                                                    Bạn có chắc chắn muốn xoá thẻ {selectedIndex + 1} không?
                                                </DialogDescription>
                                                <DialogFooter className="mt-4 flex gap-3">
                                                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                                        Hủy
                                                    </Button>
                                                    <Button variant="destructive" onClick={handleConfirmDelete}>
                                                        Xóa
                                                    </Button>
                                                </DialogFooter>
                                            </>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <ToastContainer />
                        </CardContent>
                    </Card>
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
                                                {folder.flascardcount} flashcard •{" "}
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
                                        {folder.flascardcount} câu hỏi
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
