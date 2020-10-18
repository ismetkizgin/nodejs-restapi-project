const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class InstitutionUserTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    loginAsync(data) {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL InstitutionUserLogin(?, ?)', [data.UserIdentityNo, data.UserPassword], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject({status: HttpStatusCode.NOT_FOUND, message: 'No content available !'});
                else
                    reject({status: 500, message: error.message});
            });
        });
    }
}
module.exports = InstitutionUserTransactions;