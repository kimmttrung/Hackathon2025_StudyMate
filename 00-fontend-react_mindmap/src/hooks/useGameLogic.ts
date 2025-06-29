import { Flashcard } from "@/data/flascards";
import { useState, useEffect, useCallback } from "react";


export interface GameCard {
    id: string;
    content: string;
    type: "front" | "back";
    flashcardId: string;
    isSelected: boolean;
    isMatched: boolean;
}

interface UseGameLogicProps {
    flashcards: Flashcard[];
    timeLimit: number; // in seconds
    onGameComplete: (won: boolean, stats: GameStats) => void;
}

export interface GameStats {
    totalCards: number;
    matchedPairs: number;
    timeRemaining: number;
    totalTime: number;
    attempts: number;
}

export const useGameLogic = ({
    flashcards,
    timeLimit,
    onGameComplete,
}: UseGameLogicProps) => {
    const [gameCards, setGameCards] = useState<GameCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
    const [timeRemaining, setTimeRemaining] = useState(timeLimit);
    const [isGameActive, setIsGameActive] = useState(true);
    const [attempts, setAttempts] = useState(0);
    const MATCH_DELAY_MS = 300;

    // Initialize game cards
    useEffect(() => {
        const shuffleArray = <T>(array: T[]): T[] => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        // Take first 20 flashcards or all if less than 20
        const selectedFlashcards = flashcards.slice(
            0,
            Math.min(20, flashcards.length),
        );

        // Create front and back cards
        const cards: GameCard[] = [];
        selectedFlashcards.forEach((flashcard) => {
            cards.push({
                id: `${flashcard.id}-front`,
                content: flashcard.front,
                type: "front",
                flashcardId: flashcard.id,
                isSelected: false,
                isMatched: false,
            });
            cards.push({
                id: `${flashcard.id}-back`,
                content: flashcard.back,
                type: "back",
                flashcardId: flashcard.id,
                isSelected: false,
                isMatched: false,
            });
        });

        setGameCards(shuffleArray(cards));
    }, [flashcards]);

    // Timer
    useEffect(() => {
        if (!isGameActive || timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    setIsGameActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isGameActive, timeRemaining]);

    // Check for game end
    useEffect(() => {
        const totalPairs = Math.floor(gameCards.length / 2);

        if (matchedPairs.size === totalPairs && totalPairs > 0) {
            // Won the game
            setIsGameActive(false);
            onGameComplete(true, {
                totalCards: gameCards.length,
                matchedPairs: matchedPairs.size,
                timeRemaining,
                totalTime: timeLimit,
                attempts,
            });
        } else if (timeRemaining === 0 && isGameActive) {
            // Time's up
            setIsGameActive(false);
            onGameComplete(false, {
                totalCards: gameCards.length,
                matchedPairs: matchedPairs.size,
                timeRemaining: 0,
                totalTime: timeLimit,
                attempts,
            });
        }
    }, [
        matchedPairs.size,
        timeRemaining,
        gameCards.length,
        isGameActive,
        timeLimit,
        attempts,
        onGameComplete,
    ]);

    // Handle card selection
    const handleCardClick = useCallback(
        (cardId: string) => {
            if (!isGameActive) return;

            const card = gameCards.find((c) => c.id === cardId);
            if (!card || card.isMatched || card.isSelected) return;

            if (selectedCards.length === 0) {
                // First card selection
                setSelectedCards([cardId]);
                setGameCards((prev) =>
                    prev.map((c) => (c.id === cardId ? { ...c, isSelected: true } : c)),
                );
            } else if (selectedCards.length === 1) {
                // Second card selection
                if (selectedCards[0] === cardId) return; // Same card clicked

                setSelectedCards((prev) => [...prev, cardId]);
                setGameCards((prev) =>
                    prev.map((c) => (c.id === cardId ? { ...c, isSelected: true } : c)),
                );
                setAttempts((prev) => prev + 1);

                // Check for match after a short delay to show both selected cards
                setTimeout(() => {
                    const firstCard = gameCards.find((c) => c.id === selectedCards[0]);
                    const secondCard = gameCards.find((c) => c.id === cardId);

                    if (
                        firstCard &&
                        secondCard &&
                        firstCard.flashcardId === secondCard.flashcardId
                    ) {
                        // ✅ Match found — safe to update matchedPairs
                        setMatchedPairs((prev) => {
                            const updated = new Set(prev);
                            updated.add(firstCard.flashcardId);
                            return updated;
                        });

                        setGameCards((prev) =>
                            prev.map((c) =>
                                c.flashcardId === firstCard.flashcardId
                                    ? { ...c, isMatched: true, isSelected: false }
                                    : c,
                            ),
                        );
                    } else {
                        // ❌ Not a match — unselect
                        setGameCards((prev) =>
                            prev.map((c) =>
                                c.id === selectedCards[0] || c.id === cardId
                                    ? { ...c, isSelected: false }
                                    : c,
                            ),
                        );
                    }

                    setSelectedCards([]);
                }, MATCH_DELAY_MS);

            }
        },
        [gameCards, selectedCards, isGameActive],
    );

    const resetGame = useCallback(() => {
        setSelectedCards([]);
        setMatchedPairs(new Set());
        setTimeRemaining(timeLimit);
        setIsGameActive(true);
        setAttempts(0);

        // Reset all cards
        setGameCards((prev) =>
            prev.map((card) => ({
                ...card,
                isSelected: false,
                isMatched: false,
            })),
        );
    }, [timeLimit]);

    return {
        gameCards,
        selectedCards,
        matchedPairs: matchedPairs.size,
        timeRemaining,
        isGameActive,
        attempts,
        totalPairs: Math.floor(gameCards.length / 2),
        handleCardClick,
        resetGame,
    };
};
