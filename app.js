'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const api = require('./routes/index');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'default', 
    extname: '.hbs'
})

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json())


app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

app.use('/api', api);
app.use('/login', (req, res) => {
    res.render('login') 
})
app.use('/', (req, res) => {
    res.render('product')
})


module.exports = app
