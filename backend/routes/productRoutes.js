const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
router.post('/create', productController.CreateProducts);
router.get('/categories/:categoryname/products', productController.getTopProducts);
router.get('/categories/:categoryname/products/:productid', productController.getProductById);
module.exports = router;
