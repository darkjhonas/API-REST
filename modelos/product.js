'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    name : String,
    picture : String,
    price : Number,
    category: { 
        type: String,
        enum: ['computer', 'phones', 'accesories']
    },
    description : String
})

module.exports = mongoose.model('Product', ProductoSchema)