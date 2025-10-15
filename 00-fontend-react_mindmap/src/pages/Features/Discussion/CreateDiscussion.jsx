import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    X,
    Save,
    Send
} from "lucide-react";
import Layout from "@/components/Layout";
import PostEditor from "./PostEditor";
import PostSidebar from "./PostSidebar";
import { marked } from "marked";
import axios from "@/utils/axios.customize";

export default function CreateDiscussion() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [status, setStatus] = useState("draft");
    const [editingPostId, setEditingPostId] = useState(null);

    const [fontSize, setFontSize] = useState(16);
    const [textColor, setTextColor] = useState("#000000");
    const [isPreview, setIsPreview] = useState(false);

    const [userPosts, setUserPosts] = useState([
        {
            id: 1,
            title: "Cách giải phương trình bậc 2 hiệu quả",
            content: "Trong toán học, phương trình bậc 2 có dạng **ax² + bx + c = 0** với a ≠ 0.\n\n## Các bước giải:\n\n1. Tính delta (Δ) = b² - 4ac\n2. Xét dấu của delta:\n   - Δ > 0: phương trình có 2 nghiệm phân biệt\n   - Δ = 0: phương trình có nghiệm kép\n   - Δ < 0: phương trình vô nghiệm\n\n### Công thức nghiệm:\n```\nx = (-b ± √Δ) / (2a)\n```\n\n> **Lưu ý:** Luôn kiểm tra điều kiện a ≠ 0 trước khi áp dụng công thức.",
            tags: ["toán", "phương trình", "đại số"],
            status: "published",
            createdAt: "2025-08-01",
            views: 234,
            votes: 12,
        },
        {
            id: 2,
            title: "Ngữ pháp tiếng Anh: Thì hiện tại hoàn thành",
            content: "## Present Perfect Tense\n\nS + have/has + V3/Ved...",
            tags: ["tiếng anh", "ngữ pháp"],
            status: "draft",
            createdAt: "2025-07-28",
            views: 0,
            votes: 0,
        },
        {
            id: 3,
            title: "Ngữ pháp tiếng Anh: Thì hiện tại hoàn thành",
            content: "## Present Perfect Tense\n\nS + have/has + V3/Ved...",
            tags: ["tiếng anh", "ngữ pháp"],
            status: "draft",
            createdAt: "2025-07-28",
            views: 0,
            votes: 0,
        },
        {
            id: 4,
            title: "Ngữ pháp tiếng Anh: Thì hiện tại hoàn thành",
            content: "## Present Perfect Tense\n\nS + have/has + V3/Ved...",
            tags: ["tiếng anh", "ngữ pháp"],
            status: "draft",
            createdAt: "2025-07-28",
            views: 0,
            votes: 0,
        },
    ]);


    const insertMarkdown = (type) => {
        let syntax = "";
        switch (type) {
            case "bold":
                syntax = "**bold text**";
                break;
            case "italic":
                syntax = "*italic text*";
                break;
            case "underline":
                syntax = "<u>underline text</u>";
                break;
            case "quote":
                syntax = "> quoted text";
                break;
            case "code":
                syntax = "`inline code`";
                break;
            case "ul":
                syntax = "- List item";
                break;
            case "ol":
                syntax = "1. List item";
                break;
            case "link":
                syntax = "[Link](https://example.com)";
                break;
            case "image":
                syntax = "![alt text](image-url)";
                break;
            default:
                return;
        }
        setContent((prev) => prev + `\n${syntax}`);
    };

    const renderMarkdownPreview = (markdownText) => {
        return marked(markdownText, { sanitize: false });
    };


    const loadPostForEditing = (post) => {
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags);
        setStatus(post.status);
        setEditingPostId(post.id);
    };

    const popularTags = ["toán", "tiếng anh", "vật lý", "hóa học", "văn học", "sinh học", "địa lý", "lịch sử"];

    const addTag = (tag) => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const clearForm = () => {
        setTitle("");
        setContent("");
        setTags([]);
        setStatus("draft");
        setEditingPostId(null);
    };

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

    const handleSaveDraft = async () => {
        try {
            const user_id = getUserIdFromToken();
            const res = await axios.post("/api/discussions", {
                title,
                content,
                tags,
                status: "draft",
                user_id: user_id, // sau này thay bằng user login
            });
            alert("Lưu nháp thành công!");
            clearForm();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi lưu nháp");
        }
    };

    const handlePublish = async () => {
        try {
            const user_id = getUserIdFromToken();
            if (editingPostId) {
                await axios.put(`/api/discussions/${editingPostId}`, {
                    title,
                    content,
                    tags,
                    status: "published",
                    user_id: user_id,
                });
                alert("Cập nhật bài viết thành công!");
            } else {
                await axios.post("/api/discussions", {
                    title,
                    content,
                    tags,
                    status: "published",
                    user_id: user_id,
                });
                alert("Đăng bài thành công!");
            }
            clearForm();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi đăng bài");
        }
    };

    return (
        <Layout fullWidth>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/user/discussions">
                        <Button variant="ghost" size="sm" className="bg-green-100 hover:bg-green-200 text-black">
                            <ArrowLeft className="w-4 h-4 mr-2 text-green-600" />
                            Quay lại
                        </Button>
                    </Link>

                    <h1 className="text-3xl font-bold bg-gradient-to-r bg-green-100 hover:bg-green-200 text-black">
                        {editingPostId ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
                    </h1>

                    {editingPostId && (
                        <div className="ml-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearForm}
                                className="bg-green-200 text-black hover:bg-green-300"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tạo bài mới
                            </Button>
                        </div>
                    )}
                </div>


                {/* Title */}
                <div className="mb-6">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                        Tiêu đề bài viết
                    </Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tiêu đề bài viết của bạn..."
                        className="text-lg"
                    />
                </div>

                {/* Main Editor and Preview - Same Level */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <PostEditor
                        content={content}
                        setContent={setContent}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        textColor={textColor}
                        setTextColor={setTextColor}
                        isPreview={isPreview}
                        setIsPreview={setIsPreview}
                        insertMarkdown={insertMarkdown}
                        renderMarkdownPreview={renderMarkdownPreview}
                    />

                    <PostSidebar
                        userPosts={userPosts}
                        title={title}
                        tags={tags}
                        content={content}
                        fontSize={fontSize}
                        textColor={textColor}
                        editingPostId={editingPostId}
                        loadPostForEditing={loadPostForEditing}
                        renderMarkdownPreview={renderMarkdownPreview}
                    />
                </div>

                {/* Tags & Publish Options */}
                <div className="grid lg:grid-cols-2 gap-8 mt-8">
                    {/* Tags Section */}
                    <Card className="border-purple-200">
                        <CardHeader className="bg-green-50">
                            <CardTitle className="text-lg text-black">Tags (chủ đề)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Current Tags */}
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="px-2 py-1">
                                        #{tag}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                                            onClick={() => removeTag(tag)}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>

                            {/* Add New Tag */}
                            <div className="flex gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Thêm tag mới..."
                                    onKeyPress={(e) => e.key === 'Enter' && addTag(newTag)}
                                    className="border-purple-200 focus:border-purple-400"
                                />
                                <Button onClick={() => addTag(newTag)} className="bg-green-500 hover:bg-green-600 text-white">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Popular Tags */}
                            <div>
                                <p className="text-sm text-green-600 mb-2">Tags phổ biến:</p>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="cursor-pointer hover:bg-green-100 border-green-200 text-black hover:border-green-300"
                                            onClick={() => addTag(tag)}
                                        >
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Publish Options */}
                    <Card className="border-purple-200">
                        <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50">
                            <CardTitle className="text-lg text-purple-700">Tùy chọn đăng bài</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-purple-700 mb-2 block">
                                    Trạng thái
                                </Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="border-purple-200 focus:border-purple-400">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Lưu nháp (Draft)</SelectItem>
                                        <SelectItem value="published">Công khai (Published)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                                    onClick={handleSaveDraft}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {editingPostId ? "Lưu thay đổi" : "Lưu nháp"}
                                </Button>
                                <Button
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                                    onClick={handlePublish}
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    {editingPostId ? "Cập nhật" : "Đăng bài"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
