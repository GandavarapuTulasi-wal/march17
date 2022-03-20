var express = require('express');
var router = express.Router();
let products = [];
router.get('/', function (req, res) {
  res.json(products);
});
router.post('/', function (req, res) {
  console.log(req.body);
  let { name, price, description, category, status } = req.body;
  products.push({ name, price, description, category, status });
  res.json({ status: 'adding todo complete' });
});
router.delete('/:indexToDelete', function (req, res) {
  console.log(req.params.indexToDelete);
  let newProducts = products.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      console.log('Came in return false');
      return false;
    } else {
      return true;
    }
  });
  products = newProducts;
  res.json({ status: 'Successfully deleted Todos' });
});
router.get('/deleteall', function (req, res) {
  products = [];
  res.json({ status: 'Successfully deleted Todos' });
});
module.exports = router;
