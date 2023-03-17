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
        console.log("No se pudo leer el archivo.");
        res.render("error")
    })  
})

router.get('/mantenedor', (req,res) => {
    leerArchivo('./data/resultados.json')
    .then(data => {
        let json = data;
        let arrPilotos = Object.values(json);
        res.render("mantenedor",{pilotos:arrPilotos[0]})
    })
    .catch(err => {
        res.render("error");
    })
   
})


export default router;