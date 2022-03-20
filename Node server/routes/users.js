var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/details', function (req, res, next) {
  res.send('You are at details Route');
});
router.get('/info', function (req, res, next) {
  res.send('You are at /info Route');
});
router.get('/info/mine', function (req, res, next) {
  res.send('You are at /info/mine Route');
});

module.exports = router;
