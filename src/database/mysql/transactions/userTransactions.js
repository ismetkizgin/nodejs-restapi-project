const dbConnection = require('../mysqlConnector');

module.exports = {
    login: (data) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('CALL prLogin(?, ?)', [data.UserIdentityNo, data.UserPassword], (error, result) => {
                if (!error) {
                    if (result[0][0] != null) {
                        resolve(result[0][0]);
                    }
                    else {
                        resolve({ status: 404, message: 'There is no such user !' });
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
                        resolve({ status: true, message: 'User registration has taken place.' });
                    }
                    else {
                        resolve({ status: 500, message: 'Error while registering user !' });
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
                        resolve({ status: 404, message: 'There is no such user !' });
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
                        resolve({ status: true, message: 'User deletion has occurred.' });
                    }
                    else {
                        resolve({ status: 500, message: 'An error occurred during user deletion !' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};