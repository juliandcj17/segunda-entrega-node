const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fun = require('./helpers');
const fs = require('fs')



//Settings
const directorioPublico = path.join(__dirname, '../public');
const directorioPartials = path.join(__dirname, '../partials');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(directorioPublico));
hbs.registerPartials(directorioPartials);
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('index'
        /*{estudiante: 'un funalno'}*/
    );
});
app.get('/crearcurso', (req, res) => {
    res.render('crearcurso');
});

app.post('/crearcurso', urlencodedParser, (req, res) => {
    //console.log(req.body)
    res.render('infoAdd', {
        vid: parseInt(req.body.id),
        vnombre: req.body.nombre,
        vduracion: parseInt(req.body.duracion),
        vvalor: parseInt(req.body.valor)
    })

});

/*<div class = "alert alert-success"
role = "alert" >
    A simple success alert— check it out!
    </div>*/

app.get('/vercurso', (req, res) => {
    res.render('vercurso');
});


app.get('/matriculas', (req, res) => {
    res.render('matriculas');
});

app.post('/matriculas', urlencodedParser, (req, res) => {

    console.log(req.body)

    res.render('infoAddEstu', {
        vdocumento: parseInt(req.body.documento),
        vnombre: req.body.nombre,
        vemail: req.body.email,
        vtelefono: parseInt(req.body.telefono),
        vcurso: req.body.curso
    })

});

app.get('/inscritos', (req, res) => {
    res.render('inscritos');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Èl seridor esta en el puerto: ${app.get('port')}`)
})