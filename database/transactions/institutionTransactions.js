const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class InstitutionTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync() {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblInstitution order by InstitutionID desc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No content available !' });
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    insertAsync(data) {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblInstitution SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve('Institution added.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'There was an error adding Institution !' });
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    updateAsync(data) {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblInstitution SET ? WHERE InstitutionID = ?', [data, data.InstitutionID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve('Institution registration has taken place.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'The Institution has been updated.' });
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    deleteAsync(InstitutionID) {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblInstitution WHERE InstitutionID = ?', [InstitutionID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve('Institution deletion has occurred.');
                    else
                        resolve({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'An error occurred during Institution deletion !' });
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}

module.exports = InstitutionTransactions;