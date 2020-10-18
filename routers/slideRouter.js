const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const slideTransactions = TransactionsFactory.creating('slideTransactions');
const { validators, verifyToken } = require('../middleware');
const slideValidator = validators.slideValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require('http-status-codes');

router.get('/slide', async (req, res) => {
	try {
		const response = await slideTransactions.allAsync();
		res.json(response);
	} catch (error) {
		res.status(error.status).json(error.message);
	}
});

router.post('/slide/add', tokenControl, slideValidator.sliderAdd, async (req, res) => {
	try {
		if (req.decode.UserStatus == 'Admin') {
			const response = await slideTransactions.insertAsync(req.body);
			res.json(response);
		} else {
			res.status(HttpStatusCode.BAD_REQUEST).json('Unauthorized transaction !');
		}
	} catch (error) {
		res.status(error.status).json(error.message);
	}
});

module.exports = router;
