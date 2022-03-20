function productIndex(req, res) {
  res.send('we are at base route of products');
}
function productDetails(req, res) {
  res.send('we are at details page of products router');
}
module.exports = { productIndex, productDetails };
