//importar express
const express =  require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el servidor
const app =  express();

//conectar la base de datos
conectarDB();

//habilitar cors
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//habilitar exoress.json
app.use(express.json({extended: true }));


//puerto de la app servidor
const port = process.env.port || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//definir la pag principa
//app.get('/', (req, res)=>{
//   res.send('hola mundo')
//});

// arrancar la app
app.listen (port,'0.0.0.0', () => {
    console.log(`el servidor esta funcionando en el puerto ${port}`);
    
});