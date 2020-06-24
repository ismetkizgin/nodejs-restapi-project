const multer = require('multer');
const path = require('path');
const imageUploadFolder = require('../imageUpload/imageFolder');

let imageFolderName;

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
        imageFolderName = req.imageFolderName != null ? req.imageFolderName : 'upload' ;
		callback(null, `public/images/${imageFolderName}/`);
	},
	filename: function (req, file, callback) {
		const imageFileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
		req.body.SlidePicturePath = `/images/${imageFolderName}/${imageFileName}`
		callback(null, imageFileName);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 10000000, files: 1 },
	fileFilter: (req, file, callback) => {
		if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
			return callback(new Error('Only Images are allowed !'), false);
		}

		callback(null, true);
	},
}).single('image');

module.exports = (req, res, next) => {
	upload(req, res, function (err) {
		if (err) {
			res.status(400).json({ message: err.message });
		} else {
			req.imageStatus = true;
			next();
		}
	});
};

module.exports.uploadFolder = imageUploadFolder;
