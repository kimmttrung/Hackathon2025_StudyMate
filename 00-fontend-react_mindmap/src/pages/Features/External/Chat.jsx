import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
    Search,
    Send,
    Paperclip,
    Smile,
    Phone,
    Video,
    MoreHorizontal,
    Circle,
    Image,
    FileText
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Chat() {
    const [selectedChat, setSelectedChat] = useState(1);
    const [message, setMessage] = useState("");

    const friends = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
            isOnline: true,
            lastMessage: "Bài tập hôm nay khó quá...",
            time: "2 phút",
            unread: 2
        },
        {
            id: 2,
            name: "Trần Thị B",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
            isOnline: true,
            lastMessage: "Cảm ơn bạn đã giúp mình!",
            time: "5 phút",
            unread: 0
        },
        {
            id: 3,
            name: "Lê Văn C",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
            isOnline: false,
            lastMessage: "Gửi file bài giảng cho bạn rồi",
            time: "2 giờ",
            unread: 1
        },
        {
            id: 4,
            name: "Phạm Thị D",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
            isOnline: true,
            lastMessage: "Công thức này áp dụng như thế nào?",
            time: "1 ngày",
            unread: 0
        },
        {
            id: 5,
            name: "Hoàng Văn E",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
            isOnline: false,
            lastMessage: "Chúc bạn thi tốt!",
            time: "2 ngày",
            unread: 0
        }
    ];

    const messages = [
        {
            id: 1,
            sender: "Nguyễn Văn A",
            content: "Chào bạn! Mình đang gặp khó khăn với bài tập toán hôm nay",
            time: "14:30",
            isMe: false,
            type: "text"
        },
        {
            id: 2,
            sender: "Tôi",
            content: "Chào! Bài nào thế bạn? Mình có thể giúp",
            time: "14:32",
            isMe: true,
            type: "text"
        },
        {
            id: 3,
            sender: "Nguyễn Văn A",
            content: "Bài về phương trình bậc 2 ấy. Mình không hiểu cách giải khi delta < 0",
            time: "14:33",
            isMe: false,
            type: "text"
        },
        {
            id: 4,
            sender: "Tôi",
            content: "Ah được, khi delta < 0 thì phương trình vô nghiệm trên tập số thực. Mình gửi file giải thích chi tiết cho bạn nhé!",
            time: "14:35",
            isMe: true,
            type: "text"
        },
        {
            id: 5,
            sender: "Tôi",
            content: "phuong_trinh_bac_2.pdf",
            time: "14:35",
            isMe: true,
            type: "file"
        },
        {
            id: 6,
            sender: "Nguyễn Văn A",
            content: "Cảm ơn bạn nhiều! 😊",
            time: "14:37",
            isMe: false,
            type: "text"
        }
    ];

    const selectedFriend = friends.find(f => f.id === selectedChat);

    const handleSendMessage = () => {
        if (message.trim()) {
            console.log("Sending message:", message);
            setMessage("");
        }
    };

    return (
        <Layout fullWidth>
            <div className="h-[calc(100vh-64px)] flex">
                {/* Left Sidebar */}
                <div className="w-[30%] bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Tin nhắn</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input placeholder="Tìm kiếm bạn bè..." className="pl-10" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {friends.map((friend) => (
                            <div
                                key={friend.id}
                                onClick={() => setSelectedChat(friend.id)}
                                className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedChat === friend.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                                    }`}
                            >
                                <div className="relative">
                                    <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full" />
                                    <Circle className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${friend.isOnline ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'
                                        }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-gray-900 truncate">{friend.name}</h3>
                                        <span className="text-xs text-gray-500">{friend.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600 truncate">{friend.lastMessage}</p>
                                        {friend.unread > 0 && (
                                            <Badge className="bg-blue-500 text-white text-xs h-5 min-w-[20px]">
                                                {friend.unread}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 flex flex-col bg-gray-50">
                    {selectedFriend ? (
                        <>
                            <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-10 h-10 rounded-full" />
                                        <Circle className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full ${selectedFriend.isOnline ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'
                                            }`} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{selectedFriend.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {selectedFriend.isOnline ? 'Đang hoạt động' : 'Offline'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm"><Phone className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="sm"><Video className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                                            <div className={`p-3 rounded-lg ${message.isMe ? 'bg-blue-500 text-white' : 'bg-white text-gray-900 border border-gray-200'
                                                }`}>
                                                {message.type === 'file' ? (
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4" />
                                                        <span className="text-sm">{message.content}</span>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm">{message.content}</p>
                                                )}
                                            </div>
                                            <p className={`text-xs text-gray-500 mt-1 ${message.isMe ? 'text-right' : 'text-left'}`}>
                                                {message.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white p-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm"><Paperclip className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="sm"><Image className="w-4 h-4" /></Button>
                                    <div className="flex-1 relative">
                                        <Input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Nhập tin nhắn..."
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        />
                                    </div>
                                    <Button variant="ghost" size="sm"><Smile className="w-4 h-4" /></Button>
                                    <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600" size="sm">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Chọn một cuộc trò chuyện
                                </h3>
                                <p className="text-gray-500">
                                    Chọn bạn bè từ danh sách để bắt đầu chat
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
