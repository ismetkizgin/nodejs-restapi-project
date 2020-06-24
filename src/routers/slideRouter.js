import express from 'express'
const router = express();

import { verifyToken, slideValidator } from '../middleware'

import dbFactory from '../database'
const slideTransactions = dbFactory('slideTransactions');

router.get('/slide', async (req, res) => {
	try {
		const response = await slideTransactions.all();
		res.send(response);
	} catch (error) {
		res.send(error);
	}
});

router.post('/slide/add', verifyToken, slideValidator.sliderAdd, async (req, res) => {
	try {
		if (req.decode.UserStatus == 'Admin') {
			const response = await slideTransactions.insert(req.body);
			res.send(response);
		} else {
			res.send({ status: false, message: 'Unauthorized transaction !' });
		}
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
