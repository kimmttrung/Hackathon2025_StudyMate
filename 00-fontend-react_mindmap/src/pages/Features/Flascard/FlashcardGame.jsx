import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Play, BookOpen, Clock, Target } from "lucide-react";
import { flashcardFolders } from "@/data/flascards";
import { Layout } from "@/components/Layout";

export default function Index() {
    const navigate = useNavigate();
    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleFolderSelect = (folderId) => {
        setSelectedFolder(folderId);
        setTimeout(() => {
            navigate(`/user/flashcards/game/${folderId}`);
        }, 200);
    };

    return (
        <Layout title="Chơi Game">
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
                {/* Header */}
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Flashcard Memory Game
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Trò chơi ghép thẻ flashcard - Tập trung và ghi nhớ!
                        </p>

                        {/* Game Rules */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border">
                                <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-800 mb-2">Mục tiêu</h3>
                                <p className="text-sm text-gray-600">
                                    Ghép tất cả các cặp thẻ front-back với nhau
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg border">
                                <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-800 mb-2">Thời gian</h3>
                                <p className="text-sm text-gray-600">
                                    Hoàn thành trước khi hết thời gian để thắng
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg border">
                                <BookOpen className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-800 mb-2">Cách chơi</h3>
                                <p className="text-sm text-gray-600">
                                    Tất cả thẻ hiện sẵn, chọn 2 thẻ để ghép cặp
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Folder Selection */}
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            Chọn chủ đề để bắt đầu
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {flashcardFolders.map((folder) => (
                                <div
                                    key={folder.id}
                                    className={`
                  bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer
                  hover:shadow-xl hover:scale-105 hover:border-purple-300
                  ${selectedFolder === folder.id ? "border-purple-500 scale-105" : "border-gray-200"}
                `}
                                    onClick={() => handleFolderSelect(folder.id)}
                                >
                                    <div
                                        className={`h-32 rounded-t-2xl bg-gradient-to-r ${folder.color} flex items-center justify-center relative overflow-hidden`}
                                    >
                                        <div className="text-6xl opacity-20 absolute top-4 right-4">
                                            {folder.icon}
                                        </div>
                                        <div className="text-4xl">{folder.icon}</div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {folder.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4 text-sm">
                                            {folder.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-500">
                                                {folder.flashcards.length} thẻ
                                            </div>
                                            <div className="flex items-center gap-2 text-purple-600 font-medium">
                                                <Play className="h-4 w-4" />
                                                Chọn
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-16 text-gray-500">
                        <p>🧠 Tăng cường trí nhớ và khả năng tập trung qua trò chơi!</p>
                    </div>
                </div>
            </div>
        </Layout>

    );
}
