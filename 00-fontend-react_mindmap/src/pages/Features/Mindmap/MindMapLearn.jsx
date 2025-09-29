import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrainCircuit, FileUp, Rocket, Sparkles, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LS_KEY = "aimindmap.history.v1";

export default function MindMapLearn() {
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [topic, setTopic] = useState("study");
    const [history, setHistory] = useState([]);
    const fileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                setHistory(parsed.sort((a, b) => b.createdAt - a.createdAt));
            } catch { }
        }
    }, []);

    const recent = useMemo(() => history.slice(0, 8), [history]);

    const handleUpload = async (file) => {
        if (file.type.startsWith("text/")) {
            const content = await file.text();
            setText((prev) => (prev ? prev + "\n\n" : "") + content);
            toast.success("Đã nhập nội dung từ tệp văn bản");
            return;
        }
        toast.error("Hiện chỉ hỗ trợ tệp .txt. PDF/DOCX/Ảnh sẽ được thêm sau.");
    };

    const onGenerate = () => {
        const source = text.trim() || link.trim();
        if (!source) {
            toast.error("Hãy nhập văn bản hoặc dán liên kết");
            return;
        }
        const map = buildMindmapFromText(source, topic);
        const id = crypto.randomUUID();
        const item = {
            id,
            title: map.root.title,
            createdAt: Date.now(),
            topic,
            data: map,
        };
        const next = [item, ...history].slice(0, 50);
        setHistory(next);
        localStorage.setItem(LS_KEY, JSON.stringify(next));
        const payload = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(map)))));
        navigate(`/editor?data=${payload}`);
    };

    const onDemo = () => {
        const map = buildDemoMindmap();
        const id = crypto.randomUUID();
        const item = { id, title: map.root.title, createdAt: Date.now(), topic: "demo", data: map };
        const next = [item, ...history].slice(0, 50);
        setHistory(next);
        localStorage.setItem(LS_KEY, JSON.stringify(next));
        const payload = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(map)))));
        navigate(`/editor?data=${payload}`);
    };

    return (
        <Layout>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent" />
                <div className="container py-16 md:py-24">
                    <div className="grid gap-10 md:grid-cols-2 md:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm">
                                <Sparkles className="h-3.5 w-3.5 text-primary" /> Website Tạo Mindmap từ AI
                            </div>
                            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                                Biến ý tưởng thành Mindmap đẹp chỉ trong vài giây
                            </h1>
                            <p className="mt-4 text-muted-foreground max-w-prose">
                                Tải tệp, dán văn bản hoặc liên kết. AI sẽ phân tích, tạo sơ đồ tư duy rõ ràng, dễ chỉnh sửa và chia sẻ.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button size="lg" onClick={() => document.getElementById("create-zone")?.scrollIntoView({ behavior: "smooth" })}>
                                    <Rocket className="mr-2 h-5 w-5" /> Bắt đầu ngay
                                </Button>
                                <Button size="lg" variant="outline" onClick={() => fileRef.current?.click()}>
                                    <Upload className="mr-2 h-5 w-5" /> Tải tệp
                                </Button>
                                <Button size="lg" variant="secondary" onClick={() => onDemo()}>
                                    <Sparkles className="mr-2 h-5 w-5" /> Tạo demo
                                </Button>
                                <Button size="lg" variant="ghost" asChild>
                                    <a href="/history">Xem lịch sử</a>
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-6 -z-10 bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl rounded-full" />
                            <div className="rounded-xl border bg-card shadow-xl p-6">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary">
                                        <BrainCircuit className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Bản xem nhanh</p>
                                        <p className="font-medium">Trình soạn Mindmap</p>
                                    </div>
                                </div>
                                <img src="/placeholder.svg" alt="preview" className="mt-4 rounded-md border" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="create-zone" className="container py-10">
                <div className="rounded-2xl border bg-card shadow-sm p-6">
                    <h2 className="text-xl font-semibold">Tạo mindmap mới</h2>
                    <p className="text-sm text-muted-foreground mt-1">Upload tệp hoặc nhập nội dung để AI sinh mindmap</p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                            <label className="text-sm font-medium">Tải tệp (TXT, …)</label>
                            <div className="flex items-center gap-3">
                                <Input type="file" ref={fileRef} onChange={(e) => e.target.files && handleUpload(e.target.files[0])} />
                                <Button variant="secondary" onClick={() => fileRef.current?.click()}>
                                    <FileUp className="mr-2 h-4 w-4" /> Chọn tệp
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">PDF/DOCX/Ảnh sẽ hỗ trợ ở phiên bản sau.</p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Dán liên kết</label>
                            <div className="flex items-center gap-3">
                                <Input placeholder="https://…" value={link} onChange={(e) => setLink(e.target.value)} />
                                <Button variant="outline" onClick={() => setLink("")}>Xóa</Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <label className="text-sm font-medium">Hoặc nhập văn bản</label>
                        <textarea
                            className="w-full min-h-[140px] rounded-md border bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Dán nội dung, gạch đầu dòng, đề cương…"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Chủ đề</label>
                            <Select value={topic} onValueChange={setTopic}>
                                <SelectTrigger className="w-full"><SelectValue placeholder="Chọn chủ đề" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="study">Học tập</SelectItem>
                                    <SelectItem value="business">Kinh doanh</SelectItem>
                                    <SelectItem value="personal">Lập kế hoạch cá nhân</SelectItem>
                                    <SelectItem value="project">Quản lý dự án</SelectItem>
                                    <SelectItem value="brainstorm">Brainstorm</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="md:col-span-2 flex flex-wrap items-end justify-end gap-3">
                            <Button size="lg" onClick={onGenerate}>
                                <Sparkles className="mr-2 h-5 w-5" /> Sinh mindmap bằng AI
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => onDemo()}>
                                Demo nhanh
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

