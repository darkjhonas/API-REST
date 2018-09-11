'use strict'

const service = require('../services')

let isAuth = (req, res, next) => {
    if(!req.headers.authorization)
        return res.status(403).send({message: `No tienes autoriazión`})
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    service.decodeToken(token)
        .then(response => { 
            req.user = response
            next();
        })
        .catch(response => res.status(response.status));
}

module.exports = isAuth;