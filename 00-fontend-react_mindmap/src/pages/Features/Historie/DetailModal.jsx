import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Map, CheckCircle, XCircle, Star } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function DetailModal({
    progress,
    folders,
    mindmaps,
    isOpen,
    onClose
}) {
    if (!progress) return null;

    const getReferenceName = (referenceId, type) => {
        if (type === 'mindmap') {
            return mindmaps.find(m => m.id === referenceId)?.name || "Unknown Mindmap";
        }
        return folders.find(f => f.id === referenceId)?.name || "Unknown Folder";
    };

    const referenceName = getReferenceName(progress.reference_id, progress.type);

    const renderQuizDetails = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{progress.score}%</div>
                    <div className="text-sm text-gray-600">Điểm số</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{progress.correct_items}/{progress.total_items}</div>
                    <div className="text-sm text-gray-600">Đúng/Tổng</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{progress.time_taken}p</div>
                    <div className="text-sm text-gray-600">Thời gian</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{progress.details?.difficulty || 'N/A'}</div>
                    <div className="text-sm text-gray-600">Độ khó</div>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="font-semibold">Chi tiết câu hỏi:</h4>
                {progress.details?.questions?.map((q, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${q.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-start gap-3">
                            {q.isCorrect ?
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> :
                                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                            }
                            <div className="flex-1">
                                <p className="font-medium">{q.question}</p>
                                <p className="text-sm text-gray-600 mt-1">Bạn trả lời: <span className="font-medium">{q.userAnswer}</span></p>
                                {!q.isCorrect && (
                                    <p className="text-sm text-green-600 mt-1">Đáp án đúng: <span className="font-medium">{q.correctAnswer}</span></p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFlashcardDetails = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{progress.correct_items}/{progress.total_items}</div>
                    <div className="text-sm text-gray-600">Thẻ ôn tập</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{progress.time_taken}p</div>
                    <div className="text-sm text-gray-600">Thời gian</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{progress.details?.ease_factor || 'N/A'}</div>
                    <div className="text-sm text-gray-600">Ease Factor</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{progress.details?.interval || 'N/A'}d</div>
                    <div className="text-sm text-gray-600">Interval</div>
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-3">Chất lượng ôn tập:</h4>
                <div className="flex gap-2">
                    {progress.details?.quality_ratings?.map((rating, index) => (
                        <div key={index} className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-3">Thẻ khó nhớ:</h4>
                <div className="space-y-2">
                    {progress.details?.difficult_cards?.map((cardId, index) => (
                        <div key={index} className="p-3 bg-red-50 rounded-lg">
                            <span className="text-sm font-medium">Thẻ #{cardId}</span>
                            <Badge variant="destructive" className="ml-2">Khó</Badge>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderMindmapDetails = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{Math.round((progress.correct_items / progress.total_items) * 100)}%</div>
                    <div className="text-sm text-gray-600">Hoàn thành</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{progress.correct_items}/{progress.total_items}</div>
                    <div className="text-sm text-gray-600">Node đã học</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{progress.time_taken}p</div>
                    <div className="text-sm text-gray-600">Thời gian</div>
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-3">Node đã hoàn thành:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {progress.details?.completed_nodes?.map((nodeId, index) => (
                        <div key={index} className="p-2 bg-green-100 rounded text-center text-sm">
                            <CheckCircle className="h-4 w-4 inline mr-1 text-green-600" />
                            {nodeId}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-3">Lộ trình học tập:</h4>
                <div className="space-y-2">
                    {progress.details?.learning_path?.map((concept, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                            <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">{index + 1}</span>
                            <span className="text-sm">{concept}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderDetailContent = () => {
        switch (progress.type) {
            case 'quiz':
                return renderQuizDetails();
            case 'flashcard':
                return renderFlashcardDetails();
            case 'mindmap':
                return renderMindmapDetails();
            default:
                return <div>Không có dữ liệu chi tiết</div>;
        }
    };

    const getTypeIcon = () => {
        switch (progress.type) {
            case 'quiz':
                return <BookOpen className="h-5 w-5 text-blue-600" />;
            case 'flashcard':
                return <Brain className="h-5 w-5 text-purple-600" />;
            case 'mindmap':
                return <Map className="h-5 w-5 text-green-600" />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {getTypeIcon()}
                        Chi tiết phiên học - {referenceName}
                    </DialogTitle>
                    <DialogDescription>
                        {format(new Date(progress.attempt_at), "EEEE, dd MMMM yyyy 'lúc' HH:mm", { locale: vi })}
                    </DialogDescription>
                </DialogHeader>
                {renderDetailContent()}
            </DialogContent>
        </Dialog>
    );
}
