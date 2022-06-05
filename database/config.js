var colors = require("colors");

const mongoose = require('mongoose');

const dbConection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log("Base de Datos OnLine!".green);

    } catch (error) {
        console.log(error);
        throw new Error("Error conectando a la base de datos!".red);
    }
}

module.exports = {
    dbConection
}