import React, { useContext, useEffect, useState } from "react";
import { FileText, Layers, ClipboardList, CalendarDays, ArrowLeft, PlusCircle, Trash2, Edit3, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/context/auth.context";
import axios from "@/utils/axios.customize";
import { User, LogOut } from "lucide-react";

const DashboardUser = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const chartData = [
        { name: "Flashcards", value: 3452 },
        { name: "Mindmaps", value: 982 },
        { name: "Questions", value: 5600 },
    ];

    const [tasksToday, setTasksToday] = useState([
        { task: "Học 20 flashcards chương 1", time: "08:00", done: false },
        { task: "Làm bài trắc nghiệm môn Sinh", time: "10:00", done: true },
        { task: "Hoàn thành sơ đồ tư duy bài 2", time: "14:00", done: false },
        { task: "Xem lại câu sai trong câu hỏi ôn tập", time: "17:00", done: true },
        { task: "Ôn lại từ vựng đã học hôm qua", time: "20:00", done: false },
    ]);

    const handleToggleDone = (index) => {
        const updated = [...tasksToday];
        updated[index].done = !updated[index].done;
        setTasksToday(updated);
    };

    const handleEditTask = (index) => {
        const newTask = prompt("Sửa nội dung công việc:", tasksToday[index].task);
        if (newTask) {
            const updated = [...tasksToday];
            updated[index].task = newTask;
            setTasksToday(updated);
        }
    };

    const handleDeleteTask = (index) => {
        if (confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
            setTasksToday(tasksToday.filter((_, i) => i !== index));
        }
    };
    const handleAddTask = () => {
        const task = prompt("Nhập nội dung công việc:");
        const time = prompt("Nhập giờ (hh:mm):");
        if (task && time) {
            setTasksToday(prev => [...prev, { task, time, done: false }]);
        }
    };

    const completed = tasksToday.filter((t) => t.done).length;
    const total = tasksToday.length;
    const pieData = [
        { name: "Hoàn thành", value: completed },
        { name: "Chưa xong", value: total - completed },
    ];
    const COLORS = ["#10b981", "#facc15"]; // xanh, vàng

    const progress = Math.round((tasksToday.filter(t => t.done).length / tasksToday.length) * 100);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await axios.get("/api/users/account"
                );
                // console.log("check res dashboard", res);

                setAuth({
                    isAuthenticated: true,
                    user: res.user
                });
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                setAuth({
                    isAuthenticated: false,
                    user: null,
                });
            }
        };

        fetchUser();
    }, [setAuth]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="relative mb-8 p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-100 shadow-lg border border-blue-100">
                {/* Avatar to ở giữa */}
                <div className="relative mt-4 flex justify-center">
                    <img
                        src={auth.user?.avatar || "/default-avatar.png"}
                        alt="welcome"
                        className="w-40 h-40 rounded-full border-4 border-white shadow-md"
                    />
                    <span className="absolute bottom-2 right-[calc(50%-20px)] bg-green-500 w-5 h-5 rounded-full border-2 border-white" title="Đang hoạt động"></span>
                </div>

                <h1 className="text-4xl font-bold text-indigo-600 mt-4 flex justify-center items-center gap-2">
                    <span>👋</span> Chào mừng bạn quay lại <span className="text-indigo-700">{auth.user?.username}</span>
                </h1>

                <p className="text-gray-700 text-lg mt-2 flex items-center justify-center gap-2">
                    📚 Hãy tiếp tục học tập để đạt kết quả tốt hơn mỗi ngày!
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StatCard icon={<ClipboardList />} label="Flashcards" value="3,452" color="bg-purple-500" />
                <StatCard icon={<Layers />} label="Mindmaps" value="982" color="bg-green-500" />
                <StatCard icon={<FileText />} label="Câu hỏi ôn tập" value="5,600" color="bg-yellow-500" />
            </div>

            {/* Chart + Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="value"
                            radius={[8, 8, 0, 0]}
                            fill="#8884d8" // fallback color
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        index % 3 === 0
                                            ? "#6366F1" // Indigo
                                            : index % 3 === 1
                                                ? "#10B981" // Emerald
                                                : "#F59E0B" // Amber
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-blue-500" /> Việc cần làm hôm nay
                        </h2>
                        <button onClick={handleAddTask} className="text-green-600 hover:text-green-800 flex items-center gap-1">
                            <PlusCircle className="w-4 h-4" /> Thêm
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {tasksToday.map((task, index) => (
                            <li key={index} className="border-b pb-2 flex items-center justify-between">
                                <label className="flex items-center gap-2 flex-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={() => handleToggleDone(index)}
                                        className="w-5 h-5 text-green-600 accent-green-500"
                                    />
                                    <span className={`text-sm ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                                        🕘 {task.time} - {task.task}
                                    </span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleEditTask(index)} className="text-blue-500 hover:text-blue-700">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDeleteTask(index)} className="text-red-500 hover:text-red-700">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Bieur đồ trong  */}
                <div className="bg-white p-6 rounded-2xl shadow mt-6">
                    <h2 className="text-xl font-semibold mb-4">Tiến độ công việc hôm nay</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {/* Lịch */}
                <div className="bg-white p-6 rounded-2xl shadow mt-6">
                    <h2 className="text-xl font-semibold mb-4">📅 Lịch học tháng {new Date().getMonth() + 1}</h2>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d, i) => (
                            <div key={i} className="font-semibold text-gray-600">{d}</div>
                        ))}
                        {(() => {
                            const today = new Date();
                            const year = today.getFullYear();
                            const month = today.getMonth();
                            const firstDay = new Date(year, month, 1).getDay();
                            const daysInMonth = new Date(year, month + 1, 0).getDate();

                            const blanks = Array(firstDay).fill(null);
                            const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                            return [...blanks, ...days].map((day, idx) =>
                                day === null ? (
                                    <div key={idx}></div>
                                ) : (
                                    <div
                                        key={idx}
                                        className={`p-2 rounded-lg ${day === today.getDate()
                                            ? "bg-indigo-500 text-white font-bold"
                                            : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            }`}
                                    >
                                        {day}
                                    </div>
                                )
                            );
                        })()}
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate("/user/flashcards")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                >
                    <ArrowLeft className="w-4 h-4" /> Quay lại khóa học
                </button>
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

export default DashboardUser;
