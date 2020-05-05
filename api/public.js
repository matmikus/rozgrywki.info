const express = require('express');
const app = express();

app.get('/competitions', function (req, res) {
    res.json({
        competitions: [{ name: 'test1', id: 1 }, { name: 'test2', id: 2 }, {
            name: 'test3',
            id: 3
        }]
    });
});

app.get('/competitions/:id', function (req, res) {
    const id = parseInt(req.params.id)
    res.send(`rozgrywki o id ${id}`);
});

app.get('/test', function (req, res) {
    res.send('hello from public endpoint');
});

module.exports = app;