const fs = require('fs');

module.exports.slider = (req, res, next) => {
	req.imageFolderName = 'slider';
	fs.mkdir('public/images/slider', () => {});
	next();
};