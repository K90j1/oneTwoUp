var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('wait', { name: req.param('name') });
});
module.exports = router;
