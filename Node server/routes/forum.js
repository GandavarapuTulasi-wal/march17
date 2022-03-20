var express = require('express');
var router = express.Router();
let forums = [];
router.get('/', function (req, res) {
  res.json(forums);
});
router.post('/', function (req, res) {
  console.log(req.body);
  let { title, author, forumbody, date } = req.body;
  forums.push({ title, author, forumbody, date });
  res.json({ status: 'adding todo complete' });
});
router.delete('/:indexToDelete', function (req, res) {
  console.log(req.params.indexToDelete);
  let newforums = forums.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      console.log('Came in return false');
      return false;
    } else {
      return true;
    }
  });
  forums = newforums;
  res.json({ status: 'Successfully deleted Todos' });
});
router.get('/clearall', function (req, res) {
  forums = [];
  res.json({ status: 'Successfully deleted all Todos' });
});
module.exports = router;
