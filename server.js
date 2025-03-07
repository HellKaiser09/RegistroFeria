const express = require("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/feriaNegocio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Conectado a la base de datos');
  }).catch(err => {
    console.log('Error al conectar con la base de datos:', err);
  });

app.set("view engine", "ejs")
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('formulario');
  });

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

app.listen(3001, (req, res) => {
    console.log("Si corre en el puerto 3000")
})

