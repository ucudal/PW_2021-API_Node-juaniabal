var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');


var app = express();
app.use(cookieParser());

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));


let experience = {

  "experiencia-laboral": [
    {
      "empresa": "Mercado Libre",
      "puesto": "Data Analyst",
      "descripcion": "Development of webservices for other company's sectors. Along with the development team we look to design the best solution for our costumers.",
      "fechaInicio": new Date("2021/04/01"),
      "fechaFin": null
    },
    {
      "empresa": "OCA",
      "puesto": "Software Developer",
      "descripcion": "Collaboration in the creation of the company's app and in charge of the development of RESTful APIs for it",
      "fechaInicio": new Date("2017/01/01"),
      "fechaFin": new Date("2022/04/01")
    }, 
    {
      "empresa": "Google",
      "puesto": "CEO",
      "descripcion": "null",
      "fechaInicio": new Date("2016/04/17"),
      "fechaFin": new Date("2016/04/16")
    }
  ]
};

var jsonParser = bodyParser.json();

app.get('/experiencia-laboral', function(req, res) {
  res.send(experience);
});


app.listen(process.env.PORT || 3000, (a) => {
  console.log("Listening in http://localhost:3000")
});

app.post('/enviar-formulario', jsonParser, function(req, res) {
  var nombreContacto = req.body.nombreContacto;
  if (!nombreContacto) {
    res.status(400).send("Falta el nombre de contacto");
  }
  res.cookie("PW_2021-CV_Contacto", nombreContacto,{
      httpOnly: true
    });
  res.send("Operation completed");
});

app.post("/*", jsonParser, function(req, res) {
  res.status(404).send("404 - No fue encontrado");
});

module.exports = app;