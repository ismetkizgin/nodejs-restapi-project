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

router.post('/institution', verifyToken, institutionValidator.institutionAdd, async (req, res) => {
    try {
        const response = await institutionTransactions.insert(req.body);
        res.send(response);
    } catch (error) {
        res.status(error.status).send({ message: error.message });
    }
});
router.put('/institution', verifyToken, institutionValidator.institutionUpdate, async (req, res) => {
    try {
        const response = await institutionTransactions.update(req.body);
        res.send(response);
    } catch (error) {
        res.status(error.status).send({ message: error.message });
    }
});

module.exports = router;
