const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');

class PageTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    allAsync(piece) {
        return new Promise((resolve, reject) => {
            const limit = piece != null ? `LIMIT ${piece}` : ''
            this._datacontext.query(`SELECT * FROM tblPage order by PageID desc ${limit}`, (error, result) => {
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

    whereStatusAsync(PageStatusID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query('SELECT * FROM tblPage where PageStatusID=? order by PageID desc', [PageStatusID], (error, result) => {
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
            this._datacontext.query('INSERT INTO tblPage SET ?', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve('Page added.');
                    }
                    else {
                        resolve({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'There was an error adding page !' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    updateAsync(data) {
        return new Promise((resolve, reject) => {
            data.SlideURL = data.SlideURL != null ? data.SlideURL : null;
            this._datacontext.query('UPDATE tblPage SET PageTitle=:PageTitle, PageContent=:PageContent, PageDateTime=:PageDateTime, PagePicture=:PagePicture, PageStatusID=:PageStatusID, PageDescription=:PageDescription, PageKeywords=:PageKeywords where PageID=:PageID', data, (error, result) => {
                if (!error) {
                    if (result.affectedRows != 0) {
                        resolve('The page has been updated.');
                    }
                    else {
                        resolve({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'The page has been updated.' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }

    deleteAsync(PageID) {
        return new Promise((resolve, reject) => {
            this._datacontext.query('DELETE FROM tblPage WHERE PageID = ?', [PageID], (error, result) => {
                if (!error) {
                    if (result[0] != null) {
                        resolve(result[0]);
                    }
                    else {
                        resolve({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'There is no such page!' });
                    }
                }
                else
                    reject({ status: 500, message: error.message });
            });
        });
    }
}

module.exports = PageTransactions;