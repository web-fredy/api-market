//  REQUIRES
require('./config/global');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// INICIALIZAION DE VARIABLES
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, HEAD');
    next();
});

//  BODY PARSE
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//  IMPORTACION DE RUTAS
const appEmbarque = require('./routes/embarque');
const appRuta = require('./routes/ruta');
const appUnidad = require('./routes/flota');
const appEmpleado = require('./routes/empleado');
const appLogin = require('./routes/login');
const appUsuario = require('./routes/usuario');
const appRoutes = require('./routes/app');

//  CONEXION A LA BASE DE DATOS
mongoose.connect(process.env.URLDB,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');
});

//  RUTAS SECUNDARIAS
app.use('/usuario', appUsuario);
app.use('/login', appLogin);

//  RUTA PRINCIPAL
app.use('/', appRoutes);

//  ESCUCHA DE PETICIONES
app.listen(process.env.PORT, () => {
    console.log('Express server, puerto: '+ process.env.PORT +' \x1b[32m%s\x1b[0m', 'Online');
});