const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");

const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const mammoth = require("mammoth");

// 👉 Thư viện convert PDF thành ảnh bạn cần tự tạo (dùng Poppler, ví dụ với pdftoppm)
const convertPDFToImages = require("./convertPDFToImages");
const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const msRest = require("@azure/ms-rest-js");

const apiKey = process.env.AZURE_KEY;
const endpoint = process.env.AZURE_ENDPOINT;

const credentials = new msRest.ApiKeyCredentials({
    inHeader: { "Ocp-Apim-Subscription-Key": apiKey },
});

const computerVisionClient = new ComputerVisionClient(credentials, endpoint);

// 🧠 Hàm dùng Azure OCR để đọc ảnh từ các trang PDF
const parsePDFwithOCR = async (filePath) => {
    try {
        const imageBuffer = fs.readFileSync(images[i]);
        const result = await computerVisionClient.readInStream(() => imageBuffer, { language: "vi" });

        for (let i = 0; i < images.length; i++) {
            console.log(`🔍 OCR trang ${i + 1}/${images.length}`);

            const imageBuffer = fs.readFileSync(images[i]); // ✅ Đọc ảnh thành Buffer
            const result = await computerVisionClient.readInStream(() => imageBuffer, { language: "vi" });

            const operationId = result.operationLocation.split("/").pop();
            let readResult;
            for (let j = 0; j < 10; j++) {
                readResult = await computerVisionClient.getReadResult(operationId);
                if (readResult.status === "succeeded" || readResult.status === "failed") break;
                await new Promise(r => setTimeout(r, 1000));
            }

            if (readResult.status === "succeeded") {
                const lines = readResult.analyzeResult.readResults
                    .flatMap(page => page.lines.map(line => line.text));
                fullText += lines.join("\n") + "\n";
            } else {
                console.warn(`⚠️ Không đọc được trang ${i + 1}`);
            }
        }

    } catch (error) {
        console.error("❌ Lỗi OCR với Azure:", error);
        return "";
    }
};

// 🔍 Trích xuất text nếu có sẵn trong PDF
const parsePDF = async (filePath) => {
    try {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        const text = data.text.trim();

        if (text.length < 100) {
            console.warn("⚠️ PDF không có đủ nội dung, dùng Azure OCR");
            return await parsePDFwithOCR(filePath);
        }

        return text;
    } catch (error) {
        console.error("❌ Lỗi parse PDF:", error);
        return "";
    }
};

// 📷 Nhận diện ảnh bằng Tesseract
const parseImage = async (filePath) => {
    try {
        const { data: { text } } = await Tesseract.recognize(filePath, "eng");
        return text.trim();
    } catch (error) {
        console.error("❌ Lỗi parse Image:", error);
        return "";
    }
};

// 📄 Xử lý file DOCX
const parseDocx = async (filePath) => {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value.trim();
    } catch (error) {
        console.error("❌ Lỗi parse DOCX:", error);
        return "";
    }
};

// 📁 Tự động chọn hàm phù hợp theo loại file
const parseTextFromFile = async (file) => {
    if (!file) throw new Error("Không có file nào được truyền vào.");

    const mime = file.mimetype;
    const ext = file.originalname.split(".").pop();

    console.log(`📂 Đang xử lý file: ${file.originalname} (${mime})`);

    if (mime === "application/pdf" || ext === "pdf") {
        return await parsePDF(file.path);
    }

    if (mime.startsWith("image/")) {
        return await parseImage(file.path);
    }

    if (
        mime === "application/msword" ||
        mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        ext === "docx" || ext === "doc"
    ) {
        return await parseDocx(file.path);
    }

    console.warn("⚠️ MIME không được hỗ trợ:", mime);
    return "";
};

module.exports = {
    parsePDF,
    parsePDFwithOCR,
    parseImage,
    parseDocx,
    parseTextFromFile
};
