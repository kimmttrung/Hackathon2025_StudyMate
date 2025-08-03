import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {
    Search,
    Users,
    UserPlus,
    MessageCircle,
    Star,
    MapPin,
    BookOpen,
    Filter,
    Grid,
    List as ListIcon
} from "lucide-react";
import Layout from "@/components/Layout";

export default function AddFriend() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterBy, setFilterBy] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("active");

    const users = [
        {
            id: 1,
            name: "Trần Thi Anh Thư",
            avatar: "https://weart.vn/wp-content/uploads/2025/06/gai-xinh-tu-suong-voi-anh-sang-tu-nhien-va-bieu-cam-rang-ro.jpg",
            bio: "Học sinh lớp 12A1, yêu thích toán học và lập trình",
            location: "Hà Nội",
            joinDate: "2024-01-15",
            isOnline: true,
            stats: {
                posts: 45,
                friends: 123,
                points: 892,
                rank: "Gold"
            },
            subjects: ["toán", "tin học", "vật lý"],
            isFriend: false,
            isPending: false
        },
        {
            id: 2,
            name: "Phạm Thị Cẩm Tú",
            avatar: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-15-1.jpg",
            bio: "Chuyên môn tiếng Anh, thích chia sẻ kiến thức ngữ pháp",
            location: "TP.HCM",
            joinDate: "2024-02-20",
            isOnline: true,
            stats: {
                posts: 67,
                friends: 89,
                points: 1204,
                rank: "Platinum"
            },
            subjects: ["tiếng anh", "văn học", "địa lý"],
            isFriend: true,
            isPending: false
        },
        {
            id: 3,
            name: "Trần Huyền My",
            avatar: "https://i.pinimg.com/736x/48/ac/18/48ac183471588768c4b26b44a747f34a.jpg",
            bio: "Học sinh giỏi môn Lý, luôn sẵn sàng giúp đỡ bạn bè",
            location: "Đà Nẵng",
            joinDate: "2023-11-08",
            isOnline: false,
            stats: {
                posts: 89,
                friends: 156,
                points: 1567,
                rank: "Diamond"
            },
            subjects: ["vật lý", "toán", "hóa học"],
            isFriend: false,
            isPending: true
        },
        {
            id: 4,
            name: "Phạm Thị Thùy Trang",
            avatar: "https://bayotech.vn/wp-content/uploads/2025/06/avatar-gai-xinh-20.jpg",
            bio: "Sinh viên Y khoa, chuyên gia về sinh học và hóa sinh",
            location: "Cần Thơ",
            joinDate: "2024-03-12",
            isOnline: true,
            stats: {
                posts: 34,
                friends: 67,
                points: 654,
                rank: "Silver"
            },
            subjects: ["sinh học", "hóa học", "y học"],
            isFriend: false,
            isPending: false
        },
        {
            id: 5,
            name: "Nguyễn Quang Minh",
            avatar: "https://www.anhnghethuatdulich.com/wp-content/uploads/2025/07/anh-chan-dung-trai-dep.jpg",
            bio: "Yêu thích lịch sử và văn hóa Việt Nam, thích nghiên cứu",
            location: "Huế",
            joinDate: "2023-09-30",
            isOnline: false,
            stats: {
                posts: 78,
                friends: 98,
                points: 1123,
                rank: "Gold"
            },
            subjects: ["lịch sử", "văn học", "địa lý"],
            isFriend: false,
            isPending: false
        },
        {
            id: 6,
            name: "Phan Văn Tiến",
            avatar: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482743iVF/anh-mo-ta.png",
            bio: "Học sinh chuyên Hóa, đam mê thí nghiệm và nghiên cứu",
            location: "Nha Trang",
            joinDate: "2024-01-25",
            isOnline: true,
            stats: {
                posts: 56,
                friends: 112,
                points: 987,
                rank: "Gold"
            },
            subjects: ["hóa học", "sinh học", "toán"],
            isFriend: false,
            isPending: false
        }
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter = filterBy === "all" ||
            (filterBy === "online" && user.isOnline) ||
            (filterBy === "friends" && user.isFriend) ||
            (filterBy === "pending" && user.isPending);

        return matchesSearch && matchesFilter;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        switch (sortBy) {
            case "name":
                return a.name.localeCompare(b.name);
            case "points":
                return b.stats.points - a.stats.points;
            case "posts":
                return b.stats.posts - a.stats.posts;
            case "friends":
                return b.stats.friends - a.stats.friends;
            default:
                return Number(b.isOnline) - Number(a.isOnline);
        }
    });

    const getRankColor = (rank) => {
        switch (rank) {
            case "Diamond": return "bg-gradient-to-r from-blue-400 to-purple-600";
            case "Platinum": return "bg-gradient-to-r from-gray-300 to-gray-500";
            case "Gold": return "bg-gradient-to-r from-yellow-400 to-orange-500";
            case "Silver": return "bg-gradient-to-r from-gray-200 to-gray-400";
            default: return "bg-gray-500";
        }
    };

    const handleSendFriendRequest = (userId) => {
        console.log("Sending friend request to user:", userId);
    };

    const handleStartChat = (userId) => {
        console.log("Starting chat with user:", userId);
    };

    return (
        <Layout fullWidth>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Cộng đồng người dùng</h1>
                    <p className="text-gray-600">Kết nối và tìm hiểu các thành viên trong cộng đồng học tập</p>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Tìm kiếm theo tên, môn học, sở thích..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex gap-2 flex-wrap">
                                <Select value={filterBy} onValueChange={setFilterBy}>
                                    <SelectTrigger className="w-[140px]">
                                        <Filter className="w-4 h-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tất cả</SelectItem>
                                        <SelectItem value="online">Đang online</SelectItem>
                                        <SelectItem value="friends">Bạn bè</SelectItem>
                                        <SelectItem value="pending">Chờ kết bạn</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Hoạt động</SelectItem>
                                        <SelectItem value="name">Tên A-Z</SelectItem>
                                        <SelectItem value="points">Điểm cao</SelectItem>
                                        <SelectItem value="posts">Nhiều bài</SelectItem>
                                        <SelectItem value="friends">Nhiều bạn</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex border rounded-md">
                                    <Button
                                        variant={viewMode === "grid" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                        className="rounded-r-none"
                                    >
                                        <Grid className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                        className="rounded-l-none"
                                    >
                                        <ListIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                            Tìm thấy <span className="font-semibold">{sortedUsers.length}</span> người dùng
                        </div>
                    </CardContent>
                </Card>

                {/* Users Grid/List */}
                <div className={viewMode === "grid" ?
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" :
                    "space-y-4"
                }>
                    {sortedUsers.map((user) => (
                        <Card key={user.id} className="hover:shadow-lg transition-shadow">
                            {viewMode === "grid" ? (
                                <CardContent className="p-6">
                                    {/* Grid View */}
                                    <div className="text-center">
                                        <div className="relative mb-4">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-20 h-20 rounded-full mx-auto"
                                            />
                                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                                }`}></div>
                                            <Badge className={`absolute -top-1 -right-1 text-white text-xs ${getRankColor(user.stats.rank)}`}>
                                                {user.stats.rank}
                                            </Badge>
                                        </div>

                                        <h3 className="font-semibold text-gray-900 mb-2">{user.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{user.bio}</p>

                                        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
                                            <MapPin className="w-3 h-3" />
                                            {user.location}
                                        </div>

                                        {/* Subjects */}
                                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                                            {user.subjects.slice(0, 3).map((subject) => (
                                                <Badge key={subject} variant="outline" className="text-xs">
                                                    {subject}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-2 text-center mb-4">
                                            <div>
                                                <div className="text-lg font-bold text-blue-600">{user.stats.posts}</div>
                                                <div className="text-xs text-gray-500">Bài viết</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-green-600">{user.stats.friends}</div>
                                                <div className="text-xs text-gray-500">Bạn bè</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-purple-600">{user.stats.points}</div>
                                                <div className="text-xs text-gray-500">Điểm</div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {user.isFriend ? (
                                                <Button
                                                    onClick={() => handleStartChat(user.id)}
                                                    className="flex-1"
                                                    size="sm"
                                                >
                                                    <MessageCircle className="w-4 h-4 mr-1" />
                                                    Chat
                                                </Button>
                                            ) : user.isPending ? (
                                                <Button disabled className="flex-1" size="sm" variant="outline">
                                                    Đã gửi lời mời
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => handleSendFriendRequest(user.id)}
                                                    className="flex-1"
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <UserPlus className="w-4 h-4 mr-1" />
                                                    Kết bạn
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            ) : (
                                <CardContent className="p-4">
                                    {/* List View */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-16 h-16 rounded-full"
                                            />
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                                }`}></div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                                <Badge className={`text-white text-xs ${getRankColor(user.stats.rank)}`}>
                                                    {user.stats.rank}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{user.bio}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {user.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BookOpen className="w-3 h-3" />
                                                    {user.stats.posts} bài
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {user.stats.friends} bạn
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3" />
                                                    {user.stats.points} điểm
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-wrap gap-1">
                                                {user.subjects.slice(0, 2).map((subject) => (
                                                    <Badge key={subject} variant="outline" className="text-xs">
                                                        {subject}
                                                    </Badge>
                                                ))}
                                            </div>

                                            {user.isFriend ? (
                                                <Button
                                                    onClick={() => handleStartChat(user.id)}
                                                    size="sm"
                                                >
                                                    <MessageCircle className="w-4 h-4 mr-1" />
                                                    Chat
                                                </Button>
                                            ) : user.isPending ? (
                                                <Button disabled size="sm" variant="outline">
                                                    Đã gửi
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => handleSendFriendRequest(user.id)}
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <UserPlus className="w-4 h-4 mr-1" />
                                                    Kết bạn
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {sortedUsers.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Không tìm thấy người dùng
                        </h3>
                        <p className="text-gray-500">
                            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
