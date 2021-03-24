import React, {Component} from 'react';
class App extends Component {

    //constructor
    constructor(){
        //es para heredar todo lo que nos da el componente
        super();
        //definimos nuestro estado
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);

    }
    //1-funcion para agregar tareas nuevas
    addTask(e){
        // console.log(this.state);
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }

            })
            .then(res=> res.json())
            .then(data => {
                M.toast({html: data.status});
                this.setState({title: '', description: '', _id: ''})
                this.fetchTasks();
            })
        }else{
            //Aqui hacemos nuestra peticion a la api 
            fetch('/api/tasks',{
                method: 'POST',
                //le mandamos los datos que que digito el usuario 
                body: JSON.stringify(this.state),
                //mandamos la info de la peticion
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            // aqui nos regresa el mensaje la api
            .then(res => res.json())
            //
            .then(data => {
                console.log(data);
                //mostrar mensaje
                M.toast({html: data.status});
                //limpiar el formulario
                this.setState({title:'', description:''});
                this.fetchTasks();
            })
            .catch(err => console.log(err));
        }
        //evita que se refresque
        e.preventDefault();
    }

    //
    componentDidMount(){
        console.log('componente fue montado')
        //con esto apenas inicie el servidor vamos a traer todas las tareas
        this.fetchTasks();
    }

    //2- traer todas las tareas
    fetchTasks(){
        //consulta al servidor
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            //actualizamos el estado con las tareas que tenemos
            this.setState({tasks:data});
            console.log(this.state.tasks);
        });
    }
    /// delete
    deleteTask(id){
        if(confirm('Are you sure you want to delete it?')){
            fetch(`/api/tasks/${id}`,{
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: data.status})
                this.fetchTasks();
            });
        }
        
    }
    //editar
    editTask(id){

        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id : data._id
            })
        })
    }

    //cada que el usuario teclee algo este metodo lo va a capturar
    //funcion para capturar datos del user
    handleChange(evento){
        const {name, value} = evento.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div>
                {/* NAVIGATION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">

                                    {/**Cuando presiona el boton se ejecuta la funcion addTask */}

                                    <form onSubmit={this.addTask}>
                                        {/* input title*/}
                                        <div className="row">
                                            <div className="input-field col s12">
                                                {/** onChange nos sirve para capturar los datos tecleados */}
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task titles" value={this.state.title}/>
                                            </div>
                                        </div>
                                        {/**descripcion */}

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.state.description}>

                                                </textarea>
                                            </div>
                                        </div>
                                        {/**boton */}
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>

                        {/**Vamos a montar las tareas */}
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/**Recorremos las tareas que estan en state */}
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>
                                                        {task.title}
                                                    </td>
                                                    <td>
                                                        {task.description}
                                                    </td>
                                                    <td>
                                                        <button className="btn light-red" onClick={() => 
                                                            this.deleteTask(task._id)
                                                        }>
                                                            {/**editar */}
                                                            <i className="material-icons">delete</i>
                                                            
                                                        </button>
                                                        <button onClick={() => this.editTask(task._id)} className="btn light-green" style={{margin: '4px'}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                    
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default App;