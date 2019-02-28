var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const modulo = require('./sequelize'); //Se trae todo lo que hay en module.exports del archivo sequelize
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
var port = 8080;

const Productos = modulo.Productos;
const Inventarios = modulo.Inventarios;
const Inventarios_Productos = modulo.Inventario_Productos;

app.get('/', (req, res) => {
  res.send('La aplicación fue desplegada exitosamente. Esta es una prueba de commits.');
})


app.listen(port, () => {
    console.log('Escuchando en el puerto' + port)
})
