const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

 

exports.upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        const acceptedFormats = /jpg|png|gif|jpeg/;
        const fileExt = acceptedFormats.test(path.extname(file.originalname).toLowerCase());
        const fileMime = acceptedFormats.test(file.mimetype);
        if (fileExt && fileMime) {
            cb(null, true)
        } else {
            cb('Invalid image type', false)
        }
    }
}).single('image')

