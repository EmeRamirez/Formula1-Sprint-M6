import * as fs from "fs";
import { Router } from "express";
import { leerArchivo } from "../utils/handlers.js";
const router = Router();

router.get('/', (req,res) => {
    leerArchivo('./data/equipos.json')
    .then(data => {
        let json = data;
        let arrEquipos = Object.values(json.equipos);
        console.log(arrEquipos);
        res.render("home",{equipos:arrEquipos});
    })
    .catch(err => {
        console.log("No se pudo leer el archivo.");
    })  
})

router.get('/mantenedor', (req,res) => {
   res.render("mantenedor")
})


export default router;