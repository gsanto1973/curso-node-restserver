const { Router } = require("express");
const { check } = require("express-validator");
const login = require("../controllers/auth");
const { validaCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña no pueder ser nula').not().isEmpty(),
    validaCampos
], login);

module.exports = router;