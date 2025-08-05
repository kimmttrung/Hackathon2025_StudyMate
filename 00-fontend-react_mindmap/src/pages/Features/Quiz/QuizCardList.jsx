import { CheckCircle, XCircle } from "lucide-react";

export default function QuizCardList({ quiz, index, selected, submitted, onSelect }) {
    const options = [
        { key: "a", text: quiz.option_a },
        { key: "b", text: quiz.option_b },
        { key: "c", text: quiz.option_c },
        { key: "d", text: quiz.option_d },
    ];

    const isCorrect = selected === quiz.correct_option;

    const getOptionLabel = (key) => {
        switch (key) {
            case "a": return "A";
            case "b": return "B";
            case "c": return "C";
            case "d": return "D";
            default: return "";
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border">
            <h2 className="text-lg font-semibold text-gray-800">
                Câu {index + 1}: {quiz.question_text}
            </h2>

            <div className="space-y-2">
                {options.map((opt) => {
                    const isSelected = selected === opt.key;
                    const isCorrectOption = quiz.correct_option === opt.key;

                    let bgColor = "bg-white";
                    let borderColor = "border-gray-300";
                    let textColor = "text-gray-800";

                    if (submitted) {
                        if (isCorrectOption) {
                            bgColor = "bg-green-100";
                            borderColor = "border-green-500";
                            textColor = "text-green-700";
                        } else if (isSelected && !isCorrectOption) {
                            bgColor = "bg-red-100";
                            borderColor = "border-red-500";
                            textColor = "text-red-700";
                        }
                    } else if (isSelected) {
                        bgColor = "bg-blue-50";
                        borderColor = "border-blue-500";
                        textColor = "text-blue-700";
                    }

                    return (
                        <div
                            key={opt.key}
                            className={`cursor-pointer px-4 py-3 rounded-lg border ${bgColor} ${borderColor} ${textColor} transition-all`}
                            onClick={() => !submitted && onSelect(quiz.id, opt.key)}
                        >
                            <span className="font-semibold mr-2">{getOptionLabel(opt.key)}.</span>
                            {opt.text}
                        </div>
                    );
                })}
            </div>

            {submitted && (
                <div className="mt-4 flex items-center space-x-2">
                    {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <p className={`text-sm font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                        {isCorrect ? "Chính xác! 🎉" : "Sai rồi 😢"}
                    </p>
                </div>
            )}

            {submitted && quiz.explanation && (
                <div className="mt-4 p-4 bg-gray-50 border-l-4 border-blue-400">
                    <h4 className="text-sm font-bold text-blue-700 mb-1">Giải thích:</h4>
                    <p className="text-sm text-gray-700">{quiz.explanation}</p>
                </div>
            )}
        </div>
    );
}
