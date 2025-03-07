//Constantes que se estan usando 
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');

//Midleware 
app.use(express.static("public"));

//Configuraciones del ejs
app.set("view engine", "ejs")
app.set('views', './views');

//Este es donde se ve el formulario 
app.get('/', (req, res) => {
    res.render('formulario');
  });


//Esto segun es la base de datos pero vamos a checarla aun xd a esto yo si no le se   
mongoose.connect('mongodb://localhost:27017/feriaNegocio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Conectado a la base de datos');
  }).catch(err => {
    console.log('Error al conectar con la base de datos:', err);
  });



app.use(express.urlencoded({ extended: true }));



  const AsistenteSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    asistio: Boolean,
  });

const Asistente = mongoose.model('Asistente', AsistenteSchema);

app.post('/registro', (req, res) => {
    const { nombre, correo, asistio } = req.body;
    const nuevoAsistente = new Asistente({
      nombre,
      correo,
      asistio: asistio === 'on' ? true : false,  // Si la casilla está marcada, "asistió" es true
    });
  
    nuevoAsistente.save()
      .then(() => {
        res.send('¡Registro exitoso!');
      })
      .catch(err => {
        res.status(500).send('Error al registrar: ' + err.message);
      });
  });

//Checa si esta correcto el puerto
app.listen(3001, (req, res) => {
    console.log("Si corre en el puerto 3000")
})

