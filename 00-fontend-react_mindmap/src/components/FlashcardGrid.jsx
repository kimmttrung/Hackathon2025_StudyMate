import { cn } from "./lib/utils";


export default function FlashcardGrid({ cards, onCardClick, isGameActive }) {
    return (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 p-6">
            {cards.map((card) => (
                <FlashcardItem
                    key={card.id}
                    card={card}
                    onClick={() => onCardClick(card.id)}
                    disabled={!isGameActive}
                />
            ))}
        </div>
    );
}

function FlashcardItem({ card, onClick, disabled }) {
    const isClickable = !disabled && !card.isMatched && !card.isSelected;

    return (
        <div
            className={cn(
                "relative aspect-square cursor-pointer transition-all duration-300 transform",
                isClickable && "hover:scale-105",
                disabled && "cursor-not-allowed",
            )}
            onClick={isClickable ? onClick : undefined}
        >
            <div
                className={cn(
                    "w-full h-full rounded-xl border-2 transition-all duration-500 relative",
                    "flex items-center justify-center text-center p-2",
                    card.isMatched
                        ? "bg-green-100 border-green-500 text-green-800"
                        : card.isSelected
                            ? "bg-yellow-100 border-yellow-500 text-yellow-800 scale-105"
                            : "bg-white border-gray-300 text-gray-800 hover:border-purple-400 hover:shadow-md",
                    !isClickable && !card.isMatched && "opacity-50",
                )}
            >
                <div className="text-xs md:text-sm font-medium leading-tight">
                    {card.content}
                </div>

                {card.isMatched && (
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        ✓
                    </div>
                )}

                {card.isSelected && !card.isMatched && (
                    <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        ⭐
                    </div>
                )}
            </div>
        </div>
    );
}
