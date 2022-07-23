const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({ role });
    if (!existeRole) {
        throw new Error(`El rol ${role} no está registrado en la base de datos`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo}, ya existe`);
    }
}

const exiteUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    exiteUsuarioPorId
}