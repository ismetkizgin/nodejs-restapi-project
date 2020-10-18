const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const pageTransactions = TransactionsFactory.creating('pageTransactions');

router.get('/news', async (req, res) => {
    try {
        const response = await pageTransactions.whereStatusAsync(1);
        res.json(response);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

router.get('/rescue-works', async (req, res) => {
    try {
        const response = await pageTransactions.whereStatusAsync(2);
        res.json(response);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

router.get('/page/:piece', async (req, res) => {
    try {
        const response = await pageTransactions.allAsync(req.params.piece);
        res.json(response);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

module.exports = router;