const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
};

const fileUpload = multer({

    limits: 500000,

    storage: multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,`${__dirname}/../images`);
        },
        filename:(req, file, cb) =>{
            cb(null,file.originalname)
        }

    }),
    fileFilter: (req, file, cb) => {
        const isValid = file.mimetype in MIME_TYPE_MAP;
        let error = isValid? null : new Error("Invalid mime type!");
        cb(error, isValid);
    }
});

module.exports = fileUpload.single('photo')