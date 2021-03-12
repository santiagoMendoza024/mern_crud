// 1- construimos el servidor con express
const express = require('express');
// cuando se ejecuta genera un objeto que se guarda en una constante 
// app es el servidor
const app = express();

/// - Seccion de configuracion | Settings 


// 'port' es eñ nombre de la variable
// process.env.PORT sirve para que tome el puerto del sistema operativo que esta configurado 
// || o que tome el pueto que nosotros le asignemos
app.set('port', process.env.PORT || 3000);

/// - Middlewares | Son funciones que se ejecutan antes de llgar a las rutas

/// - Rutas

/// - Static files | aqui le decimos a express donde iran los archivos estaticos HTML, CSS , javascript

/// - Starting the server 

// El servidor escucha en el puerto #n 

// app.get('port') | aqui obtenemos el valor del puerto

 app.listen(app.get('port'), () => {
    //la funcion se utiliza para ejecutar algo
    // solo para desarrollo
    console.log(`Server on port ${app.get('port')}`);
 });
