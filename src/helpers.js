const hbs = require('hbs');
const fs = require('fs');
listaCurso = [];
listaEstudiantes = [];
hbs.registerHelper('listarCursos', () => {

    listaCursos = require('./curso.json');
    let texto = `<div class="container">\
    <div class="row ">\
    <table class="table table-hover">\
    <thead class="card-panel grey">\
      <tr>\
        <th class="header center" scope="col sm-5 ">ID</th>\
        <th class="header center" scope="col">Nombre</th>\
        <th class="header center" scope="col">Duracion</th>\
        <th class="header center" scope="col">Precio</th>\
        <th class="header center" scope="col">Estado</th>\
      </tr>\
    </thead>\
    <tbody>`;
    listaCursos.forEach(curso => {
        texto = `${texto}
        <tr>
            <td class="header center" >${ curso.id} </td>
            <td>${curso.nombre}</td>
            <td class="header center" >${curso.duracion} horas</td>
            <td class="header center" > $ ${curso.valor}</td>
            <td class="header center" >${curso.estado}</td>
        </tr>`
    });
    texto = texto + '</tbody></table></div></div>'
    return texto;
})

hbs.registerHelper('listarCursos2', () => {

    listaCursos = require('./curso.json');
    let texto = `<div class="container">

      <ul class="collapsible">`;
    listaCursos.forEach(curso => {
        if (curso.estado == "disponible") {
            texto = `${texto}
      <li>
        <div class="collapsible-header">
            <i class="material-icons">chevron_right</i> ${curso.nombre}
            <span class="badge green white-text">Disponible</span>
        </div>
        <div class="collapsible-body">
            <b><p>ID: ${curso.id}</p></b>
            <b><p>Duración: ${curso.duracion} horas</p></b>
            <b><p>Valor $ ${curso.valor} pesos</p></b>
            
        </div>
    </li>`
        }

    });
    texto = texto + '</ul></div>'
    return texto;
})

hbs.registerHelper('listarCusosMatriculas', () => {

    listaCursos = require('./curso.json');

    let texto = `<div class="form-group">
    <label for="exampleFormControlSelect1" >Seleccione un curso</label>
    <select class="form-control" id="idCurso" name="curso">`;

    listaCursos.forEach(curso => {
        if (curso.estado == "disponible") {
            texto = `${texto}<option>${curso.nombre}</option>`
        }
    });

    texto = texto + '</select></div>'
    return texto;
})

const listarCurso = () => {
    try {
        listaCurso = JSON.parse(fs.readFileSync("./src/curso.json"));
    } catch (error) {
        listaCurso = [];
    }
};
const guardarCurso = () => {
    let datos = JSON.stringify(listaCurso);
    fs.writeFile("./src/curso.json", datos, (err) => {
        if (err) throw (err);
    });
};

hbs.registerHelper('creaCurso', (vid, vnombre, vduracion, vvalor) => {

    let msn = `<div class="alert alert`

    listarCurso();
    let est = {
        id: vid,
        nombre: vnombre,
        duracion: vduracion,
        valor: vvalor,
        estado: "disponible"
    };

    let duplicado = listaCurso.find(nom => nom.id == vid)

    if (!duplicado) {
        listaCurso.push(est);
        //console.log(listaCurso)
        guardarCurso();
        msn = `${msn}-success" role="alert"> El curso <strong>${vnombre}</strong> se ha agregado !`

    } else {
        //console.log('ya existe otro estudiate con ese nombre')
        msn = `${msn}-danger" role="alert"> El curso  con ID <strong>${vid}</strong> y se llama <strong>${duplicado.nombre}</strong>`

    }
    msn = msn + "</div>"
        // console.log(msn)
    return msn;

})

const listarEstudiante = () => {
    try {
        listaEstudiantes = JSON.parse(fs.readFileSync("./src/estudiante.json"));
    } catch (error) {
        listaEstudiantes = [];
    }
};

const guardarEstudiante = () => {
    let datos = JSON.stringify(listaEstudiantes);
    fs.writeFile("./src/estudiante.json", datos, (err) => {
        if (err) throw (err);
    });
};

