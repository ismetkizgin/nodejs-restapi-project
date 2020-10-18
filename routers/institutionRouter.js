const router = require('express')();
const { validators, verifyToken } = require('../middleware');
const institutionValidator = validators.institutionValidator;
const tokenControl = verifyToken.tokenControl;
const TransactionsFactory = require('../database/transactionFactory');
const institutionTransactions = TransactionsFactory.creating('institutionTransactions');

router.get('/institution', tokenControl, async (req, res) => {
    try {
        const response = await institutionTransactions.listAsync();
        res.json(response);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

router.post('/institution', tokenControl, institutionValidator.add, async (req, res) => {
    try {
        const response = await institutionTransactions.insertAsync(req.body);
        res.json(response.message);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});
router.put('/institution', tokenControl, institutionValidator.update, async (req, res) => {
    try {
        const response = await institutionTransactions.updateAsync(req.body);
        res.json(response.message);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});
router.delete('/institution', tokenControl, institutionValidator.delete, async (req, res) => {
    try {
        const response = await institutionTransactions.deleteAsync(req.body.InstitutionID);
        res.json(response.message);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

module.exports = router;
