const { Router } = require("express");
const { check } = require("express-validator");

const { usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut,
    usuariosPatch } = require("../controllers/usuarios");

const { esRoleValido,
    emailExiste,
    exiteUsuarioPorId } = require("../helpers/db-validators");

const { esAdminRole,
    tieneRole,
    validaCampos,
    validarJWT } = require("../middlewares");


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre no puede ser vacio').not().isEmpty(),
    check('password', 'El password debe ser de mínimo 6 dígitos').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('role', 'El role no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validaCampos
],
    usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    check('role').custom(esRoleValido),
    validaCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'NOSE_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    validaCampos
], usuariosDelete);


module.exports = router;
