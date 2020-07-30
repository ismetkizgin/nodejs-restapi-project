const dbConnection = require('../mysqlConnector');
import { userMessage } from '../../../fixtures/messageStatus.json';

module.exports = {
    login: (data) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('CALL prLogin(?, ?)', [data.UserIdentityNo, data.UserPassword], (error, result) => {
                if (!error) {
                    if (result[0][0] != null) {
                        resolve(result[0][0]);
                    }
                    else {
                        resolve({ status: userMessage.All_Not_Found.status, message: userMessage.All_Not_Found.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },

    signup: (data) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('INSERT INTO tblUser SET ?', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve({ status: userMessage.SignUp_Ok.status, message: userMessage.SignUp_Ok.message });
                    }
                    else {
                        resolve({ status: userMessage.SignUp_Internal_Server_Error.status, message: userMessage.SignUp_Internal_Server_Error });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },

    findUserIdentityNo: (UserIdentityNo) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM tblUser WHERE UserIdentityNo = ?', [UserIdentityNo], (error, result) => {
                if (!error) {
                    if (result[0] != null) {
                        resolve(result[0]);
                    }
                    else {
                        resolve({ status: userMessage.All_Not_Found.status, message: userMessage.All_Not_Found.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (UserIdentityNo) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('DELETE FROM tblUser WHERE UserIdentityNo = ?', [UserIdentityNo], (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve({ status: userMessage.Delete_Ok.status, message: userMessage.Delete_Ok.message });
                    }
                    else {
                        resolve({ status: userMessage.Delete_Internal_Server_Error.status, message: userMessage.Delete_Internal_Server_Error.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};