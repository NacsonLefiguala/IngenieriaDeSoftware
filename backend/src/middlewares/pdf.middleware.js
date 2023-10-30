const multer = require("multer");

/**
 * @param {Object}
 * @param {Object}
 */
function upload() {
        const storage = multer.diskStorage({
        destination: "./pdfs/",
        /**
        * @param {Object} _req - Objeto de petición
        * @param {Object} cb
        */
        filename: function(_req, file, cb) {
            const extension = file.originalname.slice(file.originalname.lastIndexOf("."));
            const PDF = file.mimetype === "application/pdf";
            if (PDF) {
            cb(null, Date.now() + extension);
            } else {
                cb(new Error("No es un archivo PDF"));
            }
          },
    });

    const upload = multer({ storage: storage }).single("file");
    return upload;
}

module.exports = upload;
