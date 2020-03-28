const { Router } = require('express');
const cors = require('cors');
const router = Router();

router.get('/competitions', cors(), function (req, res, next) {
    res.json({ competitions: [{ name: 'test1', id: 1 }, { name: 'test2', id: 2 }, { name: 'test3', id: 3 }] });
});

router.get('/competitions/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    res.send(`rozgrywki o id ${id}`);
});

module.exports = router;