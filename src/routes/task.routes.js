// utilizamos express para crear rutas
const express = require('express');
// utilizamos desde express un METODO llamado router
// devuelve un objeto donde vamos a poder ingresar rutas
// el objeto se  guarda en una constante
const router = express.Router();

// requerimos el modelo de las tareas
// Ahora el modelo esta almacenado en la constante Task
const Task = require('../models/task');
//GET
// gracias a router vamos a poder definir rutas en nuestro servidor
// router.get() es para decirle que tenemos una nueva ruta a travez del metodo get
// lo que hacemos es que cuando llege una peticion get a nuestro servidor vamos a responder con un mensaje
router.get('/', async (req, res) => {
    // buscar todos los documentos 
    // guardamos el resultado de la busqueda en una constante
    const tasks = await Task.find();
    
    console.log(tasks);
    //respondemos al navegador con un json
    res.json(tasks);  
});

// Consulta unica
router.get('/:id', async(req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});
//POST
//creamos una nueva ruta post que nos permite agregar datos a tavés de http 
router.post('/',async (req, res) => {
    //para recibir los datos del navegador lo hacemos a través de req.body, que .body es una propiedad nueva
    //que viene en el modulo express.json
    //obtenemos la data que el cliente esta enviando ya que tenemos la data por post lo almacenamos y utilizamos el modelo de tareas
    const {title, description} = req.body;
    //creamos el modelo
    const task = new Task({title, description});
    //almacenamos los datos
    await task.save();
    //regresamos
    res.json({status: 'Task saved'});

});

//PUT

//aquí necesitamos el id de la tarea que quqremos actualizar
router.put('/:id', async(req,res) => {
    //obtenemos la data
    const {title, description} = req.body;
    //creamos la nueva tarea
    const newTask = {title,description};
    // actualizamos
    await Task.findByIdAndUpdate(req.params.id, newTask);
//regresamos un json
    res.json({status: 'Task Update'});

});

//DELETE

router.delete('/:id', async(req,res)=>{
    //aquí solo vamos a tomar el id que queremos eliminar
    await Task.findByIdAndRemove(req.params.id);
    // regresamos un json
    res.json({status: 'Task Delete'});

});


//  exportamos router 
module.exports = router; 