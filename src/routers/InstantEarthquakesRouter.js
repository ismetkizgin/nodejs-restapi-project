import express from 'express'
import request from 'request'
const router = express();

const requestUrl = 'https://deprem.odabas.xyz/api/pure_api.php'

router.get('/InstantEarthquakes', async (req, res) => {
    try {
        request(requestUrl, function (error, response, body) {
            res.send(JSON.parse(body));
        });
    } catch (error) {
        res.send(error);
    }
});


router.get('/InstantEarthquakes/:piece', async (req, res) => {
    try {
        request(requestUrl, function (error, response, body) {
            res.send(JSON.parse(body).splice(0,req.params.piece));
        });
    } catch (error) {
        res.send(error);
    }
});

module.exports = router