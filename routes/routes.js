import * as fs from "fs";
import { Router } from "express";
import { leerArchivo } from "../utils/handlers.js";
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
    leerArchivo('./data/resulprueba.json')
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
    let carreraIndex = req.body.select;
    console.log(carreraIndex); 

     for (let i=0 ; i<=2 ; i++){
        let piloto = req.body['nombre'+i];
        let tiempo = parseFloat(req.body['tiempo'+i]);
        let check = Boolean(req.body['check'+i]);
 
        (check == true) ? tiempo = 999 : tiempo=tiempo;
        
        let obj = {nombre:piloto,tiempo:tiempo,abandono:check};
        console.log(obj);
     }
    

    res.render("mantenedor",{pilotos:arrPilotos[0]});
})


export default router;