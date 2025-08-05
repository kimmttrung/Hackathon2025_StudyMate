import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";
import {
    Search,
    Send,
    Paperclip,
    Smile,
    Phone,
    Video,
    MoreHorizontal,
    Circle,
    Image
} from "lucide-react";
import Layout from "@/components/Layout";
import axios from "@/utils/axios.customize";
import { useParams } from "react-router-dom";

export default function Chat() {
    const { userId } = useParams();
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState("");

    const currentUserId = getUserIdFromToken();
    const selectedFriend = friends.find(f => f.id === selectedChat);

    function bufferToBase64(buffer) {
        if (!buffer || !buffer.data) return null;
        const binary = buffer.data.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
        return `data:image/png;base64,${btoa(binary)}`;
    }

    function getUserIdFromToken() {
        const access_token = localStorage.getItem("access_token");
        if (!access_token) return null;
        try {
            const payloadBase64 = access_token.split('.')[1];
            const payload = JSON.parse(atob(payloadBase64));
            return payload.id;
        } catch (err) {
            console.error("Token invalid:", err);
            return null;
        }
    }

    const handleSendMessage = () => {
        if (!message.trim()) return;
        const msg = {
            sender_id: currentUserId,
            receiver_id: selectedFriend.id,
            content: message,
        };
        socket.emit("send_message", msg);
        setMessages(prev => [...prev, msg]);
        setMessage("");
    };

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get("/api/friends/list");
                if (res.success) {
                    const mappedFriends = res.friends.map(friend => ({
                        id: friend.id,
                        name: friend.full_name || friend.username,
                        avatar: friend.avatar?.data ? bufferToBase64(friend.avatar) : "/default-avatar.png",
                        isOnline: friend.is_online,
                        lastMessage: "Chưa có tin nhắn",
                        time: "Vừa xong",
                        unread: 0
                    }));
                    setFriends(mappedFriends);
                }
            } catch (err) {
                console.error("❌ Lỗi khi lấy danh sách bạn bè:", err);
            }
        };
        fetchFriends();
    }, []);

    useEffect(() => {
        if (userId) setSelectedChat(Number(userId));
    }, [userId]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedChat) return;
            try {
                const res = await axios.get(`/api/messages/${selectedChat}`);
                setMessages(res.messages);
            } catch (err) {
                console.error("❌ Lỗi khi lấy lịch sử tin nhắn:", err);
            }
        };
        fetchMessages();
    }, [selectedChat]);

    useEffect(() => {
        if (!currentUserId) return;
        socket.connect();
        socket.emit("join", currentUserId);

        socket.on("receive_message", (msg) => {
            if (
                (msg.sender_id === currentUserId && msg.receiver_id === selectedChat) ||
                (msg.receiver_id === currentUserId && msg.sender_id === selectedChat)
            ) {
                setMessages(prev => [...prev, msg]);
            }
        });

        return () => {
            socket.off("receive_message");
            socket.disconnect();
        };
    }, [selectedChat, currentUserId]);

    return (
        <Layout fullWidth>
            <div className="h-[calc(100vh-64px)] flex">
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
                                className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedChat === friend.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''}`}
                            >
                                <div className="relative">
                                    <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full" />
                                    <Circle className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${friend.isOnline ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}`} />
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
                                        <Circle className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full ${selectedFriend.isOnline ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}`} />
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
                                {messages.map((msg, idx) => {
                                    const isMe = msg.sender_id === currentUserId;
                                    return (
                                        <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] ${isMe ? 'order-2' : 'order-1'}`}>
                                                <div className={`p-3 rounded-lg ${isMe ? 'bg-blue-500 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}>
                                                    <p className="text-sm">{msg.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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
