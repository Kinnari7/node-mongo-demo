const productController = {};
const productService = require('./productService');
const { size } = require('lodash');

productController.createProduct = async (req, res) => {
    try {
        let response = await productService.createProduct(req.body);
        if (size(response) > 0) {
            await res.send({
                msg: 'Product added successfully',
                data: response,
                success: true,
                status: 200
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            success: false,
            status: 200
        });
    }
};

productController.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await productService.deleteProduct(id);
        if (size(response) > 0) {
            await res.send({
                message : 'Product deleted successfully',
                data: response,
                success: true,
                status: 200
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            success: false,
            status: 200
        });
    }
};

productController.getAllProducts = async (req, res) => {
    try {
        let response = await productService.getAllProducts(req.body);
        if (response) {
            await res.send({
                message : 'All Product',
                data: {
                    productList: [
                        {
                            categoryId: "Featured",
                            products: response
                        }
                    ],
                    totalCount: 10
                },
                success: true,
                status: 200
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            success: false,
            status: 200
        });
    }
};

productController.orderList = async (req, res) => {
    try {
        let response = await productService.orderList(req.body);
        if (response) {
            await res.send({
                message : 'All Orders',
                data: response,
                success: true,
                status: 200
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            success: false,
            status: 200
        });
    }
};

productController.handlePayment = async (req, res) => {
    try {
        let response = await productService.handlePayment(req.body);
        if (response) {
            await res.send({
                message : 'Payment Completed',
                data:[],
                success: true,
                status: 200
            });
        }
    } catch (e) {
        return res.send({
            message: 'Error',
            data: e,
            success: false,
            status: 200
        });
    }
}

module.exports = productController;