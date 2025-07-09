const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ["application/pdf", "application/msword", "image/png", "image/jpeg"];
    cb(null, allowed.includes(file.mimetype));
};

module.exports = multer({ storage, fileFilter });
