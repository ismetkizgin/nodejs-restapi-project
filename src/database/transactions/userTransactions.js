const { mysqlDataContext } = require('../dataContexts');
import { userMessage } from '../../fixtures/messageStatus.json';

module.exports = {
    login: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserLogin(?, ?)', [data.UserIdentityNo, data.UserPassword], (error, result) => {
                if (!error)
                    if (result[0][0] != null)
                        resolve(result[0][0]);
                    else
                        reject(userMessage.login.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    signup: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('CALL UserSignUp(?,?,?,?,?,?,?,?,?,?,?,?)', [data.UserFirstName, data.UserLastName, data.UserIdentityNo, data.UserPassword, data.UserAdressCity, data.UserAdressDistrict, data.UserAdressStreet, data.UserAdressNo, data.UserAdressApartmentName, data.UserEmail, data.UserPhone, data.UserFamilyPeopleCount], (error, result) => {
                if (!error)
                    if (result[0][0]?.UserID != null)
                        resolve(userMessage.signUp.Ok);
                    else
                        reject(userMessage.signUp.Internal_Server_Error);
                else
                    reject(error.errno == 1644 ? userMessage.signUp.Conflict : { status: 500, message: error.message });
            });
        });
    },
    findUserIdentityNo: (UserIdentityNo) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblUser WHERE UserIdentityNo = ?', [UserIdentityNo], (error, result) => {
                if (!error)
                    if (result[0] != null)
                        resolve(result[0]);
                    else
                        reject(userMessage.findUserIdentityNo.Not_Found);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (UserIdentityNo) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblUser WHERE UserIdentityNo = ?', [UserIdentityNo], (error, result) => {
                console.log(result);
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(userMessage.delete.Ok);
                    else
                        reject(userMessage.delete.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
};