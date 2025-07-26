import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Brain,
    Target,
    FileQuestion,
    CreditCard,
    Shuffle,
    Volume2,
    VolumeX,
    GitBranch,
    Layers,
    Zap
} from "lucide-react";
import { cn } from "@/components/lib/utils";
import Layout from "@/components/Layout";

export default function AISettings() {
    const [aiLevel, setAILevel] = useState("intermediate");
    const [learningGoals, setLearningGoals] = useState(["ielts", "vocabulary"]);
    const [questionStyle, setQuestionStyle] = useState("mixed");
    const [flashcardSettings, setFlashcardSettings] = useState({
        cardsPerSession: 20,
        shuffleMode: "smart",
        autoAudio: true,
    });
    const [mindmapSettings, setMindmapSettings] = useState({
        depth: 3,
        branches: 5,
    });

    const aiLevels = [
        {
            value: "basic",
            label: "Cơ bản",
            description: "Câu hỏi đơn giản, phù hợp với người mới bắt đầu",
            color: "bg-green-100 text-green-800"
        },
        {
            value: "intermediate",
            label: "Trung bình",
            description: "Câu hỏi có độ khó vừa phải, phù hợp với người đã có kiến thức cơ bản",
            color: "bg-blue-100 text-blue-800"
        },
        {
            value: "advanced",
            label: "Nâng cao",
            description: "Câu hỏi phức tạp, yêu cầu tư duy sâu và kiến thức rộng",
            color: "bg-purple-100 text-purple-800"
        },
    ];

    const goalOptions = [
        { value: "ielts", label: "Luyện thi IELTS", icon: Target },
        { value: "vocabulary", label: "Học từ vựng", icon: Brain },
        { value: "university", label: "Ôn thi đại học", icon: FileQuestion },
        { value: "business", label: "Tiếng Anh thương mại", icon: CreditCard },
        { value: "conversation", label: "Giao tiếp hàng ngày", icon: Volume2 },
        { value: "grammar", label: "Ngữ pháp", icon: Layers },
    ];

    const questionStyles = [
        { value: "multiple", label: "Trắc nghiệm", description: "Chọn đáp án đúng từ các lựa chọn" },
        { value: "essay", label: "Tự luận", description: "Trả lời bằng câu văn hoàn chỉnh" },
        { value: "mixed", label: "Kết hợp", description: "Xen kẽ giữa trắc nghiệm và tự luận" },
    ];

    const shuffleModes = [
        { value: "random", label: "Ngẫu nhiên", description: "Xáo trộn hoàn toàn ngẫu nhiên" },
        { value: "smart", label: "Thông minh", description: "Ưu tiên thẻ còn khó nhớ" },
        { value: "sequential", label: "Theo thứ tự", description: "Học theo thứ tự ban đầu" },
    ];

    const toggleGoal = (goal) => {
        setLearningGoals((prev) =>
            prev.includes(goal)
                ? prev.filter((g) => g !== goal)
                : [...prev, goal]
        );
    };

    return (
        <Layout title="Setting">
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <Brain className="w-8 h-8 text-primary" />
                        Cài đặt AI
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Tùy chỉnh mức độ thông minh và phong cách học tập của AI
                    </p>
                </div>

                {/* AI Intelligence Level */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Mức độ thông minh của AI
                        </CardTitle>
                        <CardDescription>
                            Chọn độ phức tạp của câu hỏi và bài tập được tạo ra
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup value={aiLevel} onValueChange={setAILevel} className="space-y-4">
                            {aiLevels.map((level) => (
                                <div key={level.value} className="relative">
                                    <RadioGroupItem
                                        value={level.value}
                                        id={level.value}
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={level.value}
                                        className={cn(
                                            "flex items-start gap-4 rounded-lg border-2 border-muted p-4 hover:bg-accent cursor-pointer transition-all",
                                            aiLevel === level.value && "border-primary bg-accent"
                                        )}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">{level.label}</span>
                                                <Badge className={level.color}>{level.label}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{level.description}</p>
                                        </div>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* Learning Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Mục tiêu học tập
                        </CardTitle>
                        <CardDescription>
                            Chọn một hoặc nhiều mục tiêu học tập để AI tối ưu hóa nội dung
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {goalOptions.map((goal) => {
                                const Icon = goal.icon;
                                const isSelected = learningGoals.includes(goal.value);

                                return (
                                    <button
                                        key={goal.value}
                                        onClick={() => toggleGoal(goal.value)}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg border-2 border-muted hover:bg-accent text-left transition-all",
                                            isSelected && "border-primary bg-accent"
                                        )}
                                    >
                                        <Icon className="w-5 h-5 text-primary" />
                                        <span className="font-medium">{goal.label}</span>
                                        {isSelected && (
                                            <Badge variant="default" className="ml-auto">✓</Badge>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Question Style */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileQuestion className="w-5 h-5" />
                            Phong cách câu hỏi
                        </CardTitle>
                        <CardDescription>
                            Chọn kiểu câu hỏi ưa thích
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup value={questionStyle} onValueChange={setQuestionStyle} className="space-y-3">
                            {questionStyles.map((style) => (
                                <div key={style.value} className="flex items-center space-x-3">
                                    <RadioGroupItem value={style.value} id={style.value} />
                                    <Label htmlFor={style.value} className="flex-1 cursor-pointer">
                                        <div>
                                            <div className="font-medium">{style.label}</div>
                                            <div className="text-sm text-muted-foreground">{style.description}</div>
                                        </div>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>

                {/* Flashcard Customization */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Tùy chỉnh flashcard
                        </CardTitle>
                        <CardDescription>
                            Cài đặt số lượng thẻ và cách hiển thị
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Cards per session */}
                        <div className="space-y-3">
                            <Label>Số thẻ mỗi lần học: {flashcardSettings.cardsPerSession}</Label>
                            <Slider
                                value={[flashcardSettings.cardsPerSession]}
                                onValueChange={([value]) => setFlashcardSettings(prev => ({ ...prev, cardsPerSession: value }))}
                                min={5}
                                max={50}
                                step={5}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>5 thẻ</span>
                                <span>50 thẻ</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Shuffle mode */}
                        <div className="space-y-3">
                            <Label>Cách xáo trộn</Label>
                            <Select
                                value={flashcardSettings.shuffleMode}
                                onValueChange={(value) => setFlashcardSettings(prev => ({ ...prev, shuffleMode: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {shuffleModes.map((mode) => (
                                        <SelectItem key={mode.value} value={mode.value}>
                                            <div>
                                                <div className="font-medium">{mode.label}</div>
                                                <div className="text-sm text-muted-foreground">{mode.description}</div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        {/* Auto audio */}
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">Tự động phát âm</Label>
                                <p className="text-sm text-muted-foreground">
                                    Phát âm thanh tự động khi hiển thị thẻ có âm thanh
                                </p>
                            </div>
                            <Switch
                                checked={flashcardSettings.autoAudio}
                                onCheckedChange={(checked) => setFlashcardSettings(prev => ({ ...prev, autoAudio: checked }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Mindmap Structure */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GitBranch className="w-5 h-5" />
                            Cấu trúc mindmap
                        </CardTitle>
                        <CardDescription>
                            Tùy chỉnh độ sâu và số nhánh con của mindmap
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Depth */}
                        <div className="space-y-3">
                            <Label>Chiều sâu: {mindmapSettings.depth} cấp</Label>
                            <Slider
                                value={[mindmapSettings.depth]}
                                onValueChange={([value]) => setMindmapSettings(prev => ({ ...prev, depth: value }))}
                                min={1}
                                max={6}
                                step={1}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>1 cấp</span>
                                <span>6 cấp</span>
                            </div>
                        </div>

                        <Separator />

                        {/* Branches */}
                        <div className="space-y-3">
                            <Label>Số nhánh con: {mindmapSettings.branches}</Label>
                            <Slider
                                value={[mindmapSettings.branches]}
                                onValueChange={([value]) => setMindmapSettings(prev => ({ ...prev, branches: value }))}
                                min={2}
                                max={10}
                                step={1}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>2 nhánh</span>
                                <span>10 nhánh</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button className="px-8">
                        Lưu cài đặt AI
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
