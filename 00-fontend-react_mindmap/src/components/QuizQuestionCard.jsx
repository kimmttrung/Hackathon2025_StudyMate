
export default function QuizQuestionCard({ flashcard, allFlashcards, onNext, currentIndex, total }) {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);


    useEffect(() => {
        if (flashcard && allFlashcards.length > 0) {
            const incorrectAnswers = allFlashcards
                .filter(fc => fc.back !== flashcard.back)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(fc => fc.back);

            const choices = [...incorrectAnswers, flashcard.back].sort(() => 0.5 - Math.random());
            setOptions(choices);
            setSelected(null);
            setShowAnswer(false);
        }
    }, [flashcard, allFlashcards]);

    const handleSelect = (option) => {
        setSelected(option);
        setShowAnswer(true);
    };

    const handleNext = () => {
        onNext(selected === flashcard.back);
    };

    return (
        <div className="p-6 border rounded-xl shadow-md bg-white space-y-4">
            <div className="text-sm text-muted-foreground">Câu hỏi {currentIndex + 1} / {total}</div>
            <h2 className="text-xl font-semibold">{flashcard.front}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((option, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        className={`justify-start w-full text-left ${showAnswer
                            ? option === flashcard.back
                                ? "border-green-500 text-green-700"
                                : option === selected
                                    ? "border-red-500 text-red-700"
                                    : ""
                            : ""
                            }`}
                        onClick={() => handleSelect(option)}
                        disabled={showAnswer}
                    >
                        {option}
                    </Button>
                ))}
            </div>

            {showAnswer && (
                <div className="flex justify-end pt-4">
                    <Button onClick={handleNext} className="bg-test text-test-foreground">
                        Câu tiếp theo
                    </Button>
                </div>
            )}
        </div>
    );
}