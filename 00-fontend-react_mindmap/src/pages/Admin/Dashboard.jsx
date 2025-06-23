import React from "react";
import {
    Users,
    FileText,
    Layers,
    ClipboardList,
    LogOut,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
    const chartData = [
        { name: "Users", value: 1204 },
        { name: "Flashcards", value: 3452 },
        { name: "Mindmaps", value: 982 },
        { name: "Questions", value: 5600 },
    ];

    const studentProgress = [
        { name: "Trung Mai", hours: 12, flashcards: 220, mindmaps: 8, quizzes: "5/8", percent: 62 },
        { name: "Hà Linh", hours: 7.5, flashcards: 140, mindmaps: 4, quizzes: "3/5", percent: 60 },
        { name: "Nam Anh", hours: 9, flashcards: 180, mindmaps: 6, quizzes: "4/7", percent: 57 },
        { name: "Lan Phương", hours: 15, flashcards: 300, mindmaps: 10, quizzes: "6/6", percent: 100 },
        { name: "Hoàng Bảo", hours: 5, flashcards: 90, mindmaps: 2, quizzes: "2/4", percent: 50 },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-sm text-gray-500">Welcome back, Admin! 👋</p>
                </div>
                <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={<Users />} label="Người dùng" value="1,204" color="bg-blue-500" />
                <StatCard icon={<ClipboardList />} label="Flashcards" value="3,452" color="bg-purple-500" />
                <StatCard icon={<Layers />} label="Mindmaps" value="982" color="bg-green-500" />
                <StatCard icon={<FileText />} label="Câu hỏi ôn tập" value="5,600" color="bg-yellow-500" />
            </div>

            {/* Charts & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Tổng quan dữ liệu</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* User Activity Table */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Lịch sử người dùng gần đây</h2>
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2">Tên</th>
                                <th>Hoạt động</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2">Trung Mai</td>
                                <td>Tạo flashcard</td>
                                <td>10 phút trước</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">Hà Linh</td>
                                <td>Tải ảnh lên</td>
                                <td>30 phút trước</td>
                            </tr>
                            <tr>
                                <td className="py-2">Nam Anh</td>
                                <td>Học sơ đồ tư duy</td>
                                <td>1 giờ trước</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Student Progress Table */}
            <div className="bg-white p-6 rounded-2xl shadow mt-10">
                <h2 className="text-xl font-semibold mb-4">Thống kê học tập học viên</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4">Học viên</th>
                                <th className="py-2 px-4">Giờ học</th>
                                <th className="py-2 px-4">Flashcards</th>
                                <th className="py-2 px-4">Mindmaps</th>
                                <th className="py-2 px-4">Quiz hoàn thành</th>
                                <th className="py-2 px-4">Tiến độ (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentProgress.map((s, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4 font-medium">{s.name}</td>
                                    <td className="py-2 px-4">{s.hours} giờ</td>
                                    <td className="py-2 px-4">{s.flashcards}</td>
                                    <td className="py-2 px-4">{s.mindmaps}</td>
                                    <td className="py-2 px-4">{s.quizzes}</td>
                                    <td className="py-2 px-4">
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-green-500 h-3 rounded-full"
                                                style={{ width: `${s.percent}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-600">{s.percent}%</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => {
    return (
        <div className={`p-5 rounded-2xl text-white flex items-center justify-between shadow ${color}`}>
            <div>
                <p className="text-sm opacity-80">{label}</p>
                <h3 className="text-2xl font-semibold">{value}</h3>
            </div>
            <div className="text-white opacity-70">{icon}</div>
        </div>
    );
};

export default Dashboard;
