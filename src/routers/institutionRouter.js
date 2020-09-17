import express from 'express'
import { verifyToken, institutionValidator } from '../middleware'
import dbFactory from '../database'

const router = express();
const institutionTransactions = dbFactory('institutionTransactions');

router.get('/institution', async (req, res) => {
    try {
        const response = await institutionTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/institution', institutionValidator.add, async (req, res) => {
    try {
        const response = await institutionTransactions.insert(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});
router.put('/institution', institutionValidator.update, async (req, res) => {
    try {
        const response = await institutionTransactions.update(req.body);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});
router.delete('/institution', verifyToken, institutionValidator.delete, async (req, res) => {
    try {
        const response = await institutionTransactions.delete(req.body.InstitutionID);
        res.json({message:response.message});
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;
