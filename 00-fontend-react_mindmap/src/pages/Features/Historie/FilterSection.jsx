import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Search, Filter, Calendar as CalendarIcon, X } from "lucide-react";

export function FilterSection({
    filters,
    onFiltersChange,
    folders,
    mindmaps,
    allTags
}) {
    const updateFilter = (key, value) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const clearFilter = (key) => {
        onFiltersChange({ ...filters, [key]: key === 'searchTerm' ? '' : 'all' });
    };

    const hasActiveFilters = filters.type !== "all" ||
        filters.folder !== "all" ||
        filters.tag !== "all" ||
        filters.searchTerm !== "";

    return (
        <Card className="mb-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="h-5 w-5" />
                    Bộ lọc nâng cao
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {/* Search */}
                    <div className="xl:col-span-2">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Tìm kiếm</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Tên folder, mindmap..."
                                value={filters.searchTerm}
                                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Loại học liệu</label>
                        <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn loại" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="quiz">📘 Quiz</SelectItem>
                                <SelectItem value="flashcard">🧠 Flashcard</SelectItem>
                                <SelectItem value="mindmap">🗺️ Mindmap</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Folder Filter */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Folder/Mindmap</label>
                        <Select value={filters.folder} onValueChange={(value) => updateFilter('folder', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn folder" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                {folders.map(folder => (
                                    <SelectItem key={folder.id} value={folder.id}>{folder.name}</SelectItem>
                                ))}
                                {mindmaps.map(mindmap => (
                                    <SelectItem key={mindmap.id} value={mindmap.id}>{mindmap.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tag Filter */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Tag chủ đề</label>
                        <Select value={filters.tag} onValueChange={(value) => updateFilter('tag', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn tag" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                {allTags.map(tag => (
                                    <SelectItem key={tag} value={tag}>🏷️ {tag}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Range */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Khoảng thời gian</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {filters.dateFrom ? format(filters.dateFrom, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={filters.dateFrom || undefined}
                                    onSelect={(date) => updateFilter('dateFrom', date || null)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                        <span className="text-sm text-gray-600">Bộ lọc đang áp dụng:</span>
                        {filters.type !== "all" && (
                            <Badge variant="secondary" className="gap-1">
                                {filters.type}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('type')} />
                            </Badge>
                        )}
                        {filters.searchTerm && (
                            <Badge variant="secondary" className="gap-1">
                                "{filters.searchTerm}"
                                <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('searchTerm')} />
                            </Badge>
                        )}
                        {filters.folder !== "all" && (
                            <Badge variant="secondary" className="gap-1">
                                Folder: {folders.find(f => f.id === filters.folder)?.name || mindmaps.find(m => m.id === filters.folder)?.name}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('folder')} />
                            </Badge>
                        )}
                        {filters.tag !== "all" && (
                            <Badge variant="secondary" className="gap-1">
                                Tag: {filters.tag}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter('tag')} />
                            </Badge>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
