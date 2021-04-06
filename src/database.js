// Requerimos el modulo mongoose
const mongoose = require('mongoose');

// Direccion de la base de datos
// si la base de datos no existe mongo la crea por nosotros
const URI = "mongodb+srv://erick:288742@cluster0.dofmb.mongodb.net/mern-tasks?authSource=admin?retryWrites=true&w=majority";

mongoose.connect(URI)
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

module.exports = mongoose;