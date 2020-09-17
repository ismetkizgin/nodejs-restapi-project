const { mysqlDataContext } = require('../dataContexts');
import {institutionMessage} from "../../fixtures/messageStatus";


module.exports = {
    list: () => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblInstitution order by InstitutionID desc', (error, result) => {
                if (!error)
                    if (result != null)
                        resolve(result);
                    else
                        reject( institutionMessage.all.Not_Found );
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblInstitution SET ?', [data], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve( institutionMessage.insert.Ok );
                    else
                        reject(institutionMessage.insert.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('UPDATE tblInstitution SET ? WHERE InstitutionID = ?',
                [{ InstitutionName:data.InstitutionName,InstitutionNo:data.InstitutionNo, InstitutionEmail:data.InstitutionEmail}, data.InstitutionID], (error, result) => {
                if (!error)
                    if (result.affectedRows != 0)
                        resolve(institutionMessage.update.Ok);
                    else
                        reject(institutionMessage.update.Internal_Server_Error);
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },
    delete: (InstitutionID) => {
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