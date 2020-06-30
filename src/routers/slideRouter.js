import express from 'express'
import { verifyToken, slideValidator } from '../middleware'
import dbFactory from '../database'
import { slideMessage } from '../fixtures/messageStatus.json'

const router = express();
const slideTransactions = dbFactory('slideTransactions');

router.get('/slide', async (req, res) => {
	try {
		const response = await slideTransactions.all();
		res.send(response);
	} catch (error) {
		res.status(error.status).send({ message: error.message });
	}
});

router.post('/slide/add', verifyToken, slideValidator.sliderAdd, async (req, res) => {
	try {
		if (req.decode.UserStatus == 'Admin') {
			const response = await slideTransactions.insert(req.body);
			res.send(response);
		} else {
			res.status(slideMessage.Slide_Post_Router_Proxy_Authentication_Required.status).send({ message: slideMessage.Slide_Post_Router_Proxy_Authentication_Required.message });
		}
	} catch (error) {
		res.status(error.status).send({ message: error.message });
	}
});

module.exports = router;
