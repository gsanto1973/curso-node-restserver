const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");

const { crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } = require("../controllers/productos");

const { existeCategoriaPorId, existeProductoPorId } = require("../helpers/db-validators");

const { validarJWT,
    validaCampos,
    esAdminRole } = require("../middlewares");

const router = Router();


// trae todas las categorias - público
router.get('/',
    obtenerProductos
);


// trae una categoria - público
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validaCampos
], obtenerProducto);


// Crear una categoria - privado , cualquiera con login valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validaCampos
], crearProducto);


// Actualizar una categoria - privado , cualquiera con login valido
router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validaCampos
], actualizarProducto);


// Borrar una categoria - privado , cualquiera con login valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validaCampos
], borrarProducto);


module.exports = router;