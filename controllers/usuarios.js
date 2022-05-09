const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = "No name", apikey } = req.query;

    //res.send("Hola Giordano: Iniciado")
    res.json({
        "msg": "Hola Giordano, get API - Controller",
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        "msg": "Hola Giordano, post API - Controller",
        nombre, edad
    });
}

const usuariosPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        "msg": "Hola Giordano, put API - Controller",
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        "msg": "Hola Giordano, patch API - Controller"
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        "msg": "Hola Giordano, delete API"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}