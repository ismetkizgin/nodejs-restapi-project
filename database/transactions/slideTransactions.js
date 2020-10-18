const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class SlideTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }
    
    allAsync() {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('SELECT * FROM tblSlide order by SlideID desc', (error, result) => {
                if (!error) {
                    if (result != null) {
                        resolve(result);
                    }
                    else {
                        resolve({ status: HttpStatusCode.NOT_FOUND, message: 'No content available !' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    insertAsync(data) {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('INSERT INTO tblSlide SET ?', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve('Slide added.');
                    }
                    else {
                        resolve({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'There was an error adding slide !' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    updateAsync(data){
        return new Promise((resolve, reject) => {
            data.SlideURL = data.SlideURL != null ? data.SlideURL : null;
            mysqlDataContext.query('UPDATE tblSlide SET SlideTitle = :SlideTitle, SlideUrl = :SlideUrl, SlidePicPath = :SlidePicPath WHERE SlideID = : SlideID', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve('Slide updated.');
                    }
                    else {
                        resolve({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'There was an error updating the slide !' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    deleteAsync(SlideID) {
        return new Promise((resolve, reject) => {
            mysqlDataContext.query('DELETE FROM tblSlide WHERE SlideID = ?', [SlideID], (error, result) => {
                if (!error) {
                    if (result[0] != null) {
                        resolve(result[0]);
                    }
                    else {
                        resolve({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'There is no such slide !' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}

module.exports = SlideTransactions;