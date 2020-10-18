const express = require('express');
const app = express();
const routers = require('./routers');

app.get('/', function (req, res) {
    res.json('CL Serve Project');
});

app.use(routers.authRouter);
app.use(routers.slideRouter);
app.use(routers.pageRouter);
app.use(routers.InstantEarthquakesRouter);
app.use(routers.institutionRouter);

app.use((req, res, next) => {
    res.send("404 NOT FOUND");
});

module.exports = app;