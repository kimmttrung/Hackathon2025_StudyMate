import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout.jsx";
import {
  Search,
  Gamepad2,
  FolderOpen,
  Zap,
  Users,
  Clock,
  Trophy,
  Flame,
  Star,
} from "lucide-react";

const gameTypes = [
  {
    id: "quiz-rush",
    name: "Quiz Rush",
    description: "Trả lời nhanh trong thời gian giới hạn",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    difficulty: "medium",
  },
  {
    id: "memory-match",
    name: "Ghép Đôi",
    description: "Ghép câu hỏi với đáp án đúng",
    icon: Star,
    color: "from-pink-500 to-purple-500",
    difficulty: "easy",
  },
  {
    id: "time-challenge",
    name: "Thử Thách Thời Gian",
    description: "Càng nhanh càng nhiều điểm",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
    difficulty: "hard",
  },
  {
    id: "battle-mode",
    name: "Chiến Đấu",
    description: "Thi đấu với bạn bè online",
    icon: Users,
    color: "from-red-500 to-pink-500",
    difficulty: "medium",
  },
];

export default function GameQuiz() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGameType, setSelectedGameType] = useState(null);
  const [folders] = useState([
    {
      id: "1",
      name: "Toán học lớp 10",
      questionCount: 25,
      highScore: 1250,
      gamesPlayed: 12,
      difficulty: "medium",
    },
    {
      id: "2",
      name: "Tiếng Anh cơ bản",
      questionCount: 18,
      highScore: 890,
      gamesPlayed: 8,
      difficulty: "easy",
    },
    {
      id: "3",
      name: "Lịch sử Việt Nam",
      questionCount: 32,
      highScore: 1580,
      gamesPlayed: 15,
      difficulty: "hard",
    },
  ]);

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trò Chơi</h1>
            <p className="text-gray-600">
              Học qua trò chơi thú vị và tương tác. Thách thức bản thân và bạn
              bè.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">1,580</p>
                    <p className="text-sm text-gray-600">Điểm cao nhất</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">7 ngày</p>
                    <p className="text-sm text-gray-600">Chuỗi liên tiếp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">35</p>
                    <p className="text-sm text-gray-600">Game đã chơi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Bạn bè online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Game Types */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Chọn Loại Trò Chơi
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gameTypes.map((gameType) => (
              <Card
                key={gameType.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedGameType === gameType.id
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : ""
                  }`}
                onClick={() =>
                  setSelectedGameType(
                    selectedGameType === gameType.id ? null : gameType.id,
                  )
                }
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${gameType.color} flex items-center justify-center`}
                    >
                      <gameType.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{gameType.name}</CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          gameType.difficulty === "easy"
                            ? "border-green-500 text-green-700"
                            : gameType.difficulty === "medium"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-red-500 text-red-700"
                        }
                      >
                        {gameType.difficulty === "easy"
                          ? "Dễ"
                          : gameType.difficulty === "medium"
                            ? "Trung bình"
                            : "Khó"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600">
                    {gameType.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Folder Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Chọn Thư Mục Câu Hỏi
            </h2>
            {selectedGameType && (
              <Badge className="bg-blue-500">
                {gameTypes.find((g) => g.id === selectedGameType)?.name} đã chọn
              </Badge>
            )}
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm thư mục để chơi..."
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
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                          {folder.name}
                        </CardTitle>
                        <CardDescription>
                          {folder.questionCount} câu hỏi
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        folder.difficulty === "easy"
                          ? "border-green-500 text-green-700"
                          : folder.difficulty === "medium"
                            ? "border-yellow-500 text-yellow-700"
                            : "border-red-500 text-red-700"
                      }
                    >
                      {folder.difficulty === "easy"
                        ? "Dễ"
                        : folder.difficulty === "medium"
                          ? "TB"
                          : "Khó"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Điểm cao nhất:</span>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-700"
                      >
                        {folder.highScore?.toLocaleString() || 0}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Đã chơi:</span>
                      <span className="text-gray-500">
                        {folder.gamesPlayed || 0} game
                      </span>
                    </div>
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={!selectedGameType}
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      {selectedGameType
                        ? "Bắt đầu chơi"
                        : "Chọn loại game trước"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFolders.length === 0 && (
            <div className="text-center py-12">
              <Gamepad2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm
                  ? "Không tìm thấy thư mục"
                  : "Chưa có thư mục nào để chơi"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? "Thử tìm kiếm với từ khóa khác"
                  : "Tạo câu hỏi trước để bắt đầu chơi game"}
              </p>
              {!searchTerm && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Tạo câu hỏi đầu tiên
                </Button>
              )}
            </div>
          )}
        </div>

        {!selectedGameType && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-blue-700">
              <Gamepad2 className="w-5 h-5" />
              <span className="font-medium">Cách chơi</span>
            </div>
            <p className="mt-2 text-sm text-blue-600">
              1. Chọn một loại trò chơi ở trên
              <br />
              2. Chọn thư mục câu hỏi bạn muốn
              <br />
              3. Bắt đầu chơi và ghi điểm cao!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
