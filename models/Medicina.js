"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicinaSchema = new Schema({
    id: String,
    nombre: String,
    genotipo: String,
    descripcion: String,
    floracion: String,
    thc: String,
})

const Medicina = mongoose.model('Medicina',medicinaSchema, "medicina");
module.exports = Medicina;