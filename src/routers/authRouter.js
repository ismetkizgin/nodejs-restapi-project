import express from 'express'
import jwt from 'jsonwebtoken'
import { verifyToken, authValidator } from '../middleware/index'
import dbFactory from '../database'
import { userMessage } from '../fixtures/messageStatus.json'

const router = express();
const userTransactions = dbFactory('userTransactions');
const institutionUserTransactions = dbFactory('institutionUserTransactions');

router.post('/login/:loginType', authValidator.login, async (req, res) => {
	try {
		let result, payload;
		switch (req.params.loginType) {
			case 'user':
				result = await userTransactions.login(req.body);
				payload = { UserIdentityNo: result.UserIdentityNo, UserStatus: result.UserStatusName };
				break;
			case 'institution':
				result = await institutionUserTransactions.login(req.body);
				payload = { InstitutionUserID: result.institutionUserID };
				break;
			default:
				res.status(userMessage.login.Bad_Request.status).json({message: userMessage.login.Bad_Request.message});
		}
		const token = jwt.sign(payload, req.app.get('api_key'), { expiresIn: 720 });
		res.json({ userInformation: result, token });
	} catch (err) {
		res.status(err.status).json({ message: err.message });
	}
});

router.post('/sign-up', authValidator.all, async (req, res) => {
	try {
		const result = await userTransactions.signup(req.body);
		res.json({ message: result.message });
	} catch (err) {
		res.status(err.status).json({ message: err.message });
	}
});

router.delete('/delete-my-account', verifyToken, async (req, res) => {
	try {
		if (req.decode.UserIdentityNo == req.body.UserIdentityNo) {
			const result = await userTransactions.delete(req.body.UserIdentityNo);
			res.status(result.status).json({ message: result.message });
		} else {
			res.status(userMessage.delete.Proxy_Authentication_Required.status).json({ message: userMessage.delete.Proxy_Authentication_Required.message });
		}
	} catch (err) {
		res.status(err.status).json({ message: err.message });
	}
});

router.get('/token-decode', verifyToken, async (req, res) => {
	res.json(req.decode);
});

module.exports = router;