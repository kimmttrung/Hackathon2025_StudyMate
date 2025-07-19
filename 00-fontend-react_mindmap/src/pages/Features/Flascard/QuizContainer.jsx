// 📁 src/components/QuizContainer.jsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Target } from "lucide-react";

export function QuizContainer({ testTypes, onBack }) {
    return (
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Chọn loại bài kiểm tra</h2>
            {/* Nút quay lại */}
            <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={onBack}
            >
                <ArrowLeft className="w-4 h-4" />
                Quay lại chọn thư mục
            </Button>
            <div className="space-y-4">
                {testTypes.map((test) => {
                    const IconComponent = test.icon;
                    return (
                        <Card
                            key={test.id}
                            className="group cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg border-2 hover:border-test/50"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-test/20 flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="w-6 h-6 text-test-foreground" />
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">
                                                    {test.name}
                                                </h3>
                                                <p className="text-muted-foreground text-sm">
                                                    {test.description}
                                                </p>
                                            </div>
                                            <Badge className={test.color}>
                                                {test.difficulty}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{test.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Target className="w-4 h-4" />
                                                <span>{test.questions} câu hỏi</span>
                                            </div>
                                        </div>

                                        <Button
                                            className="bg-test hover:bg-test/90 text-test-foreground"
                                            size="sm"
                                        >
                                            Bắt đầu kiểm tra
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
