import { X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UpgradePage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-8 flex items-center justify-center">
            {/* ❌ Nút X quay lại */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition"
                aria-label="Close"
            >
                <X size={28} />
            </button>

            <div className="max-w-7xl w-full bg-white shadow-2xl rounded-3xl p-10">
                <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Nâng cấp trải nghiệm học tập AI với Gemini</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* FREE PLAN */}
                    <div className="border rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">🌱 Miễn phí</h2>
                            <p className="text-3xl font-bold">$0</p>
                            <p className="text-sm text-gray-600 mb-4">USD / tháng</p>
                            <p className="text-sm text-gray-700 mb-4">
                                Khám phá sức mạnh AI trong học tập với quyền truy cập cơ bản. Phù hợp với người mới bắt đầu.
                            </p>
                            <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
                                <li>Sử dụng tối đa <strong>10 lần</strong> mỗi tháng để tạo Flashcard, Quiz hoặc Mindmap bằng AI Gemini</li>
                                <li>Hỗ trợ tài liệu PDF, ảnh, văn bản</li>
                                <li>Giao diện học thân thiện, dễ sử dụng</li>
                                <li>Không bao gồm phân tích nâng cao và lịch học AI</li>
                            </ul>
                        </div>
                        <button
                            disabled
                            className="mt-6 bg-gray-300 text-white font-medium py-2 rounded-lg cursor-not-allowed"
                        >
                            Gói hiện tại
                        </button>
                    </div>

                    {/* PLUS PLAN */}
                    <div className="border-2 border-blue-500 rounded-2xl p-6 flex flex-col justify-between shadow-md">
                        <div>
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">🚀 Plus</h2>
                            <p className="text-3xl font-bold">$10</p>
                            <p className="text-sm text-gray-600 mb-4">USD / tháng</p>
                            <p className="text-sm text-gray-700 mb-4">
                                Mở khóa sức mạnh AI không giới hạn trong học tập: Flashcard, bài kiểm tra, sơ đồ tư duy và hơn thế nữa.
                            </p>
                            <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
                                <li>Tạo không giới hạn Flashcard, Quiz, Mindmap bằng Gemini</li>
                                <li>Trích xuất thông tin từ PDF, DOC, hình ảnh nâng cao</li>
                                <li>Gợi ý học thông minh dựa trên hành vi và tiến độ học</li>
                                <li>Lên lịch học tập và nhắc nhở tự động theo mục tiêu</li>
                                <li>Truy cập mô hình Gemini 1.5 mạnh hơn</li>
                                <li>Hỗ trợ AI trả lời chi tiết, tự động phân tích câu sai</li>
                                <li>Ưu tiên xử lý AI nhanh hơn gói Free</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => alert("Nâng cấp lên Plus...")}
                            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
                        >
                            Nâng cấp Plus
                        </button>
                    </div>

                    {/* PRO PLAN */}
                    <div className="border-2 border-purple-500 rounded-2xl p-6 flex flex-col justify-between shadow-md">
                        <div>
                            <h2 className="text-xl font-semibold text-purple-700 mb-2">🌟 Pro</h2>
                            <p className="text-3xl font-bold">$100</p>
                            <p className="text-sm text-gray-600 mb-4">USD / tháng</p>
                            <p className="text-sm text-gray-700 mb-4">
                                Trải nghiệm toàn diện công nghệ AI trong học tập – phân tích, tổ chức, quản lý tri thức cá nhân ở mức chuyên sâu.
                            </p>
                            <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
                                <li>Tất cả tính năng của Plus</li>
                                <li>Phân tích tài liệu đa chiều (cấu trúc, mục tiêu, từ khóa)</li>
                                <li>Trợ lý AI riêng tư cho từng môn học</li>
                                <li>Lập kế hoạch học tập thông minh theo từng tuần/tháng</li>
                                <li>Truy vấn AI qua giọng nói hoặc ảnh trực tiếp</li>
                                <li>Tích hợp API & tương thích Google Classroom, Notion</li>
                                <li>Truy cập mô hình Gemini nâng cao và tốc độ phản hồi tối ưu</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => alert("Đăng ký Pro...")}
                            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg"
                        >
                            Nâng cấp Pro
                        </button>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-10">
                    Đã có gói?{" "}
                    <span className="underline cursor-pointer" onClick={() => navigate("/billing")}>
                        Xem chi tiết thanh toán
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UpgradePage;
