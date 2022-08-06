// esta es una manera de exportar
/*
module.exports = require('./server');
module.exports = require('./usuario');
module.exports = require('./role');
module.exports = require('./categorias');
*/
const Categoria = require('./categorias');
const Producto = require('./productos');
const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');


module.exports = {
    Categoria,
    Producto,
    Role,
    Server,
    Usuario
}

