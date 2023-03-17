import * as fs from "fs";
import { Router } from "express";
import { calcularPos, leerArchivo } from "../utils/handlers.js";
const router = Router();

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
let arrPilotos;
router.get('/mantenedor', (req,res) => {
    leerArchivo('./data/resultados.json')
    .then(data => {
        let json = data;
        arrPilotos = Object.values(json);
        res.render("mantenedor",{pilotos:arrPilotos[0]})
    })
    .catch(err => {
        res.render("error");
    })  
})

router.post('/mantenedor', (req,res) => {
    // Se almacena el index del circuito
    let carreraIndex = req.body.select;
    //Si el index del circuito no es válido (-1), se recarga la página.
    if (carreraIndex == -1){  
        res.send("<script>alert('Seleccione una carrera, aweonao');window.location.href='/mantenedor'</script>");    
    } else {

    let arrCarrera = [];
    console.log(carreraIndex); 

     for (let i=0 ; i<=19 ; i++){
        let piloto = req.body['nombre'+i];
        let tiempo = parseFloat(req.body['tiempo'+i]);
        let check = Boolean(req.body['check'+i]);
 
        (check == true) ? tiempo = 999 : tiempo=tiempo;
        
        let obj = {nombre:piloto,tiempo:tiempo,abandono:check,posicion:0,puntaje:0};
        arrCarrera.push(obj);
     }

    arrCarrera.sort((a,b) => (a.tiempo - b.tiempo))

    calcularPos(arrCarrera);
    console.log(arrCarrera);

    res.render("mantenedor",{pilotos:arrPilotos[0]});

}    
})


export default router;