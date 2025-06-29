import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGameLogic } from "@/hooks/useGameLogic";
import FlashcardGrid from "@/components/FlashcardGrid.jsx";
import Timer from "@/components/Timer.jsx";
import { ArrowLeft, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { flashcardFolders } from "@/data/flascards";

const GAME_TIME = 300; // 5 minutes in seconds

export default function Game() {
    const { folderId } = useParams();
    const navigate = useNavigate();
    const [folder, setFolder] = useState(
        flashcardFolders.find((f) => f.id === folderId),
    );

    useEffect(() => {
        if (!folderId || !folder) {
            navigate("/");
            return;
        }
    }, [folderId, folder, navigate]);

    const handleGameComplete = (won, stats) => {
        navigate("/user/flashcards/game-complete", {
            state: {
                won,
                stats,
                folderName: folder?.name,
                folderId: folder?.id,
            },
        });
    };

    const {
        gameCards,
        selectedCards,
        matchedPairs,
        timeRemaining,
        isGameActive,
        attempts,
        totalPairs,
        handleCardClick,
        resetGame,
    } = useGameLogic({
        flashcards: folder?.flashcards || [],
        timeLimit: GAME_TIME,
        onGameComplete: handleGameComplete,
    });

    if (!folder) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">
                        Không tìm thấy thư mục này
                    </p>
                    <Button
                        onClick={() => navigate("/user/dashboard")}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Về trang chủ
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
            {/* Header */}
            <div className="container mx-auto px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/user/flashcards/game")}
                            className="bg-white hover:bg-gray-50"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Quay lại
                        </Button>

                        <div className="flex items-center gap-3">
                            <div className="text-3xl">{folder.icon}</div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">
                                    {folder.name}
                                </h1>
                                <p className="text-sm text-gray-600">{folder.description}</p>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={resetGame}
                        className="bg-white hover:bg-gray-50"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Chơi lại
                    </Button>
                </div>

                {/* Game Stats and Timer */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <Timer
                            timeRemaining={timeRemaining}
                            totalTime={GAME_TIME}
                            isActive={isGameActive}
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-1">
                                {matchedPairs}/{totalPairs}
                            </div>
                            <div className="text-sm text-gray-600 mb-4">Cặp đã ghép</div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-semibold text-gray-800">{attempts}</div>
                                    <div className="text-gray-600">Lượt thử</div>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-800">
                                        {selectedCards.length}/2
                                    </div>
                                    <div className="text-gray-600">Thẻ chọn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Game Grid */}
                <div className="bg-white rounded-2xl shadow-lg border">
                    <FlashcardGrid
                        cards={gameCards}
                        onCardClick={handleCardClick}
                        isGameActive={isGameActive}
                    />
                </div>

                {/* Instructions */}
                <div className="mt-6 text-center text-gray-600">
                    <p className="text-sm">
                        💡 Tất cả thẻ đều hiện sẵn - Chọn 2 thẻ để ghép cặp front-back cùng
                        nội dung
                    </p>
                </div>
            </div>
        </div>
    );
}
