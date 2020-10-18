const express = require('express');
const dbFactory = require('../database');

const router = express();
const pageTransactions = dbFactory('pageTransactions');

router.get('/news', async (req, res) => {
    try {
        const response = await pageTransactions.whereStatus(1);
        res.json(response);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

router.get('/rescue-works', async (req, res) => {
    try {
        const response = await pageTransactions.whereStatus(2);
        res.json(response);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

router.get('/page/:piece', async (req, res) => {
    try {
        const response = await pageTransactions.all(req.params.piece);
        res.json(response);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

module.exports = router;