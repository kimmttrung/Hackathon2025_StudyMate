import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { XCircle } from "lucide-react";

/**
 * @param {{ node, onChange, open, setOpen }} props
 */
export default function NodeEditor({ node, onChange, open, setOpen }) {
    const [title, setTitle] = useState(node?.title || "");
    const [note, setNote] = useState(node?.note || "");
    const [link, setLink] = useState(node?.link || "");
    const [image, setImage] = useState(node?.image || "");

    useEffect(() => {
        setTitle(node?.title || "");
        setNote(node?.note || "");
        setLink(node?.link || "");
        setImage(node?.image || "");
    }, [node?.id]);

    const submit = () => {
        if (!node) return setOpen(false);
        onChange({ ...node, title, note, link, image });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa node</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <label className="text-sm font-medium">Tiêu đề</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label className="text-sm font-medium">Mô tả</label>
                    <Textarea className="min-h-[120px]" value={note} onChange={(e) => setNote(e.target.value)} />

                    <label className="text-sm font-medium">Ảnh (URL)</label>
                    <Input placeholder="https://…" value={image} onChange={(e) => setImage(e.target.value)} />

                    <label className="text-sm font-medium">Liên kết</label>
                    <Input placeholder="https://…" value={link} onChange={(e) => setLink(e.target.value)} />

                    <div className="pt-2 flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            <XCircle className="mr-2 h-4 w-4" /> Hủy
                        </Button>
                        <Button onClick={submit}>Lưu</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
