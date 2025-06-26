const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:4028",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//data routes 
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const flashcardRoutes = require('../routes/flashcardRoutes');
const folderRoutes = require('../routes/folderRoutes');
const reviewRoutes = require('../routes/reviewRoutes');

//middleware if having 

//use data routes
app.use("/api/users", userRoutes);
app.use("/api", authRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((req, res) => {
    res.status(404).json({error: "Not Found"});
});

module.exports = app;