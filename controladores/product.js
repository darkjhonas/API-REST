
'use strict'
const Product = require('./../modelos/product')

let getProduct = (req, res) => {
    let prodcutID  = req.params.id;

    Product.findById(prodcutID, (err, product) => {
        console.log(product)
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(product == undefined) return res.status(404).send({message : `El producto no existe`})
        res.status(200).send({product})
    })
}

let getProducts = (req, res) => {
    Product.find({}, (err, products) => {
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}`})
        return res.status(200).send({products})
    })
}

let saveProduct = (req, res) => {
    console.log('POST /api/product',req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save( (err, productStored) => {
        if(err) res.status(500).send({message : `Error al salvar en la base de datos: ${err}` })
        res.status(200).send({ product: productStored})
    })
}

let updateProduct = (req, res) => {
    let productId = req.params.id;
    let update = req.body;
    Product.findByIdAndUpdate(productId, update, (err, product) => {
        if(err) res.status(500).send({message : `Error al actualizar el producto en la base de datos: ${err}` })

        res.status(200).send({product})
    })
} 

let deleteProduct = id => {
    let prodctId = req.params.id;
    Product.findById(prodctId, (err, product) => {
        if(err) res.status(500).send({message : `Error al borrar el producto en la base de datos: ${err}` })
        product.remove( err => {
            if(err) res.status(500).send({message : `Error al borrar el producto en la base de datos: ${err}` })
            res.status(200).send({message: 'El producto ha sido eliminado'})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}