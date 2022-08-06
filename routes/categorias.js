const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");

const { crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require("../controllers/categorias");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const { validarJWT,
    validaCampos,
    esAdminRole } = require("../middlewares");

const router = Router();


// trae todas las categorias - público
router.get('/',
    obtenerCategorias
);


// trae una categoria - público
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validaCampos
], obtenerCategoria);


// Crear una categoria - privado , cualquiera con login valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validaCampos
], crearCategoria);


// Actualizar una categoria - privado , cualquiera con login valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validaCampos
], actualizarCategoria);


// Borrar una categoria - privado , cualquiera con login valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validaCampos
], borrarCategoria);


module.exports = router;