const { request, response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
//const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {

    //const { q, nombre = "No name", apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    //const body = req.body;
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });

    // se encripta la clave
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // se guarda en base de datos
    await usuario.save();

    res.json({
        "msg": "Hola Giordano, post API - Controller",
        usuario
    });
}

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;
    // se excluyen los parametros que se deseen y se deja resto con lo que venga
    const { _id, password, google, correo, ...resto } = req.body;
    console.log(resto);

    if (password) {
        // se encripta la clave
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        "msg": "Hola Giordano, patch API - Controller"
    });
}

const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;
    // no se recomienda borrar registros por las referencias de integridad
    // se actualiza el estado a false
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}