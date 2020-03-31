const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

app.get('/competitions', function (req, res, next) {
    res.json({
        competitions: [{ name: 'test1', id: 1 }, { name: 'test2', id: 2 }, {
            name: 'test3',
            id: 3
        }]
    });
});

// const checkJwt = jwt({
//     secret: jwksRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `https://<AUTH0_DOMAIN>/.well-known/jwks.json`
//     }),
//     // Validate the audience and the issuer.
//     audience: '<API_IDENTIFIER>',
//     issuer: `https://<AUTH0_DOMAIN>/`,
//     algorithms: ['RS256']
// });

app.get('/competitions/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    res.send(`rozgrywki o id ${id}`);
});

module.exports = app;