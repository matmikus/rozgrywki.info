const { Router } = require('express');
const express = require('express');
const app = express();

app.get('/competitions', function (req, res, next) {
    res.json({
        competitions: [{ name: 'test1', id: 1 }, { name: 'test2', id: 2 }, {
            name: 'test3',
            id: 3
        }]
    });
});

app.get('/competitions/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    res.send(`rozgrywki o id ${id}`);
});

module.exports = app;