const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
        };

        // conexión base de datos
        this.conectarDB();

        // middlewares -> dan funcionalidades adicionales
        this.middlewares();

        // rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parcero del body todo lo que llegue, que sea JSON
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static("public"));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        // Utiliza todas las rutas
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.buscar, require("../routes/buscar"));
        this.app.use(this.paths.categorias, require("../routes/categorias"));
        this.app.use(this.paths.productos, require("../routes/productos"));
        this.app.use(this.paths.uploads, require("../routes/uploads"));
        this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    }

    listen() {

        // Lee el valor del puerto configurado en el archivo de variables de ambiente .env
        this.app.listen(this.port, () => {
            console.log(`App listening on port: ${this.port}`)
        })
    }
}

module.exports = Server;