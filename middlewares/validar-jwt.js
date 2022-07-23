const { request, response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay un token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);
        console.log(uid);

        const usuario = await Usuario.findById(uid);
        console.log(usuario);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la BD'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        req.uid = uid;
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
};


module.exports = {
    validarJWT
}