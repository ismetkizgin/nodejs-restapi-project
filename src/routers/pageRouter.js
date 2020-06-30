import express from 'express'
import dbFactory from '../database'

const router = express();
const pageTransactions = dbFactory('pageTransactions');

router.get('/news', async (req, res) => {
    try {
        const response = await pageTransactions.whereStatus(1);
        res.send(response);
    } catch (error) {
        res.status(error.status).send({ message: error.message});
    }
});

router.get('/rescue-works', async (req, res) => {
    try {
        const response = await pageTransactions.whereStatus(2);
        res.send(response);
    } catch (error) {
        res.status(error.status).send({ message: error.message});
    }
});

router.get('/page/:piece', async (req, res) => {
    try {
        const response = await pageTransactions.all(req.params.piece);
        res.send(response);
    } catch (error) {
        res.status(error.status).send({ message: error.message});
    }
});

module.exports = router