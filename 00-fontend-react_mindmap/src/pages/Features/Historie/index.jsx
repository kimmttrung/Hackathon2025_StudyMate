import { useState } from "react";
import { Header } from "./Header";
import { FilterSection } from "./FilterSection";
import { StatisticsCards } from "./StatisticsCards";
import { LearningProgressList } from "./LearningProgressList";
import { DetailModal } from "./DetailModal";

// Mock data - in real app this would come from API
const mockLearningProgress = [
    {
        id: "1",
        user_id: "user1",
        type: "quiz",
        reference_id: "folder_1",
        attempt_at: "2024-01-15T10:30:00Z",
        correct_items: 8,
        total_items: 10,
        score: 80,
        time_taken: 25,
        details: {
            questions: [
                { question: "2 + 2 = ?", userAnswer: "4", correctAnswer: "4", isCorrect: true },
                { question: "3 × 5 = ?", userAnswer: "12", correctAnswer: "15", isCorrect: false }
            ],
            difficulty: "khó",
            attempt_number: 2
        },
        created_at: "2024-01-15T10:55:00Z"
    },
    {
        id: "2",
        user_id: "user1",
        type: "flashcard",
        reference_id: "folder_2",
        attempt_at: "2024-01-14T14:15:00Z",
        correct_items: 45,
        total_items: 60,
        time_taken: 30,
        details: {
            quality_ratings: [4, 3, 5, 4, 3],
            difficult_cards: ["card_1", "card_2"],
            ease_factor: 2.6,
            interval: 7
        },
        created_at: "2024-01-14T14:45:00Z"
    },
    {
        id: "3",
        user_id: "user1",
        type: "mindmap",
        reference_id: "mindmap_1",
        attempt_at: "2024-01-13T09:00:00Z",
        correct_items: 18,
        total_items: 24,
        time_taken: 45,
        details: {
            completed_nodes: ["node_1", "node_2", "node_3"],
            learning_path: ["concept_a", "concept_b"],
            comprehension_score: 85
        },
        created_at: "2024-01-13T09:45:00Z"
    },
    {
        id: "4",
        user_id: "user1",
        type: "quiz",
        reference_id: "folder_3",
        attempt_at: "2024-01-12T16:20:00Z",
        correct_items: 18,
        total_items: 20,
        score: 90,
        time_taken: 20,
        details: {
            questions: [
                { question: "Vietnam capital?", userAnswer: "Hanoi", correctAnswer: "Hanoi", isCorrect: true }
            ],
            difficulty: "dễ",
            attempt_number: 1
        },
        created_at: "2024-01-12T16:40:00Z"
    }
];

const mockFolders = [
    { id: "folder_1", name: "Toán học lớp 12", tags: ["toán", "lớp 12", "đại số"] },
    { id: "folder_2", name: "Từ vựng tiếng Anh IELTS", tags: ["tiếng anh", "IELTS", "từ vựng"] },
    { id: "folder_3", name: "Lịch sử Việt Nam", tags: ["lịch sử", "việt nam", "chính trị"] }
];

const mockMindmaps = [
    { id: "mindmap_1", name: "Cấu trúc ngữ pháp tiếng Anh", tags: ["tiếng anh", "ngữ pháp"], total_nodes: 24 }
];

export default function Index() {
    const [filters, setFilters] = useState({
        type: "all",
        dateFrom: null,
        dateTo: null,
        folder: "all",
        tag: "all",
        searchTerm: ""
    });

    const [selectedProgress, setSelectedProgress] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const filteredProgress = mockLearningProgress.filter(progress => {
        if (filters.type !== "all" && progress.type !== filters.type) return false;
        if (filters.folder !== "all" && progress.reference_id !== filters.folder) return false;
        if (filters.searchTerm) {
            const folderName = mockFolders.find(f => f.id === progress.reference_id)?.name ||
                mockMindmaps.find(m => m.id === progress.reference_id)?.name || "";
            if (!folderName.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
        }
        return true;
    });

    const statistics = {
        totalSessions: filteredProgress.length,
        totalTimeSpent: filteredProgress.reduce((sum, p) => sum + p.time_taken, 0),
        averageQuizScore: (() => {
            const quizSessions = filteredProgress.filter(p => p.type === 'quiz');
            return quizSessions.length > 0
                ? Math.round(quizSessions.reduce((sum, p) => sum + (p.score || 0), 0) / quizSessions.length)
                : 0;
        })(),
        totalFlashcardsReviewed: filteredProgress
            .filter(p => p.type === 'flashcard')
            .reduce((sum, p) => sum + p.correct_items, 0),
        totalMindmapsCreated: filteredProgress.filter(p => p.type === 'mindmap').length
    };

    const allTags = Array.from(new Set([
        ...mockFolders.flatMap(f => f.tags),
        ...mockMindmaps.flatMap(m => m.tags)
    ]));

    const openDetailView = (progress) => {
        setSelectedProgress(progress);
        setIsDetailOpen(true);
    };

    const closeDetailView = () => {
        setIsDetailOpen(false);
        setSelectedProgress(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Header
                totalTimeSpent={statistics.totalTimeSpent}
                totalSessions={statistics.totalSessions}
            />

            <div className="container mx-auto px-4 py-6">
                <FilterSection
                    filters={filters}
                    onFiltersChange={setFilters}
                    folders={mockFolders}
                    mindmaps={mockMindmaps}
                    allTags={allTags}
                />

                <StatisticsCards statistics={statistics} />

                <LearningProgressList
                    progress={filteredProgress}
                    folders={mockFolders}
                    mindmaps={mockMindmaps}
                    onViewDetail={openDetailView}
                />

                <DetailModal
                    progress={selectedProgress}
                    folders={mockFolders}
                    mindmaps={mockMindmaps}
                    isOpen={isDetailOpen}
                    onClose={closeDetailView}
                />
            </div>
        </div>
    );
}