function buildMindmapFromText(text, topic) {
    const title = inferTitle(text) || topicTitle(topic);
    const bullets = extractBullets(text);
    const children = bullets.slice(0, 12).map((b, i) => ({
        id: crypto.randomUUID(),
        title: capitalize(b),
        color: colorByIndex(i),
        children: [],
    }));
    return {
        version: 1,
        layout: "central",
        root: { id: crypto.randomUUID(), title, children, color: "" },
    };
}

function extractBullets(input) {
    return input
        .split(/\n|\.|;|\-|•|\*/)
        .map((s) => s.trim())
        .filter(Boolean);
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function topicTitle(t) {
    switch (t) {
        case "study": return "Sơ đồ học tập";
        case "business": return "Kế hoạch kinh doanh";
        case "personal": return "Kế hoạch cá nhân";
        case "project": return "Quản lý dự án";
        case "brainstorm": return "Brainstorm ý tưởng";
        default: return "Mindmap mới";
    }
}
function colorByIndex(i) {
    const palette = ["#6d28d9", "#2563eb", "#059669", "#ea580c", "#db2777", "#0ea5e9", "#84cc16", "#f59e0b", "#ef4444", "#14b8a6", "#9333ea", "#1d4ed8"];
    return palette[i % palette.length];
}

function buildDemoMindmap() {
    const rootId = crypto.randomUUID();
    const mk = (title, color, children = []) => ({ id: crypto.randomUUID(), title, color, children });
    const colors = ["#7c3aed", "#2563eb", "#059669", "#ea580c", "#db2777", "#0ea5e9"];
    const map = {
        version: 1,
        layout: "central",
        root: {
            id: rootId,
            title: "Kế hoạch Học tập 2025",
            color: colors[0],
            children: [
                mk("Mục tiêu", colors[1], [mk("Điểm cao"), mk("Kỹ năng"), mk("Chứng chỉ")]),
                mk("Lịch trình", colors[2], [mk("Tuần"), mk("Tháng"), mk("Quý")]),
                mk("Nguồn lực", colors[3], [mk("Sách"), mk("Khóa học"), mk("Mentor")]),
                mk("Phương pháp", colors[4], [mk("Pomodoro"), mk("Feynman"), mk("Flashcard")]),
                mk("Đánh giá", colors[5], [mk("Quiz"), mk("Dự án"), mk("Thi thử")]),
            ],
        },
    };
    return map;
}
