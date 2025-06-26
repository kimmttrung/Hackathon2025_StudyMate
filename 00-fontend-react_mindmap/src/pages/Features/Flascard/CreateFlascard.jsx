import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    PlusCircle,
    Bot,
    User,
    Sparkles,
    Upload,
    FileText,
    FileUp,
    ImageIcon, Edit3, Trash2,
    ArrowLeft
} from "lucide-react";
import { useRef, useState } from "react";



const CreateFlascard = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [folders, setFolders] = useState([
        {
            id: 1,
            name: "Tiếng Anh cơ bản",
            createdAt: "2024-06-01",
            difficulty: "Dễ",
            color: "bg-blue-100 text-blue-800",
            cards: 25,
        },
        {
            id: 2,
            name: "Lịch sử Việt Nam",
            createdAt: "2024-05-20",
            difficulty: "Trung bình",
            color: "bg-yellow-100 text-yellow-800",
            cards: 12,
        },
        {
            id: 3,
            name: "Toán học THPT",
            createdAt: "2024-04-10",
            difficulty: "Khó",
            color: "bg-red-100 text-red-800",
            cards: 0,
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleUploadClick = (index) => {
        if (fileInputsRef.current[index]) {
            fileInputsRef.current[index].click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("File được chọn:", file.name);
            // Xử lý file tại đây
        }
    }

    const recentlyCreated = [
        { name: "Từ vựng tiếng Anh", cards: 15, type: "user", date: "Hôm nay" },
        { name: "Công thức Toán học", cards: 8, type: "ai", date: "Hôm qua" },
        { name: "Lịch sử Việt Nam", cards: 12, type: "user", date: "2 ngày trước" },
    ];

    if (!selectedFolder) {
        return (
            <Layout title="Thư mục Flashcard">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold">Quản lý Thư mục</h1>
                        <p className="text-muted-foreground">
                            Tạo và chọn thư mục để bắt đầu tạo flashcard
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="Tìm kiếm thư mục..."
                            className="flex-1"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button
                            className="bg-create text-white"
                            onClick={() => {
                                const newName = prompt("Nhập tên thư mục mới:");
                                if (newName) {
                                    setFolders([
                                        ...folders,
                                        { id: Date.now(), name: newName },
                                    ]);
                                }
                            }}
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Thêm thư mục
                        </Button>
                    </div>

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {folders
                            .filter((folder) =>
                                folder.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((folder) => (
                                <Card
                                    key={folder.id}
                                    className="p-4 hover:shadow-md transition cursor-pointer group"
                                >
                                    <div
                                        className="font-medium text-lg group-hover:text-create"
                                        onClick={() => setSelectedFolder(folder)}
                                    >
                                        {folder.name}
                                    </div>

                                    <div className="text-sm text-muted-foreground mt-1">
                                        📦 {folder.sets.length} bộ &nbsp;&nbsp;🃏{" "}
                                        {folder.sets.reduce((acc, set) => acc + set.cards, 0)} thẻ
                                    </div>

                                    <div className="flex justify-end gap-2 mt-3 text-sm text-muted-foreground">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-blue-500 hover:bg-blue-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const newName = prompt("Sửa tên thư mục:", folder.name);
                                                if (newName) {
                                                    setFolders(
                                                        folders.map((f) =>
                                                            f.id === folder.id ? { ...f, name: newName } : f
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:bg-red-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (
                                                    confirm(`Bạn có chắc muốn xóa thư mục "${folder.name}"?`)
                                                ) {
                                                    setFolders(folders.filter((f) => f.id !== folder.id));
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>

                            ))}
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {folders
                            .filter((folder) =>
                                folder.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((folder) => (
                                <Card
                                    key={folder.id}
                                    className="p-4 hover:shadow-md transition cursor-pointer group"
                                    onClick={() => setSelectedFolder(folder)}
                                >
                                    <div
                                        className="font-medium text-lg group-hover:text-create"
                                    >
                                        {folder.name}
                                    </div>

                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${folder.color}`}>
                                            {folder.difficulty}
                                        </span>
                                    </div>

                                    <div className="text-sm text-muted-foreground mt-1">
                                        🃏 {folder.cards} thẻ &nbsp;&nbsp;📅 {folder.createdAt}
                                    </div>

                                    <div className="flex justify-end gap-2 mt-3 text-sm text-muted-foreground">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-blue-500 hover:bg-blue-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const newName = prompt("Sửa tên thư mục:", folder.name);
                                                if (newName) {
                                                    setFolders(
                                                        folders.map((f) =>
                                                            f.id === folder.id ? { ...f, name: newName } : f
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:bg-red-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (
                                                    confirm(`Bạn có chắc muốn xóa thư mục "${folder.name}"?`)
                                                ) {
                                                    setFolders(folders.filter((f) => f.id !== folder.id));
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                    </div>
                </div>
            </Layout>
        );
    } else {
        return (
            <Layout title={`Tạo Flashcard - ${selectedFolder.name}`}>
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
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">
                                                    Tên bộ flashcard
                                                </label>
                                                <Input placeholder="VD: Từ vựng tiếng Anh cơ bản" />
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-sm font-medium">
                                                    Thẻ flashcard
                                                </label>

                                                <Card className="border-dashed border-2 border-create/30">
                                                    <CardContent className="p-4 space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <label className="text-sm font-medium">
                                                                    Mặt trước
                                                                </label>
                                                                <Textarea
                                                                    placeholder="Nhập nội dung mặt trước"
                                                                    className="min-h-[100px]"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-sm font-medium">
                                                                    Mặt sau
                                                                </label>
                                                                <Textarea
                                                                    placeholder="Nhập nội dung mặt sau"
                                                                    className="min-h-[100px]"
                                                                />
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full border-create text-create-foreground hover:bg-create/10"
                                                        >
                                                            <PlusCircle className="w-4 h-4 mr-2" />
                                                            Thêm thẻ mới
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </div>

                                            <Button className="w-full bg-create hover:bg-create/90 text-create-foreground">
                                                Tạo bộ flashcard
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* AI Creation */}
                                <TabsContent value="ai" className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {uploadTemplates.map((template, index) => {
                                            const IconComponent = template.icon;
                                            return (
                                                <Card
                                                    key={template.name}
                                                    className="cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-md border-2 hover:border-create/50"
                                                    onClick={() => handleUploadClick(index)}
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-create/20 flex items-center justify-center">
                                                                <IconComponent className="w-5 h-5 text-create-foreground" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="font-medium">{template.name}</h3>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {template.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept={template.accept}
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                            ref={(el) => (fileInputsRef.current[index] = el)}
                                                        />
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>

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

                                            <div className="flex gap-2">
                                                <Button variant="outline" className="flex-1">
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Tải file lên
                                                </Button>
                                                <Button className="flex-1 bg-gradient-to-r from-create to-accent text-white">
                                                    <Sparkles className="w-4 h-4 mr-2" />
                                                    Tạo bằng AI
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
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


};

export default CreateFlascard;
