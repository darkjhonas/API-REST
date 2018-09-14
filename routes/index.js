'use strict'

const express = require('express')
const ProductCtrl = require('./../controladores/product')
const userCtrl = require('../controladores/auth')
const auth = require('../middleware/auth')
const api = express.Router();

api.get('/product', auth, ProductCtrl.getProducts)
api.get('/product/:id', ProductCtrl.getProduct)
api.post('/product', ProductCtrl.saveProduct)
api.put('/product/:id', ProductCtrl.updateProduct)
api.delete('/product/:id', ProductCtrl.deleteProduct)
api.post('/singup', userCtrl.signUp)
api.post('/sigin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: `Tienes acceso`})
})

module.exports = api
    