const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

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

        // Lectura y parcero del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static("public"));
    }

    routes() {

        // Utiliza todas las rutas
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
    }

    listen() {

        // Lee el valor del puerto configurado en el archivo de variables de ambiente .env
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port: ${this.port}`)
        })
    }
}

module.exports = Server;