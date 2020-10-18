const router = require('express')();
const request = require('request');

const requestUrl = 'https://deprem.odabas.xyz/api/pure_api.php'

router.get('/InstantEarthquakes', async (req, res) => {
    try {
        request(requestUrl, function (error, response, body) {
            res.json(JSON.parse(body));
        });
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

router.get('/InstantEarthquakes/:piece', async (req, res) => {
    try {
        request(requestUrl, function (error, response, body) {
            res.json(JSON.parse(body).splice(0, req.params.piece));
        });
    } catch (error) {
        res.status(error.status).json(error.message);
    }
});

module.exports = router;