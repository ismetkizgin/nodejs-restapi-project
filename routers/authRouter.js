const router = require('express')();
const jwt = require('jsonwebtoken');
const TransactionsFactory = require('../database/transactionFactory');
const userTransactions = TransactionsFactory.creating('userTransactions');
const institutionUserTransactions = TransactionsFactory.creating('institutionUserTransactions');
const { validators, verifyToken } = require('../middleware');
const authValidator = validators.authValidator;
const tokenControl = verifyToken.tokenControl;
const HttpStatusCode = require('http-status-codes');

router.post('/login/:loginType', authValidator.login, async (req, res) => {
	console.log('asdasd');
	try {
		let result, payload;
		switch (req.params.loginType) {
			case 'user':
				result = await userTransactions.loginAsync(req.body);
				payload = { UserIdentityNo: result.UserIdentityNo, UserStatus: result.UserStatusName };
				break;
			case 'institution':
				result = await institutionUserTransactions.loginAsync(req.body);
				payload = { InstitutionUserID: result.institutionUserID };
				break;
			default:
				res.status(HttpStatusCode.BAD_REQUEST).json('The entry type is not correct.');
				return;
		}
		const token = jwt.sign(payload, req.app.get('api_key'), { expiresIn: 720 });
		res.json({ userInformation: result, token });
	} catch (err) {
		res.status(err.status || 500).json(err.message);
	}
});

router.post('/sign-up', authValidator.signUp, async (req, res) => {
	try {
		const result = await userTransactions.signupAsync(req.body);
		res.json(result);
	} catch (err) {
		res.status(err.status).json(err.message);
	}
});

router.delete('/delete-my-account', tokenControl, async (req, res) => {
	try {
		if (req.decode.UserIdentityNo == req.body.UserIdentityNo) {
			const result = await userTransactions.deleteAsync(req.body.UserIdentityNo);
			res.status(result.status).json({ message: result.message });
		} else {
			res.status(HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED).json('You are not authorized to do this !');
		}
	} catch (err) {
		res.status(err.status).json(err.message);
	}
});

router.get('/token-decode', tokenControl, async (req, res) => {
	res.json(req.decode);
});

module.exports = router;