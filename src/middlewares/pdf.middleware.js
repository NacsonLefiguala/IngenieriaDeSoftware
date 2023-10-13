const multer = require("multer");

const pdf = multer.diskPdf({
    destination: (req, archivo, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage: pdf });

module.exports = upload;
