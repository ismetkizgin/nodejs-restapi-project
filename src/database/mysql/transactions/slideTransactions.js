const dbConnection = require('../mysqlConnector');

module.exports = {
    all: () => {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM tblSlide order by SlideID desc', (error, result) => {
                if (!error) {
                    if (result != null) {
                        resolve(result);
                    }
                    else {
                        resolve({ status: 404, message: 'No slide available !' });
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
                        resolve({ status: true, message: 'Slide added.' });
                    }
                    else {
                        resolve({ status: 500, message: 'There was an error adding slide !' });
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
            dbConnection.query('UPDATE tblSlide SET SlideTitle = :SlideTitle, SlideUrl = :SlideUrl, SlidePicPath = :SlidePicPath WHERE SlideID = : SlideID', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve({ status: true, message: 'Slide updated.' });
                    }
                    else {
                        resolve({ status: 500, message: 'There was an error updating the slide !' });
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
                        resolve({ status: 404, message: 'There is no such slide !' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}