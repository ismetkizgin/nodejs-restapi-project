const express = require('express');
const dbFactory = require('../database');
const { verifyToken, slideValidator } = require('../middleware');
const HttpStatusCode = require('http-status-codes');

const router = express();
const slideTransactions = dbFactory('slideTransactions');

router.get('/slide', async (req, res) => {
	try {
		const response = await slideTransactions.all();
		res.json(response);
	} catch (error) {
		res.status(error.status).json(error.message);
	}
});

router.post('/slide/add', verifyToken, slideValidator.sliderAdd, async (req, res) => {
	try {
		if (req.decode.UserStatus == 'Admin') {
			const response = await slideTransactions.insert(req.body);
			res.json(response);
		} else {
			res.status(HttpStatusCode.BAD_REQUEST).json('Unauthorized transaction !');
		}
	} catch (error) {
		res.status(error.status).json(error.message);
	}
});

module.exports = router;
