// Lo requerimos para modelar los datos
const mongoose = require('mongoose');

// requerimos solo el esquema desde mongoose 
const { Schema } = mongoose;

// el esquema nos permite definir el esquema de los datos (propiedades)
const TaskSchema = new Schema({
    title: { type: String, required: true},
    description: {type: String, required: true}
});

// lo que queremos reutilizar es el modelo de datos
// puede tener cualquier nombre 
module.exports = mongoose.model('Task', TaskSchema);
