import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Download, GitBranchPlus, Link2, Maximize, Minimize, Moon, Pin, PinOff, Play, Save, Sparkles, Sun, Type, XCircle, Palette, ListOrdered, GitBranch, Undo2 } from "lucide-react";
import MindCanvas from "./MindCanvas";
import Layout1 from "@/components/Layout1";

/**
 * @typedef {Object} MindNode
 * @property {string} id
 * @property {string} title
 * @property {string} [color]
 * @property {string} [emoji]
 * @property {boolean} [pinned]
 * @property {number} [x]
 * @property {number} [y]
 * @property {string} [note]
 * @property {string} [link]
 * @property {string} [image]
 * @property {MindNode[]} children
 *
 * @typedef {Object} Mindmap
 * @property {number} version
 * @property {"central"|"radial"|"tree"|"org"} layout
 * @property {MindNode} root
 */

const LS_KEY = "aimindmap.history.v1";

/**
 * Main editor — keeps AI helpers, node editor & app-level state.
 */
export default function MindmapEditor() {
    const params = new URLSearchParams(window.location.search);
    const [map, setMap] = useState(null);
    const [selected, setSelected] = useState(null);
    const [themeDark, setThemeDark] = useState(false);
    const [presenting, setPresenting] = useState(false);
    const [flashcard, setFlashcard] = useState(false);
    const [past, setPast] = useState([]);
    const [future, setFuture] = useState([]);

    useEffect(() => {
        const raw = params.get("data");
        if (raw) {
            try {
                const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
                setMap(json);
            } catch (e) {
                toast.error("Không đọc được dữ liệu mindmap");
            }
        } else {
            // default example
            setMap({
                version: 1,
                layout: "central",
                root: {
                    id: crypto?.randomUUID?.() || Math.random().toString(36).slice(2),
                    title: "Kế hoạch Học tập",
                    children: [
                        { id: crypto?.randomUUID?.() || "a1", title: "Mục tiêu", children: [] },
                        { id: crypto?.randomUUID?.() || "a2", title: "Nguồn lực", children: [] },
                        { id: crypto?.randomUUID?.() || "a3", title: "Phương pháp", children: [] }
                    ]
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", themeDark);
    }, [themeDark]);

    const { nodes, edges } = useMemo(() => (map ? computeLayout(map) : { nodes: [], edges: [] }), [map]);
    const posMap = useMemo(() => Object.fromEntries(nodes.map(n => [n.id, { x: n.x || 0, y: n.y || 0 }])), [nodes]);
    const selectedNode = useMemo(() => nodes.find(n => n.id === selected), [nodes, selected]);

    const updateMap = (fn) => {
        setMap((curr) => {
            if (!curr) return curr;
            const prev = curr;
            const next = fn(structuredClone(curr));
            setPast((p) => [...p.slice(-49), prev]);
            setFuture([]);
            return next;
        });
    };

    const undo = () => {
        setPast((p) => {
            if (!map || p.length === 0) return p;
            const prev = p[p.length - 1];
            setFuture((f) => [map, ...f]);
            setMap(prev);
            return p.slice(0, -1);
        });
    };
    const redo = () => {
        setFuture((f) => {
            if (!map || f.length === 0) return f;
            const next = f[0];
            setPast((p) => [...p, map]);
            setMap(next);
            return f.slice(1);
        });
    };

    useEffect(() => {
        const onKey = (e) => {
            const k = e.key.toLowerCase();
            if ((e.ctrlKey || e.metaKey) && k === "z") { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
            if ((e.ctrlKey || e.metaKey) && k === "y") { e.preventDefault(); redo(); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    const save = () => {
        if (!map) return;
        const item = { id: crypto?.randomUUID?.(), title: map.root.title, createdAt: Date.now(), topic: "custom", data: map };
        const raw = localStorage.getItem(LS_KEY);
        const list = raw ? (JSON.parse(raw)) : [];
        localStorage.setItem(LS_KEY, JSON.stringify([item, ...list].slice(0, 50)));
        toast.success("Đã lưu vào tài khoản (local)");
    };

    const exportSVG = () => {
        const svg = document.getElementById("mindmap-svg");
        if (!svg) return;
        const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        download(url, `${map?.root.title || "mindmap"}.svg`);
        URL.revokeObjectURL(url);
    };

    const exportPNG = async () => {
        const svg = document.getElementById("mindmap-svg");
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        await new Promise((res) => {
            img.onload = () => res();
            img.src = url;
        });
        const canvas = document.createElement("canvas");
        const bbox = svg.getBBox();
        canvas.width = Math.ceil(bbox.width + 100);
        canvas.height = Math.ceil(bbox.height + 100);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--background") || "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 50 - bbox.x, 50 - bbox.y);
        canvas.toBlob((png) => {
            if (!png) return;
            const purl = URL.createObjectURL(png);
            download(purl, `${map?.root.title || "mindmap"}.png`);
            URL.revokeObjectURL(purl);
            URL.revokeObjectURL(url);
        });
    };

    const exportOPML = () => {
        if (!map) return;
        const xml = `<?xml version="1.0"?>\n<opml version="2.0"><body>${opmlFromNode(map.root)}</body></opml>`;
        const url = URL.createObjectURL(new Blob([xml], { type: "text/xml" }));
        download(url, `${map.root.title}.opml`);
        URL.revokeObjectURL(url);
    };

    const exportJSON = () => {
        if (!map) return;
        const url = URL.createObjectURL(new Blob([JSON.stringify(map, null, 2)], { type: "application/json" }));
        download(url, `${map.root.title}.mmap.json`);
        URL.revokeObjectURL(url);
    };

    const share = () => {
        if (!map) return;
        const payload = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(map)))));
        const url = `${window.location.origin}/editor?data=${payload}`;
        navigator.clipboard.writeText(url);
        toast.success("Đã sao chép liên kết chia sẻ");
    };

    // AI helpers (deterministic placeholders) — keep them here
    const aiExpand = (root, id) => {
        const node = find(root, id); if (!node) return root;
        const seeds = keywordExpand(node.title);
        node.children.push(...seeds.map((s) => ({ id: crypto?.randomUUID?.() || Math.random().toString(36).slice(2), title: s, children: [] })));
        return structuredClone(root);
    };
    const aiSummarize = (root, id) => {
        const node = find(root, id); if (!node) return root;
        if (node.children.length < 2) return root;
        node.title = summarizeTitles(node.children.map((c) => c.title));
        node.children = [];
        return structuredClone(root);
    };
    const aiSuggest = (root) => {
        const pool = ["Mục tiêu", "Nguồn lực", "Thời gian", "Rủi ro", "Giải pháp", "Ví dụ", "Bước thực hiện", "Kiểm thử", "Đánh giá", "Mở rộng"];
        const leafs = flatten(root).filter((n) => n.children.length === 0);
        if (leafs.length === 0) return root;
        const pick = leafs[Math.floor(Math.random() * leafs.length)];
        pick.children.push(...pool.slice(0, 3).map((t) => ({ id: crypto?.randomUUID?.() || Math.random().toString(36).slice(2), title: t, children: [] })));
        return structuredClone(root);
    };

    // Top bar + layout + left toolbar + right AI panel + overlays (NodeEditor, Presenter, Flashcards)
    return (
        <Layout1>
            {/* Top bar */}
            <div className="border-b bg-background">
                <div className="container h-14 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="font-semibold truncate">{map?.root.title || "Mindmap"}</span>
                        <div className="hidden md:flex items-center gap-2 ml-4">
                            <Select value={map?.layout || "central"} onValueChange={(v) => updateMap((m) => ({ ...m, layout: v }))}>
                                <SelectTrigger className="h-8 w-[160px]"><SelectValue placeholder="Chế độ xem" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tree">Dạng Cây</SelectItem>
                                    <SelectItem value="central">Trung tâm</SelectItem>
                                    <SelectItem value="radial">Radial</SelectItem>
                                    <SelectItem value="org">Org-chart</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={undo} title="Hoàn tác"><Undo2 className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => redo()} title="Làm lại">↻</Button>
                        {/* <Button size="sm" variant="ghost" onClick={() => setThemeDark((v) => !v)}>{themeDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button> */}
                        <Button size="sm" variant="outline" onClick={save}><Save className="mr-2 h-4 w-4" />Lưu</Button>
                        <Button size="sm" variant="outline" onClick={exportPNG}><Download className="mr-2 h-4 w-4" />PNG</Button>
                        <Button size="sm" variant="outline" onClick={exportSVG}>SVG</Button>
                        <Button size="sm" variant="outline" onClick={exportOPML}>OPML</Button>
                        <Button size="sm" variant="outline" onClick={exportJSON}>.MMAP</Button>
                        <Button size="sm" onClick={share}><Link2 className="mr-2 h-4 w-4" />Chia sẻ</Button>
                        <Button size="sm" variant={presenting ? "secondary" : "default"} onClick={() => setPresenting((v) => !v)}><Play className="mr-2 h-4 w-4" />Trình chiếu</Button>
                    </div>
                </div>
            </div>

            {/* Editor area */}
            <div className="grid grid-cols-[64px_1fr_320px] gap-0 min-h-[calc(100vh-3.5rem-4rem)]">
                {/* Left toolbar */}
                <div className="border-r bg-secondary/30 p-2 flex flex-col items-center gap-2">
                    <ToolButton icon={<GitBranchPlus className="h-4 w-4" />} label="Thêm node con" onClick={() => selected && updateMap((m) => ({ ...m, root: addChild(m.root, selected) }))} />
                    <ToolButton icon={<Type className="h-4 w-4" />} label="Icon/Emoji" onClick={() => selected && updateMap((m) => ({ ...m, root: addEmoji(m.root, selected) }))} />
                    <ColorTool selected={selected} onPick={(color) => selected && updateMap((m) => ({ ...m, root: setColor(m.root, selected, color) }))} />
                    <ToolButton icon={<Pin className="h-4 w-4" />} label="Ghim node" onClick={() => selected && updateMap((m) => ({ ...m, root: togglePin(m.root, selected, true) }))} />
                    <ToolButton icon={<PinOff className="h-4 w-4" />} label="Bỏ ghim" onClick={() => selected && updateMap((m) => ({ ...m, root: togglePin(m.root, selected, false) }))} />
                    <ToolButton icon={<ListOrdered className="h-4 w-4" />} label="Sắp xếp theo câu" onClick={() => selected && updateMap((m) => ({ ...m, root: sortBySentence(m.root, selected) }))} />
                    <ToolButton icon={<GitBranch className="h-4 w-4" />} label="Sắp xếp theo hàng nối" onClick={() => selected && updateMap((m) => ({ ...m, root: sortByLinks(m.root, selected, posMap) }))} />
                </div>

                {/* Canvas */}
                <MindCanvas
                    map={map}
                    setMap={setMap}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
                    setSelected={setSelected}
                />

                {/* Right AI Panel */}
                <div className="border-l p-3">
                    <h3 className="font-semibold">AI hỗ trợ chỉnh sửa</h3>
                    <div className="space-y-2 mt-3">
                        <Button className="w-full justify-start" variant="secondary" onClick={() => selected && setMap((m) => m ? { ...m, root: aiExpand(m.root, selected) } : m)}>
                            <Sparkles className="mr-2 h-4 w-4" /> Mở rộng nhánh này
                        </Button>
                        <Button className="w-full justify-start" variant="secondary" onClick={() => selected && setMap((m) => m ? { ...m, root: aiSummarize(m.root, selected) } : m)}>
                            <Sparkles className="mr-2 h-4 w-4" /> Tóm tắt / Rút gọn
                        </Button>
                        <Button className="w-full justify-start" variant="secondary" onClick={() => setMap((m) => m ? { ...m, root: aiSuggest(m.root) } : m)}>
                            <Sparkles className="mr-2 h-4 w-4" /> Gợi ý thêm ý tưởng
                        </Button>
                        <Button className="w-full justify-start" variant="secondary" onClick={() => setFlashcard(true)}>
                            <Sparkles className="mr-2 h-4 w-4" /> Chuyển thành flashcard
                        </Button>
                    </div>
                </div>
            </div>

            {/* overlays */}
            {presenting && <Presenter nodes={nodes} onClose={() => setPresenting(false)} />}
            {selectedNode && <NodeEditor node={selectedNode} onChange={(n) => setMap((m) => m ? { ...m, root: updateNode(m.root, n) } : m)} />}
            {flashcard && map && <FlashcardOverlay root={map.root} onClose={() => setFlashcard(false)} />}
        </Layout1>
    );
}

/* ----------------- small components used above ----------------- */

function download(url, name) {
    const a = document.createElement("a");
    a.href = url; a.download = name; a.click();
}

/* ToolButton */
function ToolButton({ icon, label, onClick }) {
    return (
        <Button variant="ghost" className="h-10 w-10 p-0 flex flex-col items-center justify-center" onClick={onClick} title={label}>
            {icon}
            <span className="sr-only">{label}</span>
        </Button>
    );
}

/* ColorTool */
function ColorTool({ selected, onPick }) {
    const COLORS = ["#111827", "#6d28d9", "#7c3aed", "#a855f7", "#6366f1", "#2563eb", "#0ea5e9", "#22d3ee", "#14b8a6", "#10b981", "#059669", "#84cc16", "#65a30d", "#f59e0b", "#ea580c", "#ef4444", "#f43f5e", "#db2777", "#e11d48", "#9333ea", "#1d4ed8", "#06b6d4", "#34d399"];
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 p-0" title="Màu sắc"><Palette className="h-4 w-4" /></Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[220px]">
                <div className="grid grid-cols-8 gap-2">
                    {COLORS.map((c) => (
                        <button key={c} onClick={() => onPick(c)} className="h-6 w-6 rounded-full border" style={{ background: c }} aria-label={c} />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

/* NodeEditor - dialog */
function NodeEditor({ node, onChange }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(node.title);
    const [note, setNote] = useState(node.note || "");
    const [link, setLink] = useState(node.link || "");
    const [image, setImage] = useState(node.image || "");

    useEffect(() => {
        setOpen(true);
    }, [node.id]);

    useEffect(() => {
        setTitle(node.title); setNote(node.note || ""); setLink(node.link || ""); setImage(node.image || "");
    }, [node]);

    const submit = () => {
        onChange({ ...node, title, note, link, image });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader><DialogTitle>Chỉnh sửa node</DialogTitle></DialogHeader>
                <div className="space-y-3">
                    <label className="text-sm font-medium">Tiêu đề</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label className="text-sm font-medium">Mô tả</label>
                    <textarea className="w-full min-h-[120px] rounded-md border bg-background p-2 text-sm" value={note} onChange={(e) => setNote(e.target.value)} />
                    <label className="text-sm font-medium">Ảnh (URL)</label>
                    <Input placeholder="https://…" value={image} onChange={(e) => setImage(e.target.value)} />
                    <label className="text-sm font-medium">Liên kết</label>
                    <Input placeholder="https://…" value={link} onChange={(e) => setLink(e.target.value)} />
                    <div className="pt-2 flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setOpen(false)}><XCircle className="mr-2 h-4 w-4" /> Hủy</Button>
                        <Button onClick={submit}>Lưu</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

/* Presenter */
function Presenter({ nodes, onClose }) {
    const [i, setI] = useState(0);
    const ordered = nodes;
    const n = ordered[i];
    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur grid place-items-center p-6">
            <Card className="w-full max-w-3xl p-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Trình chiếu node {i + 1}/{ordered.length}</span>
                    <Button variant="ghost" onClick={onClose}>Đóng</Button>
                </div>
                <div className="text-3xl font-bold">{n?.title}</div>
                {n?.note && <p className="mt-4 text-muted-foreground whitespace-pre-wrap">{n.note}</p>}
                <div className="mt-6 flex items-center justify-between">
                    <Button variant="outline" onClick={() => setI((x) => Math.max(0, x - 1))}>Trước</Button>
                    <Button onClick={() => setI((x) => Math.min(ordered.length - 1, x + 1))}>Tiếp</Button>
                </div>
            </Card>
        </div>
    );
}

/* FlashcardOverlay */
function FlashcardOverlay({ root, onClose }) {
    const cards = flatten(root).map((n) => ({ q: n.title, a: (n.note || "").trim() || `Giải thích cho: ${n.title}` }));
    const [i, setI] = useState(0);
    const [showA, setShowA] = useState(false);
    return (
        <div className="fixed inset-0 z-50 bg-background/95">
            <div className="container py-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Flashcard ({i + 1}/{cards.length})</h3>
                    <Button variant="ghost" onClick={onClose}>Đóng</Button>
                </div>
                <div className="mt-8 grid place-items-center">
                    <Card className="w-full max-w-2xl p-8 min-h-[260px] grid">
                        <div>
                            <div className="text-sm text-muted-foreground">Câu hỏi</div>
                            <div className="text-2xl font-bold">{cards[i]?.q}</div>
                        </div>
                        {showA && (
                            <div className="mt-6">
                                <div className="text-sm text-muted-foreground">Trả lời</div>
                                <div className="text-lg whitespace-pre-wrap">{cards[i]?.a}</div>
                            </div>
                        )}
                        <div className="mt-6 flex items-center justify-between self-end">
                            <Button variant="outline" onClick={() => { setI((x) => Math.max(0, x - 1)); setShowA(false); }}>Trước</Button>
                            <div className="flex items-center gap-2">
                                <Button variant="secondary" onClick={() => setShowA((v) => !v)}>{showA ? "Ẩn đáp án" : "Hiện đáp án"}</Button>
                                <Button onClick={() => { setI((x) => Math.min(cards.length - 1, x + 1)); setShowA(false); }}>Tiếp</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

/* ---------- Helpers: layout & mutations (kept same logic, converted to JS) ---------- */

function computeLayout(map) {
    const nodes = [];
    const edges = [];
    const root = structuredClone(map.root);
    const center = { x: -80, y: -24 };
    root.x = root.x ?? center.x; root.y = root.y ?? center.y;
    const spacingX = 220; const spacingY = 100;

    if (map.layout === "central" || map.layout === "radial") {
        root.children.forEach((c, idx) => {
            const angle = (idx / Math.max(1, root.children.length)) * Math.PI * 2;
            const r = 220;
            c.x = c.pinned ? c.x : root.x + Math.cos(angle) * r;
            c.y = c.pinned ? c.y : root.y + Math.sin(angle) * r;
            cascade(c, map.layout, 140);
        });
    } else {
        const levels = [];
        bfsLevels(root, levels);
        levels.forEach((level, i) => {
            level.forEach((n, j) => {
                if (n === root) return;
                n.x = n.pinned ? n.x : (map.layout === "org" ? root.x + i * spacingX : root.x + (i - 1) * spacingX);
                n.y = n.pinned ? n.y : root.y + (j - (level.length - 1) / 2) * spacingY;
            });
        });
    }

    walk(root, (n, parent) => { nodes.push(n); if (parent) edges.push({ from: parent, to: n }); });
    return { nodes, edges };
}
function cascade(node, layout, rBase) {
    node.children.forEach((c, i) => {
        const angle = (i / Math.max(1, node.children.length)) * Math.PI * 2;
        const r = rBase;
        c.x = c.pinned ? c.x : node.x + Math.cos(angle) * r;
        c.y = c.pinned ? c.y : node.y + Math.sin(angle) * r;
        cascade(c, layout, Math.max(80, rBase - 30));
    });
}
function bfsLevels(root, levels) {
    const q = [{ n: root, d: 0 }];
    while (q.length) {
        const { n, d } = q.shift();
        levels[d] = levels[d] || [];
        levels[d].push(n);
        n.children.forEach((c) => q.push({ n: c, d: d + 1 }));
    }
}
function walk(n, fn, p) { fn(n, p); n.children.forEach((c) => walk(c, fn, n)); }
function flatten(n) { const arr = []; walk(n, (x) => arr.push(x)); return arr; }
function find(n, id) { if (n.id === id) return n; for (const c of n.children) { const f = find(c, id); if (f) return f; } return null; }
function updateNode(root, next) { if (root.id === next.id) return { ...next, children: root.children }; return { ...root, children: root.children.map((c) => updateNode(c, next)) }; }
function addChild(root, parentId) {
    const node = find(root, parentId);
    if (!node) return root;
    const child = { id: crypto?.randomUUID?.() || Math.random().toString(36).slice(2), title: "Ý mới", children: [] };
    node.children.push(child);
    return structuredClone(root);
}
function changeColor(root, id) {
    const node = find(root, id); if (!node) return root;
    const palette = ["#6d28d9", "#2563eb", "#059669", "#ea580c", "#db2777", "#0ea5e9", "#84cc16", "#f59e0b", "#ef4444", "#14b8a6", "#9333ea", "#1d4ed8"];
    const idx = Math.floor(Math.random() * palette.length);
    node.color = palette[idx];
    return structuredClone(root);
}
function addEmoji(root, id) { const node = find(root, id); if (!node) return root; const list = ["🧠", "💡", "✅", "📌", "📚", "🚀", "🎯", "⚡️", "📈", "📝"]; node.emoji = list[Math.floor(Math.random() * list.length)]; return structuredClone(root); }
function togglePin(root, id, value) { const node = find(root, id); if (!node) return root; node.pinned = value; return structuredClone(root); }
function setNodePos(root, id, x, y) { const node = find(root, id); if (!node) return root; node.x = x; node.y = y; node.pinned = true; return structuredClone(root); }

function setColor(root, id, color) { const node = find(root, id); if (!node) return root; node.color = color; return structuredClone(root); }
function sortBySentence(root, id) { const node = find(root, id); if (!node) return root; node.children.sort((a, b) => a.title.localeCompare(b.title, 'vi') || a.title.length - b.title.length); return structuredClone(root); }
function sortByLinks(root, id, pos) { const node = find(root, id); if (!node) return root; const p = pos[id]; if (!p) return root; node.children.sort((a, b) => { const aa = Math.atan2((pos[a.id]?.y ?? 0) - p.y, (pos[a.id]?.x ?? 0) - p.x); const bb = Math.atan2((pos[b.id]?.y ?? 0) - p.y, (pos[b.id]?.x ?? 0) - p.x); return aa - bb; }); return structuredClone(root); }

/* AI helpers (small) */
function keywordExpand(title) { const base = title.toLowerCase(); const generic = ["Khái niệm", "Thành phần", "Quy trình", "Ưu nhược điểm", "Ứng dụng", "Ví dụ", "Công cụ", "Lộ trình"]; return generic.map((g) => `${g} ${title.split(" ")[0]}`); }
function summarizeTitles(arr) { const k = Array.from(new Set(arr.flatMap((s) => s.toLowerCase().split(/\s+/)).filter((w) => w.length > 3))).slice(0, 3); return `Tóm tắt: ${k.map(cap).join(", ")}`; }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function opmlFromNode(n) { const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); return `<outline text="${esc(n.title)}">${n.children.map(opmlFromNode).join("")}</outline>`; }
