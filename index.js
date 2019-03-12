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
const InventarioProductos = modulo.InventarioProductos;

/*////////////////////////////////////Metodos para el inventario//////////////////////////////////*/

app.post('/inventario/nuevo', (req, res) => { // Para poder crear un inventario
  Inventarios.findOrCreate({
    where: {
      nombre: req.body.nombre,
    },
    defaults: {
      observacion: req.body.observacion,
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
    if (created) {
      res.json({
        respuesta: 'El inventario fue agregado con exito'
      })
    } else {
      res.json({
        respuesta: 'El inventario ya fue creado anteriormente con el mismo nombre.'
      })
    }
  }).catch(err => {
    res.json({
      respuesta: 'Error, vuelva a intentarlo ' + err
    })
  })
});

app.get('/inventarios', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  Inventarios.findAndCountAll()
    .then(result => {
      res.json({
        'cantidadInventarios': result.count,
        'data': result.rows,
      })
    })
    .catch((err) => {
      res.json({
        'cantidadInventarios': 0,
        'error': err,
      });
    })
});

app.get('/inventario/busca/:id', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
  var idInventario = req.params.id;
  Inventarios.findOne({
      where: {
        codigoInventario: idInventario
      }
    })
    .then(result => {
      res.json({
        'data': result,
        'errorBuscar': false
      })
    })
    .catch(() => {
      res.json({
        'error': 'Error al buscar, verifique los datos ingresados',
        'errorBuscar': true
      });
    })
});

app.delete('/inventario/delete/:idInventario', (req, res) => { //Borrar un inventario
  let inventarioId = req.params.idInventario
  Inventarios.destroy({
      where: {
        codigoInventario: inventarioId
      }
    }).then(() => {
      res.json({
        'eliminado': true
      })
    })
    .catch(error => {
      res.json({
        'eliminado': false
      })
    })
})


///////////////////////////////////////////Fin metodos inventarios ////////////////////////////////////////////////


/*/////////////////////////////////////////////////Metodos para los productos//////////////////////////////////*/

