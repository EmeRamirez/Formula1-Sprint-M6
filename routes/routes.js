import * as fs from "fs";
import { Router } from "express";
import { calcularPos, escribirArchivo, leerArchivo, convMS , sumarPuntos , contAbandonos, mostrarTiempo, mostrarDif } from "../utils/handlers.js";
const router = Router();


//===================GET===================//

router.get('/mantenedor', (req,res) => {
    leerArchivo('./data/pilotos.json')
    .then(data => {
        let json = data;
        let arrPilotos = Object.values(json);
        
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
    }else{
        let dataPilotos = JSON.parse(fs.readFileSync("./data/pilotos.json"));
        let dataCircuitos = JSON.parse(fs.readFileSync("./data/circuitos.json"));
        let arrPilotos = dataPilotos.piloto;
        let arrCircuitos = dataCircuitos.carrera;

        /*Inicializamos en 0 los parámetros posiciones, tiempo y abandonos para más adelante sobreescribir la
        información ordenada por carrera en el JSON del piloto*/
        
        Object.values(arrPilotos).forEach(el => {
            for (let i=0 ; i < Object.values(arrCircuitos).length ; i++){
                (!el.posiciones[i]) ? el.posiciones[i] = 0 : el.posiciones[i];
                (!el.tiempos[i]) ? el.tiempos[i] = 0 : el.tiempos[i];
                (!el.abandonos[i]) ? el.abandonos[i] = 0 : el.abandonos[i];
                (!el.puntajes[i]) ? el.puntajes[i] = 0 : el.puntajes[i];
            }
        })

        //Por cada piloto participante de la carrera, se almacenan los datos del formulario en un arreglo para luego enviarlo al JSON de pilotos y circuitos.
        let arrCarrera = [];
        for (let i=0 ; i < Object.values(arrPilotos).length ; i++){
            let piloto = req.body['nombre'+i];
            let hrs = parseInt(req.body['hora'+i]);
            let mins = parseInt(req.body['minuto'+i]);
            let segs = parseInt(req.body['segundo'+i]);
            let mlsegs = parseInt(req.body['mlseg'+i]);
            let tiempo = convMS(hrs,mins,segs,mlsegs);
            let check = Boolean(req.body['check'+i]);
            let escud = req.body['escud'+i];
            
            //Si el valor del key abandono es true, el tiempo se establece en 999.
            (check == true) ? tiempo = 999999999 : tiempo=tiempo;

            //Se envían los datos al arreglo de pilotos (pilotos.json)
            
            Object.values(arrPilotos)[i].tiempos[carreraIndex] = tiempo;
            Object.values(arrPilotos)[i].abandonos[carreraIndex] = check;
            
            
            //Se crea el objeto con los datos del competidor en la carrera y se inserta en el arreglo.
            let obj = {escuderia:escud,nombre:piloto,tiempo:tiempo,abandono:check,posicion:0,puntaje:0};
            arrCarrera.push(obj);
        }

        //Ordena los competidores(objetos) de forma ascendente según tiempo.
        arrCarrera.sort((a,b) => (a.tiempo - b.tiempo))

        //Esta función asigna las posiciones y puntajes a los competidores
        calcularPos(arrCarrera);
        console.log(arrCarrera);

        //Se asignan los puntajes y posiciones correspondientes, al historial de carreras del piloto.
        Object.values(arrCarrera).forEach(el => {
            Object.values(arrPilotos).forEach(e => {
                if (el.nombre == e.nombre){
                    e.puntajes[carreraIndex] = el.puntaje
                    e.posiciones[carreraIndex] = el.posicion
                }
            })
        })
        //Se ingresa un nuevo key al objeto del circuito correspondiente con la info de los competidores en dicha carrera
        arrCircuitos[carreraIndex].resultados = arrCarrera;

        //Se calculan los puntos por equipo y se asignan al JSON de equipos
        let dataEquipos = JSON.parse(fs.readFileSync('./data/equipos.json'))
        let arrEquipos = dataEquipos.equipos;

        Object.values(arrEquipos).forEach(eq => { eq.puntos = 0})
        Object.values(arrEquipos).forEach(eq => {
            Object.values(arrPilotos).forEach(pil => {
                if (eq.escuderia == pil.escuderia){
                    eq.puntos = eq.puntos + sumarPuntos(pil.puntajes)
                }
            })
        })
        //Ordena los equipos(objetos) de forma descendente según puntaje.
        arrEquipos.sort((a,b) => (b.puntos - a.puntos));

        //Finalmente se sobreescriben los cambios en los archivos JSON correspondientes
        fs.writeFileSync('./data/equipos.json',JSON.stringify(dataEquipos));
        fs.writeFileSync('./data/circuitos.json',JSON.stringify(dataCircuitos));
        fs.writeFileSync('./data/pilotos.json',JSON.stringify(dataPilotos));
        res.send("<script>alert('La información fue almacenada exitosamente.');window.location.href='/mantenedor'</script>");
    }
})

router.get('/confirmacion' , (req,res) => {
    let dataPilotos = JSON.parse(fs.readFileSync("./data/pilotos.json"));
    let dataCircuitos = JSON.parse(fs.readFileSync("./data/circuitos.json"));
    let arrPilotos = dataPilotos.piloto;
    let arrCircuitos = dataCircuitos.carrera;

    //Se calculan los puntos por equipo y se asignan al JSON de equipos
    let dataEquipos = JSON.parse(fs.readFileSync('./data/equipos.json'))
    let arrEquipos = dataEquipos.equipos;

    // console.log(arrEquipos);
    // console.log(arrPilotos);
    Object.values(arrEquipos).forEach(eq => { eq.puntos = 0})
    Object.values(arrEquipos).forEach(eq => {
        Object.values(arrPilotos).forEach(pil => {
            if (eq.escuderia == pil.escuderia){
                eq.puntos = eq.puntos + sumarPuntos(pil.puntajes)
            }
        })
    })
    //Ordena los equipos(objetos) de forma descendente según puntaje.
    arrEquipos.sort((a,b) => (b.puntos - a.puntos))
    fs.writeFileSync('./data/equipos.json',JSON.stringify(dataEquipos));
    res.render("confirmacion")
})


//===================GET===================//

router.get('/drivers', (req,res) => {
    leerArchivo('./data/pilotos.json')
    .then(data => {
        let arrPilotos = Object.values(data.piloto);
        
        //Se ordenan los pilotos por puntos
        arrPilotos.sort((a,b) => (sumarPuntos(b.puntajes) - (sumarPuntos(a.puntajes))));

        res.render("drivers",{pilotos:arrPilotos});
    })
    .catch(err => {
        res.render("404");
        console.log("No se pudo leer el archivo.");
        res.render("error")
    })  
})


//===================GET===================//

router.get('/races', (req,res) => {
    let carreraIndex = 0;//req.body.select;
    leerArchivo('./data/circuitos.json')
    .then(data => {
        let arrCarrera = data.carrera[carreraIndex].resultados;

        let copyArrCarrera = arrCarrera.slice();

        let tiempo1=0;
        copyArrCarrera.forEach((el,index)=>{
            if (index==0){
                tiempo1 =el.tiempo;
                el.tiempo=mostrarTiempo(el.tiempo)
                
            }else{
                el.tiempo=mostrarDif(tiempo1,el.tiempo)
            }
            (el.abandono)? el.tiempo="N/F":el.abandono;
        })
        // console.log(copyArrCarrera);
        
        res.render("races",{carrera:copyArrCarrera});
    })
    .catch(err => {
        console.log('Error al leer el JSON');
        res.render("error",{mensaje:"Error"})})

})


//===================POST===================//

router.post('/races', (req,res) => {
    let carreraIndex = req.body.selectcarrera;
    if (carreraIndex == -1){
        res.send("<script>alert('Selección no válida');window.location.href='/races'</script>");
    } else {
    leerArchivo('./data/circuitos.json')
    .then(data => {
        let arrCarrera = data.carrera[carreraIndex].resultados;

        let copyArrCarrera = arrCarrera.slice();

        let tiempo1=0;
        copyArrCarrera.forEach((el,index)=>{
            if (index==0){
                tiempo1 =el.tiempo;
                el.tiempo=mostrarTiempo(el.tiempo)
                
            }else{
                el.tiempo=mostrarDif(tiempo1,el.tiempo)
            }
            (el.abandono)? el.tiempo="N/F":el.abandono;
        })
    
        
        res.render("races",{carrera:copyArrCarrera});

    })
}
})



//===================GET===================//

router.get('/', (req,res) => {
    leerArchivo('./data/equipos copy.json')
    .then(data => {
        let arrEquipos = Object.values(data.equipos);
        res.render("home",{equipos:arrEquipos});
    })
    .catch(err => {
        res.render("404");
        console.log("No se pudo leer el archivo.");
        res.render("error")
    })  
})



export default router;