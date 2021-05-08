var express = require('express');
var router = express.Router();

const historyDb = [];
const history = {
    timeStamp: '',
    numbers: [],
    gameResult: false
}

router.get('/', function(req, res, next) {
    res.status(200).json({ history: historyDb });
});

router.post('/', function(req, res, next) {
    historyDb.push(req.body);
    res.status(204).json();
});

module.exports = router;