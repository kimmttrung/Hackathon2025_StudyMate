// File: FilePickerButtons.jsx
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Image } from "lucide-react";

export default function FilePickerButtons({ onFileSelect, onImageSelect }) {
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageClick = () => {
        imageInputRef.current?.click();
    };

    return (
        <div className="flex items-center gap-2">
            {/* Nút chọn file */}
            <Button variant="ghost" size="sm" onClick={handleFileClick}>
                <Paperclip className="w-4 h-4" />
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => onFileSelect?.(e.target.files[0])}
                style={{ display: "none" }}
            />

            {/* Nút chọn ảnh */}
            <Button variant="ghost" size="sm" onClick={handleImageClick}>
                <Image className="w-4 h-4" />
            </Button>
            <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={(e) => onImageSelect?.(e.target.files[0])}
                style={{ display: "none" }}
            />
        </div>
    );
}
