const express = require('express');
const productRoutes = express.Router();
const productController = require('./productController');

// create product
const createProduct = [
    productController.createProduct
];
productRoutes.post('/admin/add-product', createProduct);

// delete product
const deleteProduct = [
    productController.deleteProduct
];
productRoutes.delete('/admin/delete-product/:id', deleteProduct);

// get all products
const getAllProduct = [
    productController.getAllProducts
];
productRoutes.get('/get-all-products', getAllProduct);

// get all products
const getAllAdminProduct = [
    productController.getAllProducts
];
productRoutes.post('/admin/get-all-products', getAllAdminProduct);

// payment Completed
const paymentCompleted = [
    productController.handlePayment
];
productRoutes.post('/paymentCompleted', paymentCompleted);

// payment Completed
const orderList = [
    productController.orderList
];
productRoutes.post('/admin/orders', orderList);

module.exports = productRoutes;   