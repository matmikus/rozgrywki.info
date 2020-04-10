const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa');


app.get('/competitions', function (req, res, next) {
    res.json({
        competitions: [{ name: 'test1', id: 1 }, { name: 'test2', id: 2 }, {
            name: 'test3',
            id: 3
        }]
    });
});

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIANCE,
    // issuer: `https://${process.env.AUTH0_DOMAIN}`,
    algorithms: ['RS256']
});

app.use(checkJwt);

app.get('/competitions/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    res.send(`rozgrywki o id ${id}`);
});

module.exports = app;