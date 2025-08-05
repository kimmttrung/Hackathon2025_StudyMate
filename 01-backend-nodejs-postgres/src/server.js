const app = require("./config/app");
require("dotenv").config();
const { saveMessage } = require("./models/messageModel");

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app); // OK
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4011", // đúng frontend
    methods: ["GET", "POST"],
    credentials: true // nếu frontend dùng withCredentials
  }
});


// Biến tạm map userId <-> socketId
const userSocketMap = {};

// Khi client kết nối
io.on("connection", (socket) => {
  // console.log("✅ User connected:", socket.id);

  // Khi user vào app, gửi userId
  socket.on("join", (userId) => {
    userSocketMap[userId] = socket.id;
    // console.log(`User ${userId} joined with socket ${socket.id}`);
  });

  // Khi gửi tin nhắn
  socket.on("send_message", async (data) => {
    const { sender_id, receiver_id, content, type } = data;

    const receiverSocketId = userSocketMap[receiver_id];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", data);
    }

    try {
      const savedMessage = await saveMessage({ sender_id, receiver_id, content, type });
      // console.log("💾 Đã lưu tin nhắn:", savedMessage);
    } catch (err) {
      console.error("❌ Lỗi khi lưu tin nhắn vào DB:", err);
    }
  });

  // Ngắt kết nối
  socket.on("disconnect", () => {
    // console.log("❌ Disconnected:", socket.id);
    // Xoá socket khỏi map
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});

// Chạy server
const port = process.env.PORT || 5002; //check file .env worked or not worked
server.listen(port, () => {
  console.log(`Server đang chạy cổng ${port}`);
});
