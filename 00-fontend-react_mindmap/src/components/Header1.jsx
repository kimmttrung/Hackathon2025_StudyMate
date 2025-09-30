import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { BrainCircuit, LayoutGrid, PlusCircle } from "lucide-react";
import { cn } from "./lib/utils";

export default function Header1() {
    const location = useLocation();
    const navigate = useNavigate();
    const onHome = location.pathname === "/";

    const navItems = useMemo(
        () => [
            { key: "my-maps", label: "Mindmap của tôi", action: () => navigate("/user/mindmaps") },
        ],
        [navigate],
    );

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between gap-4">
                <Link to="/user/mindmaps" className="group inline-flex items-center gap-2 font-bold text-lg">
                    <div className="relative">
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary to-accent blur-sm opacity-60 group-hover:opacity-80 transition" />
                        <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-background border shadow-sm">
                            <BrainCircuit className="h-5 w-5 text-primary" />
                        </div>
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AIMindmap</span>
                </Link>

                <nav className="hidden md:flex items-end gap-2 ml-auto">
                    {navItems.map((n) => (
                        <Button
                            key={n.key}
                            variant="ghost"
                            className={cn("text-sm", onHome ? "" : "opacity-90")}
                            onClick={n.action}
                        >
                            <LayoutGrid className="mr-2 h-4 w-4" /> {n.label}
                        </Button>
                    ))}
                </nav>

                {/* <div className="flex items-center gap-2">
                    <Button onClick={() => {
                        const mk = (title, color, children = []) => ({ id: crypto.randomUUID(), title, color, children });
                        const colors = ["#7c3aed", "#2563eb", "#059669", "#ea580c", "#db2777", "#0ea5e9"];
                        const map = {
                            version: 1,
                            layout: "central",
                            root: mk("Mindmap Demo", colors[0], [
                                mk("Ý chính 1", colors[1], [mk("Ý 1.1"), mk("Ý 1.2")]),
                                mk("Ý chính 2", colors[2], [mk("Ý 2.1"), mk("Ý 2.2")]),
                                mk("Ý chính 3", colors[3], [mk("Ý 3.1"), mk("Ý 3.2")]),
                            ]),
                        };
                        const payload = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(map)))));
                        navigate(`/editor?data=${payload}`);
                    }}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Tạo mới
                    </Button>
                </div> */}
            </div>
        </header>
    );
}
