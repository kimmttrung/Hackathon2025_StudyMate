import { useNavigate } from "react-router-dom";


const FormHeader = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-center mb-4">
                <div
                    className="w-16 h-16 text-2xl font-bold leading-8 text-white rounded-2xl shadow-xl 
                    bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    M
                </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold leading-9 text-center text-slate-800 max-sm:text-2xl">
                MickeAI
            </h1>
            <p className="mb-6 text-lg leading-7 text-center text-slate-500 max-sm:text-base">
                Nền tảng học tập thông minh
            </p>
            <div className="flex gap-2 justify-center mb-10 max-sm:flex-wrap max-sm:gap-1.5">
                <div className="px-3 py-1 h-7 text-sm leading-5 text-indigo-500 bg-indigo-50 rounded-2xl">
                    Mindmap
                </div>
                <div className="px-3 py-1 h-7 text-sm leading-5 text-violet-500 bg-purple-100 rounded-2xl">
                    Flashcard
                </div>
                <div className="px-3 py-1 h-7 text-sm leading-5 text-emerald-500 bg-emerald-50 rounded-2xl">
                    AI
                </div>
            </div>
        </>
    );
}
export default FormHeader;