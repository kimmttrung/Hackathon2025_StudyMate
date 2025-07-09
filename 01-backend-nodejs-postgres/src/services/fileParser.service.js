// 📁 src/services/fileParser.service.js
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const mammoth = require("mammoth");

const parsePDF = async (filePath) => {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text;
};

const parseImage = async (filePath) => {
    const { data: { text } } = await Tesseract.recognize(filePath, "eng");
    return text;
};

const parseDocx = async (filePath) => {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
};

// ✅ fix lỗi dùng `this` bằng gọi trực tiếp
const parseTextFromFile = async (file) => {
    if (!file) throw new Error("Không có file nào được truyền vào.");

    const mime = file.mimetype;

    if (mime === "application/pdf") {
        return await parsePDF(file.path);
    }

    if (mime.startsWith("image/")) {
        return await parseImage(file.path);
    }

    if (
        mime === "application/msword" ||
        mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        return await parseDocx(file.path);
    }

    return "";
};

module.exports = {
    parsePDF,
    parseImage,
    parseDocx,
    parseTextFromFile
};
