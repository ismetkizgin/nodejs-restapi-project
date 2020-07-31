const transactions = require('./transactions');

module.exports = (provider) => {
    let transaction = transactions[provider];
    if (!transaction)
        throw new Error('Database transaction is not found. Database transaction provider: ' + provider);
    return transaction;
}