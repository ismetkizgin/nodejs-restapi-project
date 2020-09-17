const { mysqlDataContext } = require('../dataContexts');
import { institutionUserMessage } from '../../fixtures/messageStatus.json';

module.exports = {
    login: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL InstitutionUserLogin(?, ?)', [data.UserIdentityNo, data.UserPassword], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject(institutionUserMessage.login.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}