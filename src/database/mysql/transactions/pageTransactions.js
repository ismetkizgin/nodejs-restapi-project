const dbConnection = require('../mysqlConnector');

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
                        resolve({ status: 404, message: 'No content available !' });
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
                        resolve({ status: 404, message: 'No content available !' });
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
                        resolve({ status: true, message: 'Page added.' });
                    }
                    else {
                        resolve({ status: 500, message: 'There was an error adding page !' });
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
                        resolve({ status: true, message: 'The page has been updated.' });
                    }
                    else {
                        resolve({ status: 500, message: 'Error updating page !' });
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
                        resolve({ status: 404, message: 'There is no such page!' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}