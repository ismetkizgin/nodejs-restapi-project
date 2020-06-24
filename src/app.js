import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'

const routers = require('./routers');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('api_key', process.env.API_KEY || 'secret');
app.use(express.static(path.join(__dirname, 'public')));

app.use(routers.authRouter);

app.use((req, res, next) => {
    res.send("404 NOT FOUND");
})

app.listen(PORT, () => {
    console.log("Ready on http://localhost:" + PORT)
});