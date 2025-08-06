import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Map, Clock, Eye } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function LearningSessionItem({
    progress,
    folders,
    mindmaps,
    onViewDetail
}) {
    const getReferenceName = (referenceId, type) => {
        if (type === 'mindmap') {
            return mindmaps.find(m => m.id === referenceId)?.name || "Unknown Mindmap";
        }
        return folders.find(f => f.id === referenceId)?.name || "Unknown Folder";
    };

    const referenceName = getReferenceName(progress.reference_id, progress.type);
    const completionPercent = Math.round((progress.correct_items / progress.total_items) * 100);

    const getTypeIcon = () => {
        switch (progress.type) {
            case 'quiz':
                return <BookOpen className="h-4 w-4 text-blue-600" />;
            case 'flashcard':
                return <Brain className="h-4 w-4 text-purple-600" />;
            case 'mindmap':
                return <Map className="h-4 w-4 text-green-600" />;
            default:
                return null;
        }
    };

    const getTypeColor = () => {
        switch (progress.type) {
            case 'quiz':
                return 'bg-blue-100';
            case 'flashcard':
                return 'bg-purple-100';
            case 'mindmap':
                return 'bg-green-100';
            default:
                return 'bg-gray-100';
        }
    };

    const getTypeBadge = () => {
        switch (progress.type) {
            case 'quiz':
                return { variant: 'default', label: '📘 Quiz' };
            case 'flashcard':
                return { variant: 'secondary', label: '🧠 Flashcard' };
            case 'mindmap':
                return { variant: 'outline', label: '🗺️ Mindmap' };
            default:
                return { variant: 'outline', label: 'Unknown' };
        }
    };

    const typeBadge = getTypeBadge();

    return (
        <div className="p-4 rounded-lg border hover:shadow-md transition-all bg-white/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Type Icon & Name */}
                <div className="lg:col-span-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor()}`}>
                        {getTypeIcon()}
                    </div>
                    <div>
                        <h3 className="font-semibold">{referenceName}</h3>
                        <p className="text-sm text-gray-600">
                            {format(new Date(progress.attempt_at), "dd/MM/yyyy HH:mm", { locale: vi })}
                        </p>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 text-center">
                    <div className="text-lg font-bold text-green-600">{completionPercent}%</div>
                    <div className="text-sm text-gray-600">{progress.correct_items}/{progress.total_items}</div>
                </div>

                {/* Score (for quiz) */}
                <div className="lg:col-span-1 text-center">
                    {progress.score && (
                        <Badge variant="outline" className="font-bold">
                            {progress.score}%
                        </Badge>
                    )}
                </div>

                {/* Time */}
                <div className="lg:col-span-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{progress.time_taken}p</span>
                    </div>
                </div>

                {/* Type Badge */}
                <div className="lg:col-span-2 text-center">
                    <Badge variant={typeBadge.variant}>
                        {typeBadge.label}
                    </Badge>
                </div>

                {/* Action */}
                <div className="lg:col-span-1">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewDetail(progress)}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
