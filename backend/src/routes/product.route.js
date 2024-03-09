const express = require('express');
const { getAllProducts,
    getProduct,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct } = require('../controllers/product.controller.js')

const router = express.Router();

//READ -> GET   /products
//READ -> GET   /product/:id
// CREATE -> POST
// update - put
//Delete -> DELETE

router.get('/', getAllProducts)
    .get('/:id', getProduct)
    .post('/', createProduct)
    .put('/:id', replaceProduct)
    .patch('/:id', updateProduct)
    .delete('/:id', deleteProduct)

exports.productRoute = router;