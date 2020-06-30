const dbConnection = require('../mysqlConnector');
const errorMessage = require('../../../fixtures/messageStatus.json').slideMessage;

module.exports = {
    all: () => {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM tblSlide order by SlideID desc', (error, result) => {
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
            dbConnection.query('INSERT INTO tblSlide SET ?', data, (error, result) => {
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
            dbConnection.query('UPDATE tblSlide SET SlideName = :SlideName, SlideUrl = :SlideUrl, SlidePictureUrl = :SlidePictureUrl WHERE SlideID = : SlideID', data, (error, result) => {
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

    delete: (SlideID) => {
        return new Promise((resolve, reject) => {
            dbConnection.query('DELETE FROM tblSlide WHERE SlideID = ?', [SlideID], (error, result) => {
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