import * as fs from "fs";
import { Router } from "express";
import { calcularPos, leerArchivo } from "../utils/handlers.js";
const router = Router();

//===================GET===================//

router.get('/', (req,res) => {
    leerArchivo('./data/equipos.json')
    .then(data => {
        let json = data;
        let arrEquipos = Object.values(json.equipos);
        // console.log(arrEquipos);
        res.render("home",{equipos:arrEquipos});
    })
    .catch(err => {
        res.render("404");
        console.log("No se pudo leer el archivo.");
        res.render("error")
    })  
})

//===================GET===================//

let arrPilotos;
router.get('/mantenedor', (req,res) => {
    leerArchivo('./data/resulprueba.json')
    .then(data => {
        let json = data;
        arrPilotos = Object.values(json);
        // console.log(arrPilotos[0]);
        res.render("mantenedor",{pilotos:arrPilotos[0]})
    })
    .catch(err => {
        res.render("error");
    })  
})


//===================POST===================//

router.post('/mantenedor', (req,res) => {
    // Se almacena el index del circuito
    let carreraIndex = req.body.select;
    //Si el index del circuito no es válido (-1), se recarga la página.
    if (carreraIndex == -1){  
        res.send("<script>alert('Seleccione una carrera, aweonao');window.location.href='/mantenedor'</script>");    
    } else {

    //Por cada piloto participante de la carrera, se almacenan los datos del formulario como resultado en un arreglo nuevo
    let arrCarrera = [];
     for (let i=0 ; i<=2 ; i++){
        let piloto = req.body['nombre'+i];
        let tiempo = parseFloat(req.body['tiempo'+i]);
        let check = Boolean(req.body['check'+i]);
        let escud = req.body['escud'+i];
        
        //Si el valor del key abandono es true, el tiempo se establece en 999.
        (check == true) ? tiempo = 999 : tiempo=tiempo;
        
        //Se crea el objeto con los datos del competidor en la carrera y se inserta en el arreglo.
        let obj = {escuderia:escud,nombre:piloto,tiempo:tiempo,abandono:check,posicion:0,puntaje:0};
        arrCarrera.push(obj);
     }

    //Ordena los competidores(objetos) de forma ascendente según tiempo
    arrCarrera.sort((a,b) => (a.tiempo - b.tiempo))

    //Esta función asigna las posiciones y puntajes a los competidores
    calcularPos(arrCarrera);

     //Ahora leemos el archivo de circuitos
     leerArchivo('./data/circuitos.json')
     .then(data => {
        let json = data;
        let arrCircuitos = data.carrera;
        //Se ingresa un nuevo key al objeto del circuito correspondiente con la info de los competidores en dicha carrera
        arrCircuitos[carreraIndex].resultados = arrCarrera;
    
        //Finalmente se sobreescribe el JSON
        fs.writeFile("./data/circuitos.json", JSON.stringify(data), err => {
            if (err) throw console.log('No se pudo guardar el JSON');
        });
     })
     
    res.render("mantenedor",{pilotos:arrPilotos[0]});
}    
})


export default router;