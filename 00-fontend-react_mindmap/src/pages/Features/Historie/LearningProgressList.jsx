import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, BarChart3, Activity } from "lucide-react";
import { LearningSessionItem } from "./LearningSessionItem";

export function LearningProgressList({
    progress,
    folders,
    mindmaps,
    onViewDetail
}) {
    return (
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        Lịch sử học tập ({progress.length})
                    </span>
                    <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Xuất báo cáo
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {progress.map((item) => (
                        <LearningSessionItem
                            key={item.id}
                            progress={item}
                            folders={folders}
                            mindmaps={mindmaps}
                            onViewDetail={onViewDetail}
                        />
                    ))}

                    {progress.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Không tìm thấy lịch sử học tập phù hợp với bộ lọc</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
