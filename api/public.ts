export {}; //obejście błędu typescripta ze scope

const express = require('express');
const app = express();

app.get('/test', function (req: any, res: any) {
    res.send('hello from public endpoint');
});

module.exports = app;