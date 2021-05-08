var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let selectedNumber = req.query.size;
    const randomNumbers = [];
    for (i = 0; i < selectedNumber; i++) {
        randomNumbers.push(Math.floor(Math.random() * 100))
    }
    res.status(200).json({ randomNumbers: randomNumbers });
});

module.exports = router;