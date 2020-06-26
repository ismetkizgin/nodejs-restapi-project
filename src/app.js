import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routers from './serve'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('api_key', process.env.API_KEY || 'secret');

app.use(routers);

app.listen(PORT, () => {
    console.log("Ready on http://localhost:" + PORT)
});
