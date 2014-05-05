var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/log', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
