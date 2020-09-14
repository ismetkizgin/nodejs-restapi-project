import express from 'express'
import { verifyToken, institutionValidator } from '../middleware'
import dbFactory from '../database'

const router = express();
const institutionTransactions = dbFactory('institutionTransactions');

router.get('/institution', async (req, res) => {
    try {
        const response = await institutionTransactions.all();
        res.send(response);
    } catch (error) {
        res.status(error.status).send({ message: error.message });
    }
});

module.exports = router;
