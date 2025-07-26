import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Image,
    File,
    Type,
    Eye,
    Filter,
    Trash2,
    CheckCircle,
    Upload,
    ScanLine
} from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/components/lib/utils";
import Layout from "@/components/Layout";

export default function InputSettings() {
    const [supportedFormats, setSupportedFormats] = useState({
        pdf: true,
        word: true,
        image: true,
        text: true,
    });

    const [ocrSettings, setOCRSettings] = useState({
        autoOCR: true,
        language: "vi",
        confidence: 85,
    });

    const [contentFiltering, setContentFiltering] = useState({
        extractTitles: true,
        extractDefinitions: true,
        extractExamples: true,
        extractFormulas: true,
    });

    const [noiseThreshold, setNoiseThreshold] = useState(70);

    const fileFormats = [
        {
            key: "pdf",
            label: "PDF",
            description: "Tài liệu PDF có thể tìm kiếm và quét",
            icon: FileText,
            color: "text-red-600",
            extensions: [".pdf"]
        },
        {
            key: "word",
            label: "Microsoft Word",
            description: "Tệp .docx và .doc",
            icon: File,
            color: "text-blue-600",
            extensions: [".docx", ".doc"]
        },
        {
            key: "image",
            label: "Hình ảnh",
            description: "JPG, PNG, WebP với OCR tự động",
            icon: Image,
            color: "text-green-600",
            extensions: [".jpg", ".png", ".webp", ".jpeg"]
        },
        {
            key: "text",
            label: "Text thuần",
            description: "Tệp văn bản .txt và .md",
            icon: Type,
            color: "text-gray-600",
            extensions: [".txt", ".md"]
        },
    ];

    const contentTypes = [
        {
            key: "extractTitles",
            label: "Tiêu đề và đề mục",
            description: "Trích xuất các tiêu đề, đề mục chính",
            icon: Type
        },
        {
            key: "extractDefinitions",
            label: "Định nghĩa và khái niệm",
            description: "Tự động nhận diện các định nghĩa quan trọng",
            icon: Eye
        },
        {
            key: "extractExamples",
            label: "Ví dụ minh họa",
            description: "Tìm và trích xuất các ví dụ thực tế",
            icon: CheckCircle
        },
        {
            key: "extractFormulas",
            label: "Công thức và phương trình",
            description: "Nhận diện công thức toán học, hóa học",
            icon: Filter
        },
    ];

    const ocrLanguages = [
        { value: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
        { value: "en", label: "English", flag: "🇺🇸" },
        { value: "jp", label: "日本語", flag: "🇯🇵" },
        { value: "ko", label: "한국어", flag: "🇰🇷" },
        { value: "zh", label: "中文", flag: "🇨🇳" },
    ];

    const toggleFormat = (format) => {
        setSupportedFormats((prev) => ({
            ...prev,
            [format]: !prev[format]
        }));
    };

    const toggleContentFilter = (filter) => {
        setContentFiltering((prev) => ({
            ...prev,
            [filter]: !prev[filter]
        }));
    };


    return (
        <Layout>
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary" />
                        Cài đặt xử lý tài liệu
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Quản lý định dạng đầu vào, OCR và lọc nội dung thông minh
                    </p>
                </div>

                {/* Supported File Formats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Định dạng đầu vào hỗ trợ
                        </CardTitle>
                        <CardDescription>
                            Chọn các loại tệp bạn muốn xử lý
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {fileFormats.map((format) => {
                            const Icon = format.icon;
                            const isEnabled = supportedFormats[format.key];

                            return (
                                <div
                                    key={format.key}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-lg border-2 transition-all",
                                        isEnabled ? "border-primary bg-primary/5" : "border-muted"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn("p-2 rounded-lg bg-background border", isEnabled && "border-primary")}>
                                            <Icon className={`w-5 h-5 ${format.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">{format.label}</span>
                                                <div className="flex gap-1">
                                                    {format.extensions.map((ext) => (
                                                        <Badge key={ext} variant="outline" className="text-xs">
                                                            {ext}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{format.description}</p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={isEnabled}
                                        onCheckedChange={() => toggleFormat(format.key)}
                                    />
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* OCR Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ScanLine className="w-5 h-5" />
                            Cài đặt OCR (Nhận diện ký tự quang học)
                        </CardTitle>
                        <CardDescription>
                            Tùy chỉnh nhận diện văn bản từ hình ảnh
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Auto OCR Toggle */}
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">Tự động OCR khi tải ảnh</Label>
                                <p className="text-sm text-muted-foreground">
                                    Tự động nhận diện và trích xuất văn bản từ hình ảnh
                                </p>
                            </div>
                            <Switch
                                checked={ocrSettings.autoOCR}
                                onCheckedChange={(checked) => setOCRSettings(prev => ({ ...prev, autoOCR: checked }))}
                            />
                        </div>

                        <Separator />

                        {/* OCR Language */}
                        <div className="space-y-3">
                            <Label>Ngôn ngữ nhận diện chính</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {ocrLanguages.map((lang) => (
                                    <button
                                        key={lang.value}
                                        onClick={() => setOCRSettings(prev => ({ ...prev, language: lang.value }))}
                                        className={cn(
                                            "flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-sm",
                                            ocrSettings.language === lang.value
                                                ? "border-primary bg-primary/5"
                                                : "border-muted hover:border-primary/50"
                                        )}
                                    >
                                        <span>{lang.flag}</span>
                                        <span>{lang.label}</span>
                                        {ocrSettings.language === lang.value && (
                                            <CheckCircle className="w-4 h-4 text-primary ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* OCR Confidence */}
                        <div className="space-y-3">
                            <Label>Ngưỡng độ tin cậy: {ocrSettings.confidence}%</Label>
                            <Slider
                                value={[ocrSettings.confidence]}
                                onValueChange={([value]) => setOCRSettings(prev => ({ ...prev, confidence: value }))}
                                min={50}
                                max={100}
                                step={5}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>50% (Nhanh, ít chính xác)</span>
                                <span>100% (Chậm, rất chính xác)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content Filtering */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            Lọc nội dung thông minh
                        </CardTitle>
                        <CardDescription>
                            Chọn loại nội dung muốn trích xuất từ tài liệu
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {contentTypes.map((type) => {
                            const Icon = type.icon;
                            const isEnabled = contentFiltering[type.key];

                            return (
                                <div key={type.key} className="flex items-center space-x-3">
                                    <Checkbox
                                        id={type.key}
                                        checked={isEnabled}
                                        onCheckedChange={() => toggleContentFilter(type.key)}
                                    />
                                    <Label htmlFor={type.key} className="flex-1 cursor-pointer">
                                        <div className="flex items-start gap-3">
                                            <Icon className="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <div className="font-medium">{type.label}</div>
                                                <div className="text-sm text-muted-foreground">{type.description}</div>
                                            </div>
                                        </div>
                                    </Label>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Noise Filtering */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Trash2 className="w-5 h-5" />
                            Lọc nội dung thừa
                        </CardTitle>
                        <CardDescription>
                            Tự động loại bỏ header/footer, số trang và nội dung không cần thiết
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Label>Ngưỡng lọc nội dung thừa: {noiseThreshold}%</Label>
                            <p className="text-sm text-muted-foreground">
                                Mức độ tích cực trong việc loại bỏ nội dung không liên quan
                            </p>
                            <Slider
                                value={[noiseThreshold]}
                                onValueChange={([value]) => setNoiseThreshold(value)}
                                min={0}
                                max={100}
                                step={10}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>0% (Giữ tất cả)</span>
                                <span>100% (Lọc tích cực)</span>
                            </div>
                        </div>

                        <div className="bg-secondary/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Sẽ được loại bỏ:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Header và footer trang</li>
                                <li>• Số trang và watermark</li>
                                <li>• Trang trắng hoặc gần như trắng</li>
                                <li>• Mục lục và chỉ mục (tùy chọn)</li>
                                <li>• Quảng cáo và nội dung không liên quan</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button className="px-8">
                        Lưu cài đặt xử lý
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
