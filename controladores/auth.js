'use strict'

const mongoose =  require('mongoose');
const User = require('./../modelos/user')
const service = require('./../services/index')

let signUp = (req, res) => {
    const user = new User({
        email: req.body.email,
        displayName : req.body.displyName,
        password: req.body.password
    })
    user.save( (err) => {
        if(err) res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        return res.status(200).send({ token: service.createToken(user)});
    });
}

let signIn = (req, res) => {
    User.find({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).send({menssage: `No se pudo autenticar el usuario: ${e}`})
        if(!user) return res.status(404).send({ message: `No existe el usuario`})
        req.user = user
        res.status(200).send({
            message: `Te has autenticado correctamente`,
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}