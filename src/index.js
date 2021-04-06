// 1- construimos el servidor con express
const express = require('express');
// requerimos morgan
const morgan = require('morgan');

//requerimos el modulo path
const path = require('path');

// requerimos el modulo mongoose
const { mongoose } = require('./database');

// Linea 2 cuando se ejecuta genera un objeto que se guarda en una constante 
// app es el servidor
const app = express();

/* 
   -> Seccion de configuracion 
      Settings 
*/

// 'port' es el nombre de la variable
// process.env.PORT sirve para que tome el puerto del sistema operativo que esta configurado 
// || o que tome el pueto que nosotros le asignemos
app.set('port', process.env.PORT || 443);

/* 
   -> Middlewares
      Son funciones que se ejecutan antes de llgar a las rutas
*/
app.use(morgan('dev'));
// esta linea sirve para que el servidor pueda entender la data que recibe y envia de formato tipo json
app.use(express.json());

/* 
   -> Rutas 
      Routes
*/

// utilizamos el archivo de las rutas
app.use('/api/tasks',require('./routes/task.routes'));

/*
   -> Static files 
      aqui le decimos a express donde iran los archivos estaticos HTML, CSS , javascript
*/

// utilizamos desde express un modulo llamado static
// que por defecto encuentra la carpeta public
// con esta linea le decimos a express que nuestra carpeta static esta en esta dirección
app.use(express.static(path.join(__dirname, 'public')));


/*
 -> Starting the server 
*/

// El servidor escucha en el puerto #n 

// app.get('port') | aqui obtenemos el valor del puerto

 app.listen(app.get('port'), () => {
    //la funcion se utiliza para ejecutar algo
    // solo para desarrollo
    console.log(`Server on port ${app.get('port')}`);
 });
