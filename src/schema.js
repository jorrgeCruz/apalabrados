//importamos las dependencia mongoose
const { Schema, model } = require("mongoose");
//import {  Schema, model } from "modngooe";

// Segenera el esquema base
const SCHEMANUM = new Schema({
    numero: { type: Number, require: true },
    acumulado: Number,
});

const SCHEMATEX= new Schema({
    texto: { type: String, require: true },
    inicio: String,
    final: String,
});

const SCHEMACAR = new Schema({
    caracter: { type: String, require: true },
});

// exportamon el schema generado
exports.numero = model("numero", SCHEMANUM);
exports.texto = model("texto", SCHEMATEX);
exports.caracter = model("caracter", SCHEMACAR);