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

app.post('/producto/nuevo', (req, res) => { // Se debe de recibir el codigo y la descripción del producto en **req**
  console.log(req.body)
  Productos.findOrCreate({
      where: {
        codigoProducto: req.body.codigoProducto,
      }, defaults: {
        descripcion: req.body.descripcion
      }
    })
    .spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
      if (created) {
        res.json({
          respuesta: 'Producto creado'
        })
      } else {
        res.json({
          respuesta: 'El producto con el codigo: ' + result.codigoProducto + ' se encuentra registrado, su descripcion es: ' + result.descripcion
        })
      }
    })
    .catch((errores) => {
      res.json({
        respuesta: '500 Error interno del servidor'
      })
    })
});


app.get('/',(req,res) => {
  res.json({respuesta: 'Este es un valor de respuesta'});
});


app.listen(port, () => {
  console.log('Escuchando en el puerto' + port)
})