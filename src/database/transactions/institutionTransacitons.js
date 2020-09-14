import {institutionMessage} from "../../fixtures/messageStatus";

const { mysqlDataContext } = require('../dataContexts');

module.exports = {
    all: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblStateAgency order by StateAgencyID desc', (error, result) => {
                if (!error) {
                    if (result != null) {
                        resolve(result);
                    }
                    else {
                        resolve({ status: institutionMessage.All_Not_Found.status, message: institutionMessage.All_Not_Found.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};