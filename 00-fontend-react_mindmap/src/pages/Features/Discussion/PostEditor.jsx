import {
    Bold, Italic, Underline, Quote, Code, List, ListOrdered, Link as LinkIcon, Image, Eye, Type, Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PostEditor({
    content,
    setContent,
    isPreview,
    setIsPreview,
    fontSize,
    setFontSize,
    textColor,
    setTextColor,
    insertMarkdown,
    renderMarkdownPreview
}) {
    return (
        <div className="space-y-6">
            {/* Formatting Toolbar */}
            <Card className="border-cyan-200">
                <CardHeader className="pb-4 bg-gradient-to-r from-cyan-50 to-blue-50">
                    <CardTitle className="text-lg text-cyan-700 flex items-center gap-2">
                        <Type className="w-5 h-5" />
                        Công cụ định dạng
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {["bold", "italic", "underline", "quote", "code"].map((action) => (
                            <Button
                                key={action}
                                variant="outline"
                                size="sm"
                                onClick={() => insertMarkdown(action)}
                                className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300"
                            >
                                {{ bold: <Bold />, italic: <Italic />, underline: <Underline />, quote: <Quote />, code: <Code /> }[action]}
                            </Button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {["ul", "ol", "link", "image"].map((action) => (
                            <Button
                                key={action}
                                variant="outline"
                                size="sm"
                                onClick={() => insertMarkdown(action)}
                                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                            >
                                {{ ul: <List />, ol: <ListOrdered />, link: <LinkIcon />, image: <Image /> }[action]}
                            </Button>
                        ))}
                    </div>

                    <Separator />

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <Type className="w-4 h-4 text-cyan-600" />
                            <Select value={fontSize} onValueChange={setFontSize}>
                                <SelectTrigger className="w-20 border-cyan-200 focus:border-cyan-400">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {["12", "14", "16", "18", "20", "24"].map(size => (
                                        <SelectItem key={size} value={size}>{size}px</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-blue-600" />
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-8 h-8 border-2 border-blue-300 rounded cursor-pointer hover:border-blue-400"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Content Editor */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="content" className="text-sm font-medium text-cyan-700">
                        Nội dung bài viết
                    </Label>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsPreview(!isPreview)}
                        className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        {isPreview ? "Chỉnh sửa" : "Xem trước"}
                    </Button>
                </div>

                {isPreview ? (
                    <Card>
                        <CardContent className="p-6">
                            <div
                                className="prose max-w-none min-h-[500px]"
                                style={{ fontSize: `${fontSize}px`, color: textColor }}
                                dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(content) }}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Viết nội dung bài viết của bạn bằng Markdown..."
                        className="min-h-[470px] font-mono"
                        style={{ fontSize: `${fontSize}px`, color: textColor }}
                    />
                )}
            </div>
        </div>
    );
}
