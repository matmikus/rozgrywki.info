export {}; //obejście błędu typescripta ze scope

const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const app = express();

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIANCE,
    algorithms: ['RS256']
});

app.use(checkJwt);

app.get('/test', function (req: any, res: any) {
    res.send('hello from protected endpoint');
});

module.exports = app;
