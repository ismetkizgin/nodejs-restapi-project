import express from 'express'
import jwt from 'jsonwebtoken'
import { verifyToken, authValidator } from '../middleware/index'
import dbFactory from '../database'

const router = express();
const userTransactions = dbFactory('userTransactions');

router.post('/login', authValidator.login, async (req, res) => {
	try {
		const result = await userTransactions.login(req.body);
		if (result.status != 404 && result.status != 500) {
			const payload = { UserIdentityNo: result.UserIdentityNo, UserStatus: result.UserStatusName };
			const token = jwt.sign(payload, req.app.get('api_key'), { expiresIn: 720 });
			res.json({
				status: true,
				result,
				token,
			});
		} else {
			res.json(result);
		}
	} catch (err) {
		res.json(err);
	}
});

router.post('/sign-up', authValidator.all, async (req, res) => {
	try {
		const findUserIdentityNo = await userTransactions.findUserIdentityNo(req.body.UserIdentityNo);
		if (findUserIdentityNo.status == 404) {
			const result = await userTransactions.signup(req.body);
			res.json(result);
		} else res.json({ status: false, message: 'There is such user' });
	} catch (err) {
		res.json(err);
	}
});

router.delete('/delete-my-account', verifyToken, async (req, res) => {
	try {
		if (req.decode.UserIdentityNo == req.body.UserIdentityNo) {
			const result = await userTransactions.delete(req.body.UserIdentityNo);
			res.json(result);
		} else {
			res.json({ status: false, message: 'You are not authorized to do this !' });
		}
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;