import * as fs from "fs";
import { Router } from "express";
import { leerArchivo } from "../utils/functions.js";
const router = Router();

router.get('/', (req,res) => {
    leerArchivo('./data/equipos.json')
    .then(data => {
        let equipos = data;
        let arrEquipos = Object.values(equipos.equipos);
        console.log(arrEquipos[0]);
        res.render("home",{equipos:arrEquipos});
    })
    .catch(err => {
        console.log("No se pudo leer el archivo.");
    })
    
})


export default router;