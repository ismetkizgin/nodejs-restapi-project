const dbConnection = require('../mysqlConnector');
const errorMessage = require('../../../fixtures/messageStatus.json').pageMessage;

module.exports = {
    all: (piece) => {
        return new Promise((resolve, reject) => {
            const limit = piece != null ? `LIMIT ${piece}` : ''
            dbConnection.query(`SELECT * FROM tblPage order by PageID desc ${limit}`, (error, result) => {
                if (!error) {
                    if (result != null) {
                        resolve(result);
                    }
                    else {
                        resolve({ status: errorMessage.All_Not_Found.status, message: errorMessage.All_Not_Found.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },

    whereStatus: (PageStatusID) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM tblPage where PageStatusID=? order by PageID desc', [PageStatusID], (error, result) => {
                if (!error) {
                    if (result != null) {
                        resolve(result);
                    }
                    else {
                        resolve({ status: errorMessage.All_Not_Found.status, message: errorMessage.All_Not_Found.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },

    insert: (data) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('INSERT INTO tblPage SET ?', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve({ status: errorMessage.Insert_Ok.status, message: errorMessage.Insert_Ok.message });
                    }
                    else {
                        resolve({ status: errorMessage.Insert_Internal_Server_Error.status, message: errorMessage.Insert_Internal_Server_Error.message });
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
            dbConnection.query('UPDATE tblPage SET PageTitle=:PageTitle, PageContent=:PageContent, PageDateTime=:PageDateTime, PagePicture=:PagePicture, PageStatusID=:PageStatusID, PageDescription=:PageDescription, PageKeywords=:PageKeywords where PageID=:PageID', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve({ status: errorMessage.Update_Ok.status, message: errorMessage.Update_Ok.message });
                    }
                    else {
                        resolve({ status: errorMessage.Update_Internal_Server_Error.status, message: errorMessage.Update_Internal_Server_Error.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    },

    delete: (PageID) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('DELETE FROM tblPage WHERE PageID = ?', [PageID], (error, result) => {
                if (!error) {
                    if (result[0] != null) {
                        resolve(result[0]);
                    }
                    else {
                        resolve({ status: errorMessage.Delete_Not_Found.status, message: errorMessage.Delete_Not_Found.message });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}