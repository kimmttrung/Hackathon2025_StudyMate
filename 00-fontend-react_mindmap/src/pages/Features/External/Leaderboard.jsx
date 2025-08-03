import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import {
    Trophy,
    TrendingUp,
    Users,
    MessageCircle,
    Star,
    Medal,
    Crown,
    Award
} from "lucide-react";

export default function Leaderboard() {
    const topContributors = [
        {
            rank: 1,
            name: "Nguyễn Văn A",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
            posts: 45,
            votes: 234,
            comments: 156,
            score: 435
        },
        {
            rank: 2,
            name: "Trần Thị B",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
            posts: 38,
            votes: 198,
            comments: 134,
            score: 370
        },
        {
            rank: 3,
            name: "Lê Văn C",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
            posts: 32,
            votes: 167,
            comments: 89,
            score: 288
        },
        {
            rank: 4,
            name: "Phạm Thị D",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
            posts: 28,
            votes: 145,
            comments: 78,
            score: 251
        },
        {
            rank: 5,
            name: "Hoàng Văn E",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
            posts: 25,
            votes: 132,
            comments: 67,
            score: 224
        },
        {
            rank: 6,
            name: "Đặng Thị F",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
            posts: 22,
            votes: 120,
            comments: 59,
            score: 201
        },
        {
            rank: 7,
            name: "Vũ Văn G",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
            posts: 20,
            votes: 108,
            comments: 53,
            score: 181
        },
        {
            rank: 8,
            name: "Ngô Thị H",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
            posts: 18,
            votes: 95,
            comments: 48,
            score: 161
        },
        {
            rank: 9,
            name: "Đỗ Văn I",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=9",
            posts: 16,
            votes: 88,
            comments: 42,
            score: 146
        }
    ];


    const popularTags = [
        { name: "toán", count: 1234, growth: "+12%" },
        { name: "tiếng anh", count: 987, growth: "+8%" },
        { name: "vật lý", count: 756, growth: "+15%" },
        { name: "hóa học", count: 654, growth: "+6%" },
        { name: "văn học", count: 543, growth: "+9%" },
        { name: "sinh học", count: 432, growth: "+6%" },
        { name: "địa lý", count: 321, growth: "+4%" },
        { name: "lịch sử", count: 298, growth: "+7%" },
        { name: "tin học", count: 267, growth: "+13%" },
        { name: "giáo dục công dân", count: 198, growth: "+3%" },
        { name: "công nghệ", count: 500, growth: "+5%" }
    ];

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-orange-600" />;
            default:
                return (
                    <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600">
                        #{rank}
                    </span>
                );
        }
    };

    const getRankBadge = (rank) => {
        switch (rank) {
            case 1:
                return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
            case 2:
                return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
            case 3:
                return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <Layout fullWidth>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Bảng xếp hạng</h1>
                    <p className="text-gray-600">Vinh danh những người đóng góp tích cực nhất cho cộng đồng</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Top Contributors */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    Top 5 người đóng góp nhiều nhất
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topContributors.map((user) => (
                                        <div
                                            key={user.rank}
                                            className={`flex items-center gap-4 p-4 rounded-lg border ${user.rank <= 3
                                                ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
                                                : "bg-white border-gray-200"
                                                }`}
                                        >
                                            {/* Rank */}
                                            <div className="flex-shrink-0">
                                                {getRankIcon(user.rank)}
                                            </div>

                                            {/* Avatar & Name */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                <div>
                                                    <div className="font-semibold text-gray-900">{user.name}</div>
                                                    <Badge className={`text-xs ${getRankBadge(user.rank)}`}>
                                                        Hạng {user.rank}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">{user.posts}</div>
                                                    <div className="text-xs text-gray-600">Bài viết</div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-green-600">{user.votes}</div>
                                                    <div className="text-xs text-gray-600">Votes</div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-blue-600">{user.comments}</div>
                                                    <div className="text-xs text-gray-600">Bình luận</div>
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-purple-600">{user.score}</div>
                                                    <div className="text-xs text-gray-600">Điểm</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Popular Tags */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                    Top 10 tags phổ biến
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {popularTags.map((tag, index) => (
                                        <div
                                            key={tag.name}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">#{tag.name}</div>
                                                    <div className="text-sm text-gray-600">{tag.count} bài viết</div>
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                                                {tag.growth}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Achievement Info */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Cách tính điểm</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-4 gap-4 text-center">
                            <div className="p-4 rounded-lg bg-blue-50">
                                <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <div className="font-semibold text-blue-900">Tạo bài viết</div>
                                <div className="text-sm text-blue-700">+5 điểm</div>
                            </div>
                            <div className="p-4 rounded-lg bg-green-50">
                                <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <div className="font-semibold text-green-900">Nhận upvote</div>
                                <div className="text-sm text-green-700">+2 điểm</div>
                            </div>
                            <div className="p-4 rounded-lg bg-purple-50">
                                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                <div className="font-semibold text-purple-900">Bình luận</div>
                                <div className="text-sm text-purple-700">+1 điểm</div>
                            </div>
                            <div className="p-4 rounded-lg bg-orange-50">
                                <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                                <div className="font-semibold text-orange-900">Bài viết hot</div>
                                <div className="text-sm text-orange-700">+10 điểm</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
