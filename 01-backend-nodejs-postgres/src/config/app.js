const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:4011",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

//data routes 
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const flashcardRoutes = require('../routes/flashcardRoutes');
const folderRoutes = require('../routes/folderRoutes');
const aiRoutes = require("../routes/aiFlashcard.route");
const folderQuizRoutes = require('../routes/folderQuizRoute');
const quizRoutes = require('../routes/quizRoutes');
const aiQuizRouter = require('../routes/aiQuiz.route');
const friendRouter = require('../routes/friendRoutes');
const messageRouter = require('../routes/messageRoutes');
const learningProgressRoutes = require("../routes/learningProgressRoute");
const quizAttempsRoutes = require("../routes/quizAttemptRoutes");
const discussionRoutes = require("../routes/discussionRoutes");
//middleware if having 

//use data routes   
app.use("/api/users", userRoutes);
app.use("/api", authRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/folder-quiz", folderQuizRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/quiz/ai", aiQuizRouter);
app.use("/api/friends", friendRouter);
app.use("/api/messages", messageRouter);
app.use("/api/learning-progress", learningProgressRoutes);
app.use("/api/quiz-attempt", quizAttempsRoutes);
app.use("/api/discussions", discussionRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

module.exports = app;