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
  res.json({
    respuesta: 'Esta es una respuesta exitosa.',
    result: 'Esta vale de una manera increible'
  })
})


app.listen(port, () => {
    console.log('Escuchando en el puerto' + port)
})
