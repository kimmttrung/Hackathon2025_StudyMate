import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Edit3, FileText } from "lucide-react";

export default function PostSidebar({
    userPosts,
    title,
    tags,
    content,
    fontSize,
    textColor,
    editingPostId,
    loadPostForEditing,
    renderMarkdownPreview
}) {
    return (
        <div className="space-y-6">
            {/* My Posts Management */}
            <Card className="border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Bài viết của tôi
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto hide-scrollbar">
                        {userPosts.map((post) => (
                            <div
                                key={post.id}
                                className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-cyan-50 hover:border-cyan-200 ${editingPostId === post.id
                                    ? "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-300"
                                    : "border-gray-200"
                                    }`}
                                onClick={() => loadPostForEditing(post)}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 truncate mb-1">{post.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.createdAt}
                                            </div>
                                            <Badge
                                                variant={post.status === "published" ? "default" : "secondary"}
                                                className={`text-xs ${post.status === "published"
                                                    ? "bg-cyan-600 hover:bg-cyan-700"
                                                    : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                {post.status === "published" ? "Đã đăng" : "Nháp"}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    #{tag}
                                                </Badge>
                                            ))}
                                            {post.tags.length > 2 && (
                                                <span className="text-xs text-gray-500">+{post.tags.length - 2}</span>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            loadPostForEditing(post);
                                        }}
                                    >
                                        <Edit3 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Post Preview */}
            <Card className="h-fit border-cyan-200">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
                    <CardTitle className="text-cyan-700">Xem trước bài viết</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">{title || "Tiêu đề bài viết"}</h2>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>

                        <div
                            className="prose max-w-none text-gray-700 border rounded p-4 bg-gray-50 max-h-[600px] overflow-y-auto hide-scrollbar"
                            style={{ fontSize: `${fontSize}px`, color: textColor }}
                            dangerouslySetInnerHTML={{
                                __html: renderMarkdownPreview(content || "Nội dung bài viết sẽ hiển thị ở đây...")
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
