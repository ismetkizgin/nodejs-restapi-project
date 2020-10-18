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
                        resolve(institutionMessage.insert.Ok);
                    else
                        reject(institutionMessage.insert.Internal_Server_Error);
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
                        resolve(institutionMessage.update.Ok);
                    else
                        reject(institutionMessage.update.Internal_Server_Error);
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
                        resolve(institutionMessage.delete.Ok);
                    else
                        resolve(institutionMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}

module.exports = InstitutionTransactions;