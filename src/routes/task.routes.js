// utilizamos express para crear rutas
const express = require('express');
// utilizamos desde express un metodo llamado router
// devuelve un onjeto donde vamos a poder ingresar rutas
// y lo guardamos en una constante
const router = express.Router();

// gracias a router vamos a poder definir rutas en nuestro servidor
// router.get() es para decirle que tenemos una nueva ruta a travez del metodo get
// lo que hacemos es que cuando llege una peticion get a nuestro servidor vamos a responder con un
// hello world
router.get('/', (req, res) => {
    res.json({
        status: 'API Works'
    });
});


//  exportamos router 
module.exports = router; 