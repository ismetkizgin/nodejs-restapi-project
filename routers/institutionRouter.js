const router = require('express')();
const { validator, verifyToken } = require('../middleware');
const institutionValidator = validator.institutionValidator;
const tokenControl = verifyToken.tokenControl;
const TransactionsFactory = require('../database/transactionFactory');
const institutionTransactions = TransactionsFactory.creating('institutionTransactions');

router.get('/institution', tokenControl, async (req, res) => {
    try {
        const response = await institutionTransactions.list();
        res.json(response);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

router.post('/institution', tokenControl, institutionValidator.add, async (req, res) => {
    try {
        const response = await institutionTransactions.insert(req.body);
        res.json(response.message);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});
router.put('/institution', tokenControl, institutionValidator.update, async (req, res) => {
    try {
        const response = await institutionTransactions.update(req.body);
        res.json(response.message);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});
router.delete('/institution', tokenControl, institutionValidator.delete, async (req, res) => {
    try {
        const response = await institutionTransactions.delete(req.body.InstitutionID);
        res.json(response.message);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

module.exports = router;
