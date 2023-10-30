const multer = require("multer");

/** 
 
*@param {Object}
*@param {Object}
*/
function upload() {
        const storage = multer.diskStorage({
        destination: "./uploads/",
        /**
        *@param {Object} _req - Objeto de petición
        *@param {Object} cb
        */
    filename: function(_req, file, cb) {
        const extension = file.originalname.slice(file.originalname.lastIndexOf("."));
        const jpg = file.mimetype === "image/jpeg";
        if (jpg) {
        cb(null, Date.now() + extension);} else {
            cb(new Error("No es un archivo JPG"));}},});

    const upload = multer({ storage: storage }).single("file");
    return upload;
} 

module.exports = upload;