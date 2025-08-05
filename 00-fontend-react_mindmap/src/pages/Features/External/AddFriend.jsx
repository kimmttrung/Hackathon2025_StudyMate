import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
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
    List as ListIcon,
    UserCheck
} from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from 'react-toastify';
import axios from "@/utils/axios.customize";
import { useNavigate } from "react-router-dom";


export default function AddFriend() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterBy, setFilterBy] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("active");
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            (user.username?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (user.bio?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (user.subjects || []).some(subject =>
                (subject?.toLowerCase() || "").includes(searchQuery.toLowerCase())
            );

        const matchesFilter =
            filterBy === "all" ||
            (filterBy === "online" && user.isOnline) ||
            (filterBy === "friends" && user.isFriend) ||
            (filterBy === "pending" && user.isPending) ||
            (filterBy === "incoming" && user.hasSentRequest && !user.isAccepted);  // lời họ gửi cho mình

        return matchesSearch && matchesFilter;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        switch (sortBy) {
            case "username":
                return a.username.localeCompare(b.username);
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

    const handleStartChat = (userId) => {
        navigate(`/user/chat/${userId}`);
    };

    const sanitizeUserData = (users) => {
        return users.map(user => ({
            ...user,
            full_name: user.full_name || "Không tên",
            bio: user.bio || "",
            isOnline: user.is_online || false,
            subjects: Array.isArray(user.subjects) ? user.subjects : [],
            stats: {
                posts: user.posts || 0,
                friends: user.friends || 0,
                points: user.points || 0,
                rank: user.rank || "Bronze"
            },
            avatar: typeof user.avatar === "object" && user.avatar
                ? `data:image/jpeg;base64,${btoa(
                    new Uint8Array(user.avatar.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                )}`
                : user.avatar || ""
        }));
    };


    // Gọi API danh sách user để kết bạn (trừ user hiện tại)
    const fetchSuggestedUsers = async () => {
        try {
            const res = await axios.get('/api/friends/suggestions');
            // console.log("check res list user", res);
            return res.data || []; // ✅ Vì res = { success, data }
        } catch (error) {
            console.error('❌ Lỗi khi lấy danh sách user:', error);
            return [];
        }
    };

    const fetchFriends = async () => {
        try {
            const res = await axios.get("/api/friends/list");
            // console.log("check list ban be", res);
            return res?.friends || [];
        } catch (err) {
            console.error("Lỗi lấy danh sách bạn bè:", err);
            return [];
        }
    };

    const fetchPendingRequests = async () => {
        try {
            const res = await axios.get("/api/friends/pending");
            return res?.requests || [];
        } catch (err) {
            console.error("Lỗi lấy lời mời chờ:", err);
            return [];
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

    const reloadUsers = async () => {
        try {
            const [suggested, friends, pending] = await Promise.all([
                fetchSuggestedUsers(),
                fetchFriends(),
                fetchPendingRequests()
            ]);

            const currentUserId = getUserIdFromToken();
            const friendIds = new Set();
            const pendingMap = new Map();

            // Xử lý danh sách bạn bè
            friends.forEach(entry => {
                if (entry.status === "accepted") {
                    const friendId = entry.requester_id === currentUserId ? entry.receiver_id : entry.requester_id;
                    friendIds.add(String(friendId));
                }
            });

            // Xử lý lời mời pending từ cả 2 phía
            pending.forEach(entry => {
                const direction = entry.direction; // đã trả về từ backend
                const userId = direction === "incoming" ? entry.requester_id : entry.receiver_id;
                pendingMap.set(String(userId), direction);
            });

            // Gắn cờ trạng thái
            const enriched = suggested.map(user => {
                const idStr = String(user.id);
                return {
                    ...user,
                    isFriend: friendIds.has(idStr),
                    hasSentRequest: pendingMap.get(idStr) === "incoming",
                    isPending: pendingMap.get(idStr) === "outgoing",
                    isOnline: user.is_online ?? false, // 👈 Thêm dòng này
                };
            });

            // Lọc theo tab đang chọn
            let filtered = enriched;
            if (filterBy === "online") {
                filtered = enriched.filter(u => u.isOnline);
            } else if (filterBy === "friends") {
                filtered = enriched.filter(u => u.isFriend);
            } else if (filterBy === "pending") {
                filtered = enriched.filter(u => u.isPending);
            } else if (filterBy === "incoming") {
                filtered = enriched.filter(u => u.hasSentRequest && !u.isFriend);
            }

            const cleaned = sanitizeUserData(filtered);
            setUsers(cleaned);
        } catch (err) {
            console.error("❌ Lỗi khi reload users:", err);
        }
    };



    // API Gửi kết bạn
    const handleSendFriendRequest = async (receiverId) => {
        try {
            const res = await axios.post("/api/friends/send", { receiver_id: receiverId });
            if (res.success) {
                toast.success("Đã gửi lời mời kết bạn!");
                reloadUsers();
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.message || "Gửi lời mời thất bại");
        }
    };
    // API Đồng í kết bạn
    const handleAcceptFriendRequest = async (requesterId) => {
        try {
            const res = await axios.post("/api/friends/accept", { requester_id: requesterId });
            console.log("check đồng í", res);
            if (res.success) {
                toast.success("Đã chấp nhận lời mời kết bạn!");
                reloadUsers();
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Chấp nhận lời mời thất bại");
        }
    };

    useEffect(() => {
        reloadUsers();
    }, [filterBy]);

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
                                        <SelectItem value="incoming">Lời mời đến</SelectItem>
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

                                {/* Xem view list  */}
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
                                                alt={user.username}
                                                className="w-20 h-20 rounded-full mx-auto"
                                            />
                                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                                }`}></div>
                                            <Badge className={`absolute -top-1 -right-1 text-white text-xs ${getRankColor(user.stats.rank)}`}>
                                                {user.stats.rank}
                                            </Badge>
                                        </div>

                                        <h3 className="font-semibold text-gray-900 mb-2">{user.username}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{user.bio}</p>

                                        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
                                            <MapPin className="w-3 h-3" />
                                            {user.address_province}
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
                                            ) : user.hasSentRequest ? (
                                                <Button
                                                    onClick={() => handleAcceptFriendRequest(user.id)}
                                                    className="flex-1"
                                                    size="sm"
                                                    variant="default"
                                                >
                                                    <UserCheck className="w-4 h-4 mr-1" />
                                                    Đồng ý
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
                                                alt={user.username}
                                                className="w-16 h-16 rounded-full"
                                            />
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                                }`}></div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{user.username}</h3>
                                                <Badge className={`text-white text-xs ${getRankColor(user.stats.rank)}`}>
                                                    {user.stats.rank}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{user.bio}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {user.address_district}
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
                                            ) : user.hasSentRequest ? (
                                                <Button
                                                    onClick={() => handleAcceptFriendRequest(user.id)}
                                                    className="flex-1"
                                                    size="sm"
                                                    variant="default"
                                                >
                                                    <UserCheck className="w-4 h-4 mr-1" />
                                                    Đồng ý
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
