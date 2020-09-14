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
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblStateAgency SET ?', [data], (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve({ status: institutionMessage.Insert_Ok.status, message: institutionMessage.Insert_Ok.message });
                    }
                    else {
                        resolve({ status: institutionMessage.Insert_Internal_Server_Error.status, message: institutionMessage.Insert_Internal_Server_Error.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            data.SlideURL = data.SlideURL != null ? data.SlideURL : null;
            mysqlDataContext.query('UPDATE tblStateAgency SET StateAgencyName = :StateAgencyName, StateAgencyNo = :StateAgencyNo, StateAgencyEmail = :StateAgencyEmail WHERE StateAgencyID = : StateAgencyID', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve({ status: institutionMessage.Update_Ok.status, message: institutionMessage.Update_Ok.message });
                    }
                    else {
                        resolve({ status: institutionMessage.Update_Internal_Server_Error.status, message: institutionMessage.Update_Internal_Server_Error.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};