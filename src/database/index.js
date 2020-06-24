const mysqlDbTransactions = require('./mysql');

export default (transactionsName) => {
    switch (transactionsName) {
        case 'userTransactions':
            return mysqlDbTransactions.userTransactions;
        case 'slideTransactions':
            return mysqlDbTransactions.slideTransactions;
        case 'pageTransactions':
            return mysqlDbTransactions.pageTransactions;
    }
}