const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const convertPDFToImages = async (pdfPath) => {
    const outputDir = path.join(__dirname, "temp");
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPrefix = path.join(outputDir, "page");
    const command = `"C:/poppler/Library/bin/pdftoppm.exe" -png "${pdfPath}" "${outputPrefix}"`;

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("❌ Error converting PDF to images:", stderr);
                return reject(error);
            }

            // Lấy danh sách file PNG sinh ra
            const files = fs.readdirSync(outputDir)
                .filter(file => file.startsWith("page") && file.endsWith(".png"))
                .map(file => path.join(outputDir, file));

            resolve(files);
        });
    });
};

module.exports = convertPDFToImages;