hbs.registerHelper('crearEstidiante', (vdocumento, vnombre, vemail, vtelefono, vcurso) => {

    let msn = `<div class="alert alert`
    console.log("el telefono que llego es: ", vtelefono)
    listarEstudiante();
    let est = {
        documento: vdocumento,
        nombre: vnombre,
        email: vemail,
        telefono: vtelefono,
        curso: vcurso
    };

    let duplicado = listaEstudiantes.find(doc => doc.documento == vdocumento)

    if (!duplicado) {
        listaEstudiantes.push(est);
        guardarEstudiante();
        msn = `${msn}-success" role="alert"> El estudiante <strong>${vnombre}</strong> se matriculo en el curso ${vcurso}`

    } else {
        if (vcurso != duplicado.curso) {
            listaEstudiantes.push(est);
            console.log(listaEstudiantes)
            guardarEstudiante();
            msn = `${msn}-success" role="alert"> El estudiante <strong>${vnombre}</strong> se matriculo en el curso ${vcurso}`
        } else {
            msn = `${msn}-danger" role="alert"> El estudiante con ID <strong>${vdocumento}</strong> ya esta matriculado en el curso ${vcurso} por lo cual no se pudo maricular`
        }
        //console.log('ya existe otro estudiate con ese nombre')
        // msn = `${msn}-danger" role="alert"> el estudiante <strong>${vnombre}</strong> ya existe con documento <strong>${duplicado.documento}</strong>`

    }
    msn = msn + "</div>"
        // console.log(msn)
    return msn;
})

hbs.registerHelper('listarEstudiantes', () => {

    listaEstu = require('./estudiante.json');
    let texto = `<div class="container">\
    <div class="row ">\
    <table class="table table-hover">\
    <thead class="card-panel grey">\
      <tr>\
        <th class="header center" scope="col sm-5 ">Documento</th>\
        <th class="header center" scope="col">Nombre</th>\
        <th class="header center" scope="col">email</th>\
        <th class="header center" scope="col">Telefono</th>\
        <th class="header center" scope="col">curso</th>\
      </tr>\
    </thead>\
    <tbody>`;
    listaEstu.forEach(curso => {

        texto = `${texto}
        <tr>
            <td class="header center" >${ curso.documento} </td>
            <td>${curso.nombre}</td>
            <td class="header center" >${curso.email} </td>
            <td class="header center" > ${curso.telefono}</td>
            <td class="header center" >${curso.curso}</td>
        </tr>`

    });
    texto = texto + '</tbody></table></div></div>'
    return texto;
})

hbs.registerHelper('guardarCurso', () => {
    let datos = JSON.stringify(listaCurso);
    fs.writeFile("./src/curso.json", datos, (err) => {
        if (err) throw (err);
        console.log('Archivo guardado con exito')
    });
})
hbs.registerHelper('guardarEstudiante', () => {
    try {
        return fs.statSync("./src/estudiante.json").isFile();
    } catch (e) {
        return false;
    }
    let datos = JSON.stringify(listaCurso);
    fs.writeFile("./src/estudiante.json", datos, (err) => {
        if (err) throw (err);
        console.log('Archivo guardado con exito')
    });
})


//////////////////////////////////////////////////////////
hbs.registerHelper('listarEstudiantesXCursos', () => {
    listaEstu = require('./estudiante.json');
    listaCursos = require('./curso.json');

    let texto = `<div class="container">

      <ul class="collapsible">`;
    listaCursos.forEach(curso => {
        //if (curso.estado == "disponible") {
        texto = `${texto}
      <li>
        <div class="collapsible-header">
            <i class="material-icons">folder_shared</i> ${curso.nombre}
            
        </div>
        <div class="collapsible-body">`

        //AQUI SE ABRE LA TABLA
        texto = `${texto} <div class="row ">\
        <table class="striped #c8e6c9 green lighten-4">\
        <thead class="card-panel green lighten-2">\
          <tr>\
            <th class="header center" scope="col sm-5 ">Documento</th>\
            <th class="header center" scope="col">Nombre</th>\
            <th class="header center" scope="col">email</th>\
            <th class="header center" scope="col">Telefono</th>\
            <th class="header center" scope="col">curso</th>\
            <th class="header center" scope="col"> </th>\
          </tr>\
         
        </thead>\
        <tbody>`
        listaEstu.forEach(est => {

            if (est.curso == curso.nombre) {
                console.log(est.nombre)
                texto = `${texto}
                <tr>
                    <td class="header center" >${est.documento} </td>
                    <td>${est.nombre}</td>
                    <td class="header center" >${est.email} </td>
                    <td class="header center" > ${est.telefono}</td>
                    <td class="header center" >${est.curso}</td>
                    <td class="header center" >  <a class="waves-effect btn red" ><i class="material-icons left">delete</i>Eliminar</a> </td>
                </tr>`
            }
        });
        // }
        texto = texto + '</tbody></table></div>'


    });



    //AQUI SE CIERRA

    texto = `${texto}</div></li>`
    texto = texto + '</ul></div>'
    return texto;
})