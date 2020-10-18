const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class UserTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    loginAsync (data) {
        return new Promise((resolve, reject) => {
            this._datacontext.query('CALL UserLogin(?, ?)', [data.UserIdentityNo, data.UserPassword], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'There is no such user !' });
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    signupAsync (data) {
        return new Promise((resolve, reject) => {
            this._datacontext.query('CALL UserSignUp(?,?,?,?,?,?,?,?,?,?,?,?)', [data.UserFirstName, data.UserLastName, data.UserIdentityNo, data.UserPassword, data.UserAdressCity, data.UserAdressDistrict, data.UserAdressStreet, data.UserAdressNo, data.UserAdressApartmentName, data.UserEmail, data.UserPhone, data.UserFamilyPeopleCount], (error, result) => {
                if (!error)
                    if (result[0][0].UserID != null)
                        resolve('User registration has taken place.');
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'Error while registering user !' });
                else
                    reject(error.errno == 1644 ? HttpStatusCode.CONFLICT : { status: 500, message: error.message });
            });
        });
    }
    
    findUserIdentityNoAsync(UserIdentityNo) {
        return new Promise((resolve, reject) => {
            this._datacontext.query('SELECT * FROM tblUser WHERE UserIdentityNo = ?', [UserIdentityNo], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'There is no such user !' });
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
    
    deleteAsync (UserIdentityNo) {
        return new Promise((resolve, reject) => {
            this._datacontext.query('DELETE FROM tblUser WHERE UserIdentityNo = ?', [UserIdentityNo], (error, result) => {
                console.log(result);
                if (!error)
                    if (result.affectedRows != 0)
                        resolve('User deletion has occurred.');
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'An error occurred during user deletion !' });
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}

module.exports = UserTransactions;