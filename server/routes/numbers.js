var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let selectedNumber = req.query.size;
    const randomNumbers = [];
    for (i = 0; i < selectedNumber; i++) {
        randomNumbers.push(Math.floor(Math.random() * 100))
    }
    let sortedNumbers = randomNumbers.map(x => x).sort(numberSort)
    res.status(200).json({ randomNumbers: randomNumbers, sortedNumbers: sortedNumbers  });
});

numberSort = function (a,b) {
    return a - b;
};

module.exports = router;