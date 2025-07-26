import { useNavigate, useLocation } from "react-router-dom";
import {
    Home, FileText, Image, Layers, ClipboardList, Users,
    ShieldCheck, UploadCloud, Settings, BrainCircuit, BookOpen, Menu as MenuIcon
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className={`h-screen bg-slate-800 text-white flex flex-col justify-between transition-all duration-300 shadow-xl ${collapsed ? 'w-20' : 'w-64'}`}>

            {/* Header with Toggle */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-slate-700">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                    <ShieldCheck className="h-6 w-6 text-cyan-400" />
                    {!collapsed && <span className="text-xl font-bold">MickeAI</span>}
                </div>
                <MenuIcon
                    className="cursor-pointer hover:text-cyan-400"
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto px-2">
                <SidebarItem icon={<Home className="w-5 h-5" />} label="Dashboard" to="/user/dashboard" active={isActive("/user/dashboard")} collapsed={collapsed} />
                <SidebarSection title="" collapsed={collapsed}>
                    <SidebarItem icon={<ClipboardList className="w-5 h-5" />} label="Flashcards" to="/user/flashcards" active={isActive("/user/flashcards")} collapsed={collapsed} />
                    <SidebarItem icon={<Layers className="w-5 h-5" />} label="Mindmaps" to="/user/mindmaps" active={isActive("/user/mindmaps")} collapsed={collapsed} />
                    <SidebarItem icon={<BookOpen className="w-5 h-5" />} label="Quiz Generator" to="/user/quizs" active={isActive("/user/quizs")} collapsed={collapsed} />
                </SidebarSection>
                {/* <SidebarSection title=" Management" collapsed={collapsed}>
                    <SidebarItem
                        icon={<Users className="w-5 h-5" />}
                        label="Manage Users" to="/user/manage-users"
                        active={isActive("/user/manage-users")}
                        collapsed={collapsed}
                    />
                    <SidebarItem
                        icon={<UploadCloud className="w-5 h-5" />}
                        label="Input"
                        to="/user/input-upload"
                        active={isActive("/user/input-upload")}
                        collapsed={collapsed}
                    />
                    <SidebarItem
                        icon={<BrainCircuit className="w-5 h-5" />}
                        label="Output"
                        to="/user/generated-content"
                        active={isActive("/user/generated-content")}
                        collapsed={collapsed}
                    />
                </SidebarSection> */}
                <SidebarSection title="" collapsed={collapsed}>
                    <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" to="/user/settings" active={isActive("/user/settings")} collapsed={collapsed} />
                </SidebarSection>
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-700 px-4 py-4 text-center text-sm">
                {!collapsed && (
                    <a
                        href="https://github.com/kimmttrung/Hackathon2025_StudyMate"
                        target="_blank"
                        className="hover:text-blue-400 transition-all"
                    >
                        <img
                            src="/images/mickeAI.png"
                            alt="Micke AI"
                            className="w-36 h-48 align-content-center justify-content-center ml-10 "
                        />
                        💻 View on GitHub
                    </a>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

const SidebarItem = ({ icon, label, to, active, collapsed }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${active ? "bg-slate-700 text-cyan-400" : "hover:bg-slate-700"
                }`}
            onClick={() => navigate(to)}
        >
            {icon}
            {!collapsed && <span>{label}</span>}
        </div>
    );
};

const SidebarSection = ({ title, collapsed, children }) => {
    return (
        <div className="mt-3">
            {!collapsed && (
                <p className="text-xs text-gray-400 mb-1 px-4">{title}</p>
            )}
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    );
};

