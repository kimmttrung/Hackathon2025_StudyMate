import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye, PlusCircle } from "lucide-react";
import Layout1 from "@/components/Layout1";

const LS_KEY = "aimindmap.history.v1";

export default function HistoryMindMap() {
    const [items, setItems] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
            try {
                setItems(JSON.parse(raw));
            } catch { }
        }
    }, []);

    const saveItems = (list) => {
        setItems(list);
        localStorage.setItem(LS_KEY, JSON.stringify(list));
    };

    const createNew = () => {
        if (!newTitle.trim()) return;

        const newItem = {
            id: Date.now().toString(),
            title: newTitle,
            createdAt: Date.now(),
            data: {} // bạn có thể thêm template mặc định
        };

        saveItems([newItem, ...items]);
        setNewTitle("");
        setShowCreate(false);
    };

    const remove = (id) => saveItems(items.filter((x) => x.id !== id));

    return (
        <Layout1>
            <div className="container py-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Mindmap của tôi</h1>
                    <Button variant="secondary" onClick={() => setShowCreate(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Tạo mới
                    </Button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((it) => (
                        <Card key={it.id} className="overflow-hidden">
                            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10" />
                            <div className="p-3">
                                <div className="font-medium truncate" title={it.title}>{it.title}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {new Date(it.createdAt).toLocaleString()}
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <Button size="sm" onClick={() => navigate(`/user/mindmaps/history/${it.id}`)}>
                                        <Eye className="mr-2 h-4 w-4" /> Mở
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => remove(it.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Xóa
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {items.length === 0 && (
                        <div className="col-span-full text-sm text-muted-foreground">
                            Chưa có lịch sử. Tạo mindmap mới để lưu tại đây.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal tạo mới */}
            <Dialog open={showCreate} onOpenChange={setShowCreate}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tạo mindmap mới</DialogTitle>
                    </DialogHeader>
                    <Input placeholder="Nhập tên mindmap..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <div className="flex justify-end gap-2 mt-3">
                        <Button variant="outline" onClick={() => setShowCreate(false)}>Hủy</Button>
                        <Button onClick={createNew}>Tạo</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Layout1>
    );
}
