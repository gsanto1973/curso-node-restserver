const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth";

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
    }

    routes() {

        this.app.use(this.authPath, require("../routes/auth"));
        // Utiliza todas las rutas
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
    }

    listen() {

        // Lee el valor del puerto configurado en el archivo de variables de ambiente .env
        this.app.listen(this.port, () => {
            console.log(`App listening on port: ${this.port}`)
        })
    }
}

module.exports = Server;