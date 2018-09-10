const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./modelos/product')

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {
    Product.find({}, (err, products) => {
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}`})
        return res.status(200).send({products})
    })
})

app.get('/api/product/:id', (req, res) => {
    let prodcutID  = req.params.id;

    Product.findById(prodcutID, (err, product) => {
        console.log(product)
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(product == undefined) return res.status(404).send({message : `El producto no existe`})
        res.status(200).send({product})
    })

})

app.post('/api/product', (req, res) => {
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

    
})

app.put('/api/product/:id', (req, res) => {
    let productId = req.params.id;
    let update = req.body;
    Product.findByIdAndUpdate(productId, update, (err, product) => {
        if(err) res.status(500).send({message : `Error al actualizar el producto en la base de datos: ${err}` })

        res.status(200).send({product})
    })
})

app.delete('/api/product/:id', (req, res) => {
    let prodctId = req.params.id;
    Product.findById(prodctId, (err, product) => {
        if(err) res.status(500).send({message : `Error al borrar el producto en la base de datos: ${err}` })
        product.remove( err => {
            if(err) res.status(500).send({message : `Error al borrar el producto en la base de datos: ${err}` })
            res.status(200).send({message: 'El producto ha sido eliminado'})
        })
    })
})

mongoose.connect('mongodb://127.0.0.1:27017/shop', { useNewUrlParser: true }, (err, res) => {
    if(err) throw err;
    console.log("Conexión a la base de datos establecida...");
    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    });
})


