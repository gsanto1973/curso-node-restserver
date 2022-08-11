const { Router } = require("express");
const { check } = require("express-validator");

const { cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validaCampos, validarArchivoSubir } = require("../middlewares");


const router = Router();



router.get('/:coleccion/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validaCampos],
    mostrarImagen);



router.post('/', validarArchivoSubir, cargarArchivo);



router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validaCampos
], actualizarImagenCloudinary);
//], actualizarImagen);



module.exports = router;
