import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
            <div className="text-center">
                <div className="text-8xl mb-4">🤔</div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Trang không tìm thấy
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Oops! Trang bạn đang tìm kiếm không tồn tại.
                </p>
                <Button
                    onClick={() => navigate("/user/dashboard")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                >
                    <Home className="h-5 w-5 mr-2" />
                    Về trang chủ
                </Button>
            </div>
        </div>
    );
}