app.post('/producto/nuevo', (req, res) => { // Crear un producto
  Productos.findOrCreate({
    where: {
      codigoProducto: req.body.codigoProducto,
    },
    defaults: {
      nombre: req.body.nombre,
      observacion: req.body.observacion
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
    if (created) {
      res.json({
        respuesta: 'Producto creado correctamente'
      })
    } else {
      res.json({
        respuesta: 'El producto con el codigo: ' + result.codigoProducto + ' se encuentra registrado' + "\nSu nombre es: " + result.nombre
      })
    }
  }).catch(err => {
    res.json({
      respuesta: 'Error, vuelva a intentarlo' + err
    })
  })
});


app.get('/productos', (req, res) => { // Para poder obtener todos los servicios y el numero de resultados
  Productos.findAndCountAll()
    .then(result => {
      res.json({
        'cantidadProductos': result.count,
        'data': result.rows,
        'errorBuscar': false
      })
    })
    .catch((err) => {
      res.json({
        'cantidadProductos': 0,
        'error': err,
        'errorBuscar': true
      });
    })
});

app.get('/producto/busca/:id', (req, res) => { // Para poder obtener un producto con el codigo enviado por parametro id
  var idProducto = req.params.id;
  Productos.findOne({
      where: {
        codigoProducto: idProducto
      }
    })
    .then(result => {
      if (result === null) {
        res.json({
          'error': 'Error al buscar, verifique los datos ingresados',
          'errorBuscar': true
        });
      } else {
        res.json({
          'data': result,
          'errorBuscar': false
        })
      }
    })
    .catch(() => {
      res.json({
        'error': 'Error al buscar, verifique los datos ingresados',
        'errorBuscar': true
      });
    })
});


app.put('/producto/actualiza/:idProducto', (req, res) => {
  let productoId = req.params.idProducto
  let nuevosDatos = req.body
  Productos.findOne({
      where: {
        codigoProducto: productoId
      }
    })
    .then(producto => {
      producto.update(nuevosDatos)
        .then(() => {
          res.json({
            'respuesta': 'Los datos se han actualizado con exito',
            'actCorrecta': true
          })
        });
    }).catch(() => {
      res.json({
        'respuesta': 'Los datos no se han actualizado',
        'actCorrecta': false
      })
    })
});

app.delete('/producto/delete/:idProducto', (req, res) => {
  let productoId = req.params.idProducto
  Productos.destroy({
      where: {
        codigoProducto: productoId
      }
    }).then(() => {
      res.json({
        'eliminado': true
      })
    })
    .catch(() => {
      res.json({
        'eliminado': false
      })
    })
});

///////////////////////////////////////////Fin metodos para productos ////////////////////////////////////////////////

/*/////////////////////////////////////////////////Metodos para los InventarioProductos//////////////////////////////////*/

app.post('/invetarioproducto/nuevo', (req, res) => { //Agregar un producto a un inventario creado, y si ya esta actualiza la cantidad
  InventarioProductos.findOrCreate({
    where: {
      codInventario: req.body.codInventario,
      codProducto: req.body.codProducto
    },
    defaults: {
      cantidad: req.body.cantidad
    }
  }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto es creado
    if (created) {
      res.json({
        respuesta: 'Articulo agregado en el inventario correctamente'
      })
    } else {
      var cantidadActual = result.cantidad + req.body.cantidad;
      result.update({
        codInventario: req.body.codInventario,
        codProducto: req.body.codProducto,
        cantidad: cantidadActual
      }).then(() => {
        res.json({
          respuesta: 'El producto:' + req.body.codProducto + '\n en el inventario: ' + req.body.codInventario + ' ha sido actualizado correctamente.'
        });
      })
    }
  }).catch(() => {
    res.json({
      respuesta: 'Error, vuelva a intentarlo y verifique los datos'
    });
  })
});

app.get('/invetarioproducto/busca/:id', (req, res) => { // Para poder obtener todos los servicios y el numero de resultados
  var data = [];
  var usuarios = [];
  var datos = [];
  var paso = 0;
  var codInventario = req.params.id
  InventarioProductos.findAndCountAll({
      where: {
        codInventario: codInventario
      }
    })
    .then(result => {
      for (paso = 0; paso < result.count; paso++) {
        usuarios.push(result.rows[paso].codProducto);
        datos.push({
          'cantidad': result.rows[paso].cantidad,
          'createdAt': result.rows[paso].createdAt,
          'updatedAt': result.rows[paso].updatedAt
        });
      };
      Productos.findAll({
          where: {
            codigoProducto: usuarios
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        })
        .then(productos => {
          for (paso = 0; paso < result.count; paso++) {
            data.push({
              'producto': productos[paso],
              'datosInventario': datos[paso]
            });
          }
          res.json({
            'cantidadProductos': result.count,
            'data': data,
            'errorBuscar': false
          });
        })
    })
    .catch((err) => {
      res.json({
        'cantidadProductos': 0,
        'error': err,
        'errorBuscar': true
      });
    })
});

app.delete('/invetarioproducto/delete/:id', (req, res) => { // los datos del parametro deben de ser enviados separados por ';'
  let datos = req.params.id.split(';');
  console.log(datos);
  let inventarioId = parseInt(datos[0]);
  let codigoId = parseInt(datos[1]);
  InventarioProductos.destroy({
      where: {
        codInventario: inventarioId,
        codProducto: codigoId
      }
    }).then(() => {
      res.json({
        'eliminado': true
      })
    })
    .catch((error) => {
      res.json({
        'eliminado': false
      })
    })
});

app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
})

///////////////////////////////////////////Fin metodos para InventarioProductos ////////////////////////////////////////////////
app.listen(port, () => {
  console.log('Escuchando en el puerto' + port)
});