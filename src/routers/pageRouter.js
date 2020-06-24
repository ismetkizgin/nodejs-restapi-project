import express from 'express'
const router = express();

import dbFactory from '../database'
const pageTransactions = dbFactory('pageTransactions');

router.get('/news', async (req, res) => {
    try {
        console.log('istek');
        const response = await pageTransactions.whereStatus(1);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

router.get('/rescue-works', async (req, res) => {
    try {
        console.log("test")
        const response = await pageTransactions.whereStatus(2);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

router.get('/page/:piece', async (req, res) => {
    try {
        console.log('tasdad')
        const response = await pageTransactions.all(req.params.piece);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router