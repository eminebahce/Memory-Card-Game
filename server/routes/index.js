var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).json({ selection: [4, 8, 12] });
});

module.exports = router;