# Hackathon2025_StudyMate 🧠

![Banner](https://capsule-render.vercel.app/api?type=waving&color=0:4facfe,100:00f2fe&height=220&section=header&text=Hackathon2025_StudyMate&fontSize=50&fontAlign=50&fontAlignY=40&desc=AI%20Mindmap%20%7C%20Quiz%20%7C%20Flashcard&descAlign=50&descAlignY=70)
<!-- ![Banner](./00-fontend-react_mindmap/public/images/banner.png) -->


[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![GitHub Workflow](https://img.shields.io/github/actions/workflow/status/<your-username>/Hackathon2025_StudyMate/nodejs.yml)](https://github.com/<your-username>/Hackathon2025_StudyMate/actions)

> Nền tảng học tập thông minh: Tạo Flashcard, Quiz, Mindmap từ AI (Text / PDF / DOC / Image).  
> Có chế độ học, ôn luyện, thi, trò chơi, kết bạn, cộng đồng hỏi–đáp, và hệ thống huy hiệu/thưởng.



## 📚 Mục lục

<details>
<summary>📖 Bấm để mở / xem</summary>

-  [🔗 Đường dẫn](#links-vi)
- [🚀 Giới thiệu](#overview)
- [✨ Tính năng chính](#features)
- [🛠 Công nghệ sử dụng](#tech)
- [📸 Ảnh / GIF demo](#demo)
- [⚙️ Cài đặt & Chạy dự án](#install)
- [📂 Cấu trúc thư mục](#structure)
-   [🚀 Cải tiến trong tương lai](#future-vi)

</details>

## 🔗 Đường dẫn <a id="links-vi"></a>

-   Video demo: [YouTube](https://www.youtube.com/watch?v=oxVCXuJaLV4&t=4s)

## 🚀 Giới thiệu <a id="overview"></a>

Hackathon2025_StudyMate là nền tảng hỗ trợ học tập hiệu quả, giúp bạn:

- Tạo nhanh **Flashcard, Quiz, Mindmap** từ nội dung văn bản hoặc file.  
- Ôn tập thông minh theo **spaced repetition**.  
- Tổ chức **thi thử, chơi game học tập**.  
- **Kết nối bạn bè**, chia sẻ tài liệu.  
- Tham gia **cộng đồng học tập** đa lĩnh vực.

## ✨ Tính năng chính <a id="features"></a>
### 1️⃣ Tạo nội dung học tập từ AI

- Nhập **Text** hoặc upload **PDF / DOC / Image**.  
- AI tạo **Mindmap, Flashcard, Quiz**.  
- Tuỳ chỉnh **độ khó, số lượng câu hỏi**.

### 2️⃣ Chế độ học – ôn – kiểm tra – trò chơi

- **Study Mode**: học với Flashcard, ôn theo lịch lặp thông minh.  
- **Review Mode**: làm Quiz, hiển thị đáp án ngay.  
- **Exam Mode**: thi thử với thời gian đếm ngược.  
- **Games**: ghép cặp, trả lời nhanh, leo bảng xếp hạng.

### 3️⃣ Mindmap tương tác

- Sơ đồ tư duy sinh từ AI.  
- Kéo thả chỉnh sửa, xuất **ảnh / PDF**.

### 4️⃣ Cộng đồng & kết bạn

- Kết nối người dùng, chat, gửi tài liệu.  
- Diễn đàn hỏi–đáp, bình luận, like, đánh giá.  
- **Huy hiệu, bảng xếp hạng** cho người đóng góp tích cực.

</details>

## 🛠 Công nghệ sử dụng <a id="tech"></a>

| Phần     | Công nghệ / Thư viện                   |
| -------- | -------------------------------------- |
| Frontend | React + Vite + TailwindCSS + shadcn/ui |
| Backend  | Node.js 20 / 22, Express, Socket.IO    |
| Database | PostgreSQL + Drizzle ORM               |
| Cloud    | Cloudinary                             |
| AI       | Google Gemini API                      |
| Auth     | JWT                                    |

---

## 📸 Ảnh / GIF demo <a id="demo"></a>

<div align="center">

![Giới thiệu](./00-fontend-react_mindmap/public/images/HomePage.png)
![Trang chủ](./00-fontend-react_mindmap/public/images/Dashboard.png)
![Tạo nội dung từ AI](./00-fontend-react_mindmap/public/images/Flashcard.png)
![Tạo nội dung từ AI](./00-fontend-react_mindmap/public/images/CreateWithAI.png)
![Flashcard & Quiz](./00-fontend-react_mindmap/public/images/FlashcardQuiz.png)
![Flashcard & Quiz](./00-fontend-react_mindmap/public/images/Dícussion.png)
![Discusion](./00-fontend-react_mindmap/public/images/FlashcardQuiz.png)
![Add Fiends](./00-fontend-react_mindmap//public/images/AddFriend.png)
![Chat](./00-fontend-react_mindmap//public/images/Chat.png)
![Chat](./00-fontend-react_mindmap//public/images/Leaderboard.png)
![Chat](./00-fontend-react_mindmap//public/images/Setting.png)

</div>

---

## ⚙️ Cài đặt & Chạy dự án <a id="install"></a>

### Yêu cầu

- Node.js v20.14.0 hoặc v22.14.0  
- PostgreSQL 14+  
- Cloudinary account  
- Google Gemini API key  

### Bước cài đặt (Development)

```bash
# 1. Clone project
git clone https://github.com/kimmttrung/Hackathon2025_StudyMate.git

# 2. Cài thư viện
cd 00 nhấn tab + enter
npm i
cd 01 nhấn tab + enter
npm i

# 3. Cập nhật file .env
cp .env.example -> .env
# chỉnh sửa DATABASE_URL, CLOUDINARY, GEMINI_API_KEY, ...

# 4. Chạy dự án
npm start

```


## 📂 Cấu trúc thư mục <a id="structure"></a>
```bash
00-frontend-react-mindmap/
│── public/ # Static files (ảnh, favicon, ...)
│── src/
│ ├── components/ # Các component tái sử dụng
│ ├── data/ # Dữ liệu tĩnh hoặc mock data
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Các page chính của ứng dụng
│ ├── styles/ # File CSS/Tailwind tuỳ chỉnh
│ ├── utils/ # Hàm tiện ích (helper functions)
│ ├── App.jsx # Component gốc
│ ├── main.jsx # Entry point, render React
│ └── Routes.jsx # Định nghĩa routes
│
│── .env # Config biến môi trường (FE)
│── index.html # Entry HTML
│── package.json # Quản lý dependencies
│── tailwind.config.js # Cấu hình TailwindCSS
│── vite.config.js # Cấu hình Vite

01-backend-nodejs-postgres/
│── src/
│ ├── config/ # Cấu hình DB, env, ...
│ ├── controllers/ # Xử lý logic request/response
│ ├── middleware/ # Middleware (auth, validate, ...)
│ ├── models/ # Định nghĩa model kết nối DB
│ ├── routes/ # Định nghĩa API routes
│ ├── services/ # Business logic/service layer
│ ├── temp/ # Thư mục tạm
│ ├── utils/ # Hàm tiện ích
│ ├── views/ # Template/view (nếu có)
│ └── server.js # Entry point khởi động server
│
│── uploads/ # Lưu file upload
│── .env # Config biến môi trường (BE)
│── package.json # Quản lý dependencies
```

## 🚀 Cải tiến trong tương lai <a id="future-vi"></a>
- **AI cá nhân hoá lộ trình học tập**: đề xuất tài liệu, quiz, flashcard dựa trên năng lực & tiến bộ của từng người.  
- **Nhận diện giọng nói & chấm điểm phát âm**: hỗ trợ luyện kỹ năng Speaking (IELTS/TOEIC/Ngôn ngữ khác).  
- **Gamification nâng cao**: thêm nhiệm vụ hằng ngày, hệ thống điểm kinh nghiệm (XP), vật phẩm ảo, và sự kiện thi đấu nhóm.  
- **Tích hợp nhiều nguồn tài liệu**: kết nối Google Drive, Notion, GitHub, Wikipedia để tạo nội dung học tập tự động.  
- **Ứng dụng di động (iOS/Android)**: đồng bộ với bản web, học mọi lúc mọi nơi.  
- **Chế độ học nhóm trực tuyến**: nhiều người cùng tham gia một quiz/game theo thời gian thực.  
- **Phân tích dữ liệu học tập**: biểu đồ tiến bộ, dự đoán điểm số, gợi ý cải thiện kỹ năng yếu.  
- **Hỗ trợ nhiều ngôn ngữ**: Việt, Anh, Nhật, Hàn... để mở rộng cộng đồng quốc tế.  