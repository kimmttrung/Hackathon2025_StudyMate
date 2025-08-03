import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UploadImageCloudinary = ({ onFileSelect, resetTrigger }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null); // 👈 thêm ref

    // 👉 Reset component khi trigger thay đổi
    useEffect(() => {
        setFile(null);
        setPreviewUrl(null);
        setLoading(false);

        // 👇 reset input file thực sự
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [resetTrigger]);

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreviewUrl(URL.createObjectURL(selected));
            onFileSelect(selected); // thông báo cho parent
        }
    };

    return (
        <div className="space-y-3">
            <Label>Ảnh minh họa (upload Cloudinary):</Label>
            <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            {previewUrl && (
                <div className="flex justify-center">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-48 h-auto rounded shadow border"
                    />
                </div>
            )}
        </div>
    );
};

export default UploadImageCloudinary;
