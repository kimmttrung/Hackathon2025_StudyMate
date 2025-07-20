import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

import { CalendarIcon, Upload, Eye, EyeOff, Smartphone, Shield, Save, User } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/Input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { PopoverContent, Popover, PopoverTrigger } from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { SelectItem, SelectValue, Select, SelectContent, SelectTrigger } from "@/components/ui/Select";
// import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Label } from "@/components/ui/Label";

export default function Profile() {
    const [formData, setFormData] = useState({
        fullName: "",
        firstName: "",
        lastName: "",
        avatar: null,
        gender: "",
        dateOfBirth: undefined,
        phone: "+84",
        province: "",
        district: "",
        specificAddress: "",
        nationality: "",
        email: "user@example.com",
        username: "username123",
        changePassword: false,
        newPassword: "",
        confirmPassword: "",
        twoFactorAuth: false
    });

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const vietnamProvinces = [
        "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
        "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
        "Bắc Ninh", "Bến Tre", "Bình Đ���nh", "Bình Dương", "Bình Phước",
        "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông"
    ];

    const countries = [
        "Việt Nam", "United States", "United Kingdom", "Canada", "Australia",
        "Germany", "France", "Japan", "South Korea", "Singapore", "Thailand"
    ];

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, avatar: file }));
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarPreview(event.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSave = () => {
        console.log("Saving profile data:", formData);
        // Here you would typically send the data to your backend
        alert("Thông tin hồ sơ đã được lưu thành công!");
    };

    return (
        <Layout title="Chỉnh sửa thông tin cá nhân">
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                        <CardHeader className="text-center pb-6">
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <Avatar className="w-40 h-40 border border-red-500" >
                                        <AvatarImage src={avatarPreview || undefined} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm">
                                            <User className="w-3 h-3" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full cursor-pointer shadow-lg transition-colors">
                                        <Upload className="w-3 h-3" />
                                    </label>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <CardTitle>Ảnh đại diện</CardTitle>
                            <CardDescription>Tải lên ảnh đại diện mới để hiển thị trong hồ sơ</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {/* Basic Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">Thông tin cơ bản</h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="fullName">Họ và tên *</Label>
                                        <Input
                                            id="fullName"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                            placeholder="Nhập họ và tên đầy đủ"
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label>Giới tính *</Label>
                                        <RadioGroup
                                            value={formData.gender}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                                            className="mt-2"
                                        >
                                            <div className="flex items-center space-x-6">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="male" id="male" />
                                                    <Label htmlFor="male">Nam</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="female" id="female" />
                                                    <Label htmlFor="female">Nữ</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="other" id="other" />
                                                    <Label htmlFor="other">Khác</Label>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label>Ngày sinh *</Label>
                                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full mt-2 justify-start text-left font-normal"
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {formData.dateOfBirth ? format(formData.dateOfBirth, "dd/MM/yyyy") : "Chọn ngày sinh"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={formData.dateOfBirth}
                                                    onSelect={(date) => {
                                                        setFormData(prev => ({ ...prev, dateOfBirth: date }));
                                                        setCalendarOpen(false);
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Số điện thoại *</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            placeholder="+84 123 456 789"
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="nationality">Quốc tịch *</Label>
                                    <Select value={formData.nationality} onValueChange={(value) => setFormData(prev => ({ ...prev, nationality: value }))}>
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Chọn quốc tịch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country) => (
                                                <SelectItem key={country} value={country}>{country}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">Địa chỉ</h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="province">Tỉnh/Thành phố *</Label>
                                        <Select value={formData.province} onValueChange={(value) => setFormData(prev => ({ ...prev, province: value }))}>
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Chọn tỉnh/thành phố" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {vietnamProvinces.map((province) => (
                                                    <SelectItem key={province} value={province}>{province}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="district">Quận/Huyện *</Label>
                                        <Input
                                            id="district"
                                            value={formData.district}
                                            onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                                            placeholder="Nhập quận/huyện"
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* <div>
                                    <Label htmlFor="specificAddress">Địa chỉ cụ thể *</Label>
                                    <Textarea
                                        id="specificAddress"
                                        value={formData.specificAddress}
                                        onChange={(e) => setFormData(prev => ({ ...prev, specificAddress: e.target.value }))}
                                        placeholder="Nhập địa chỉ cụ thể (số nhà, tên đường...)"
                                        className="mt-2"
                                        rows={3}
                                    />
                                </div> */}
                            </div>

                            {/* Account Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">Thông tin tài khoản</h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={formData.email}
                                            readOnly
                                            className="mt-2 bg-gray-50"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Email không thể thay đổi</p>
                                    </div>

                                    <div>
                                        <Label htmlFor="username">Tên người dùng</Label>
                                        <Input
                                            id="username"
                                            value={formData.username}
                                            readOnly
                                            className="mt-2 bg-gray-50"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Tên người dùng không thể thay đổi</p>
                                    </div>
                                </div>
                            </div>

                            {/* Password Change */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">Bảo mật</h3>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="changePassword"
                                        checked={formData.changePassword}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, changePassword: checked }))}
                                    />
                                    <Label htmlFor="changePassword">Thay đổi mật khẩu</Label>
                                </div>

                                {formData.changePassword && (
                                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                                        <div>
                                            <Label htmlFor="newPassword">Mật khẩu mới *</Label>
                                            <div className="relative mt-2">
                                                <Input
                                                    id="newPassword"
                                                    type={showNewPassword ? "text" : "password"}
                                                    value={formData.newPassword}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                                                    placeholder="Nhập mật khẩu mới"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                >
                                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="confirmPassword">Nhập lại mật khẩu mới *</Label>
                                            <div className="relative mt-2">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                    placeholder="Nhập lại mật khẩu mới"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                                                <p className="text-red-500 text-sm mt-1">Mật khẩu không khớp</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Shield className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <Label htmlFor="twoFactorAuth">Xác thực 2 bước (2FA)</Label>
                                            <p className="text-sm text-gray-500">Tăng cường bảo mật tài khoản</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Switch
                                            id="twoFactorAuth"
                                            checked={formData.twoFactorAuth}
                                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, twoFactorAuth: checked }))}
                                        />
                                        {formData.twoFactorAuth && (
                                            <Button variant="outline" size="sm">
                                                <Smartphone className="w-4 h-4 mr-2" />
                                                Thiết lập
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-center pt-6">
                                <Button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg"
                                    size="lg"
                                >
                                    <Save className="w-5 h-5 mr-2" />
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>

    );
}
