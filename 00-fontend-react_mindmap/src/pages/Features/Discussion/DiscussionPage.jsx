import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
    MessageCircle,
    ThumbsUp,
    ThumbsDown,
    Eye,
    Clock,
    Search,
    Filter,
    Plus,
    Bookmark,
    Share2,
    MoreHorizontal,
    Zap,
    MessageSquare,
    Users,
} from "lucide-react";
import Card from "@/components/common/Card";
import { CardContent } from "@/components/ui/Card";
import Layout from "@/components/Layout";

export default function Discussion() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterBy, setFilterBy] = useState("newest");

    const posts = [
        {
            id: 1,
            title: "Cách giải phương trình bậc 2 một cách hiệu quả",
            content:
                "Mình đang gặp khó khăn với việc giải phương trình bậc 2, đặc biệt là những trường hợp có delta âm. Các bạn có thể chia sẻ phương pháp hiệu quả không?",
            author: "Nguyễn Văn A",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
            tags: ["toán", "phương trình", "đại số"],
            views: 234,
            upvotes: 12,
            downvotes: 2,
            comments: 8,
            time: "2 giờ trước",
            isPopular: true,
            isBookmarked: false,
            status: "published",
        },
        {
            id: 2,
            title: "Tổng hợp ngữ pháp tiếng Anh lớp 12 - Cần góp ý",
            content:
                "Mình đang tổng hợp tất cả ngữ pháp tiếng Anh lớp 12. Đây là bản draft, mọi người góp ý giúp mình nhé!",
            author: "Trần Thị B",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
            tags: ["tiếng anh", "ngữ pháp", "lớp 12"],
            views: 156,
            upvotes: 8,
            downvotes: 0,
            comments: 5,
            time: "4 giờ trước",
            isPopular: false,
            isBookmarked: true,
            status: "published",
        },
        {
            id: 3,
            title: "Phương pháp học thuộc lòng hiệu quả cho môn Lý",
            content:
                "Chia sẻ những phương pháp học thuộc lòng công thức vật lý mà mình đã áp dụng và thấy hiệu quả.",
            author: "Lê Văn C",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
            tags: ["vật lý", "phương pháp học", "ghi nhớ"],
            views: 89,
            upvotes: 15,
            downvotes: 1,
            comments: 3,
            time: "6 giờ trước",
            isPopular: true,
            isBookmarked: false,
            status: "published",
        },
        {
            id: 4,
            title: "Cần giúp đỡ: Bài tập hóa học về phản ứng oxi hóa khử",
            content:
                "Mình không hiểu cách cân bằng phương trình phản ứng oxi hóa khử. Ai có thể giải thích chi tiết được không?",
            author: "Phạm Thị D",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
            tags: ["hóa học", "oxi hóa khử", "cần giúp"],
            views: 45,
            upvotes: 3,
            downvotes: 0,
            comments: 0,
            time: "8 giờ trước",
            isPopular: false,
            isBookmarked: false,
            status: "published",
        },
        {
            id: 5,
            title: 'Review sách "Nghệ thuật viết văn" - Rất hữu ích!',
            content:
                "Vừa đọc xong cuốn sách này và thấy rất bổ ích cho việc học văn. Chia sẻ một số điểm hay trong sách...",
            author: "Hoàng Văn E",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
            tags: ["văn học", "review sách", "kỹ năng viết"],
            views: 178,
            upvotes: 20,
            downvotes: 2,
            comments: 12,
            time: "1 ngày trước",
            isPopular: true,
            isBookmarked: true,
            status: "published",
        },
    ];

    const quickStats = [
        { label: "Tổng bài viết", value: "2,847", icon: MessageSquare },
        { label: "Bài hôm nay", value: "45", icon: Plus },
        { label: "Đang thảo luận", value: "23", icon: Users },
        { label: "Chưa trả lời", value: "12", icon: MessageCircle },
    ];

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        switch (filterBy) {
            case "popular":
                return b.views - a.views;
            case "top-voted":
                return (
                    b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
                );
            case "unanswered":
                return a.comments - b.comments;
            default:
                return 0; // fallback nếu không có thời gian thực
        }
    });

    return (
        <Layout fullWidth>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Thảo luận học tập
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Chia sẻ kiến thức và cùng nhau học hỏi
                        </p>
                    </div>
                    <Link to="/user/discussions/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Tạo bài viết
                        </Button>
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {quickStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-gray-600">{stat.label}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Tìm kiếm bài viết, tags, người đăng..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Select value={filterBy} onValueChange={setFilterBy}>
                                    <SelectTrigger className="w-[180px]">
                                        <Filter className="w-4 h-4 mr-2" />
                                        <SelectValue placeholder="Lọc theo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Mới nhất</SelectItem>
                                        <SelectItem value="popular">Phổ biến</SelectItem>
                                        <SelectItem value="top-voted">Được vote nhiều</SelectItem>
                                        <SelectItem value="unanswered">Chưa trả lời</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Posts */}
                <div className="space-y-4">
                    {sortedPosts.map((post) => (
                        <Card key={post.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex gap-4">
                                    {/* Votes */}
                                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-50">
                                            <ThumbsUp className="w-4 h-4 text-gray-600 hover:text-green-600" />
                                        </Button>
                                        <span className="text-sm font-medium text-gray-900">
                                            {post.upvotes - post.downvotes}
                                        </span>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                                            <ThumbsDown className="w-4 h-4 text-gray-600 hover:text-red-600" />
                                        </Button>
                                    </div>

                                    <Separator orientation="vertical" className="h-auto" />

                                    {/* Post Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                                                        {post.title}
                                                    </h3>
                                                    {post.isPopular && (
                                                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                                            <Zap className="w-3 h-3 mr-1" />
                                                            Hot
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 mb-3 line-clamp-2">
                                                    {post.content}
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs hover:bg-blue-50 cursor-pointer">
                                                    #{tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <img src={post.avatar} alt={post.author} className="w-6 h-6 rounded-full" />
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.time}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {post.views}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageCircle className="w-4 h-4" />
                                                        {post.comments}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'text-blue-600 fill-current' : 'text-gray-600'}`} />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Share2 className="w-4 h-4 text-gray-600" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                    <Button variant="outline" size="lg">
                        Tải thêm bài viết
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
