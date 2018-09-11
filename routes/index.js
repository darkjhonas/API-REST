'use strict'

const express = require('express')
const ProductCtrl = require('./../controladores/product')
const api = express.Router();

api.get('/product', ProductCtrl.getProducts)
api.get('/product/:id', ProductCtrl.getProduct)
api.post('/product', ProductCtrl.saveProduct)
api.put('/product/:id', ProductCtrl.updateProduct)
api.delete('/product/:id', ProductCtrl.deleteProduct)

module.exports = api
    