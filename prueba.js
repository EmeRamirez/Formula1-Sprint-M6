import { leerArchivo } from "./utils/handlers";
import * as fs from "fs";
import { globalAgent } from "http";

// let horainicio = "15:00:00.000"
// let inicioCarrera = new Date(2023,6,5,15,00,00,00);
// console.log(inicioCarrera);

// let finalPiloto= new Date(2023,6,5,15,53,25,654);
// console.log(finalPiloto);

// let tiempoPiloto = finalPiloto - inicioCarrera; 
// console.log(tiempoPiloto);

// totalenMS = tiempoPiloto/1000;
// console.log(totalenMS);
// let ms = tiempoPiloto%1000;
// console.log(`MS: ${ms}`);

// console.log(Math.trunc(totalenMS));
// let totalenSEG = Math.trunc(tiempoPiloto/1000);
// let seg = totalenSEG%60;
// console.log(`SEG: ${seg}`);


// console.log(totalenSEG);
// let totalenMIN = Math.trunc(totalenSEG/60);
// let mins = totalenMIN%60;
// console.log(`MINS: ${mins}`);

// console.log(totalenMIN);
// let hrs = Math.trunc(totalenMIN/60);
// console.log(hrs);

// let finalPiloto2 = new Date(2023,6,5,15,53,39,235)
// let finalPiloto3 = new Date(2023,6,5,15,53,51,896)
// let finalPiloto4 = new Date(2023,6,5,15,54,58,123)

// let diferencia2 = finalPiloto2 - finalPiloto
// console.log(`Piloto 2: +${diferencia2/1000}s`);

// let diferencia3 = finalPiloto3 - finalPiloto
// console.log(`Piloto 3: +${diferencia3/1000}s`);

// let diferencia4 = finalPiloto4 - finalPiloto
// console.log(`Piloto 4: +${diferencia4/1000}s`);

// let stringy = JSON.stringify(new Date(finalPiloto));
// console.log(stringy);

// let horita = new Date(JSON.parse(stringy))
// console.log(horita);

// console.log(`Piloto 2: +${diferencia2/1000}s`);
// console.log(`Piloto 3: +${diferencia3/1000}s`);
// console.log(`Piloto 4: +${diferencia4/1000}s`);


// function convMS(hr,min,seg,ms){
//     let enMS = (hr*3600000)+(min*60000)+(seg*1000)+ms
//     return enMS;
// }

// function mostrarTiempo(tiempoenms){
//     console.log("===============");
//     let totalseg = Math.trunc(tiempoenms/1000)
//     let ms = tiempoenms%1000
//     let seg = (Math.trunc(tiempoenms/1000))%60
//     let min = (Math.trunc(totalseg/60))%60
//     let totalmin = Math.trunc(totalseg/60)
//     let hr = Math.trunc(totalmin/60);
//     return `${hr}:${min}:${seg}:${ms}`
// }

// //El primer parámetro debe contener el tiempo del ganador en milisegundos, el segundo parámetro el tiempo del competidor que desea mostrar en formato de diferencia.
// function mostrarDif(ms1,ms2){
//     let dif = ms2 - ms1;
//     return `+${dif/1000}s`;
// }

// let tiempo1 = convMS(0,53,25,654);
// let tiempo2 = convMS(0,53,39,235);
// let tiempo3 = convMS(2,24,51,214)
// mostrarTiempo(tiempo3-tiempo1);

// let diferenciaSegundos = mostrarDif(tiempo1,tiempo2);
// console.log(diferenciaSegundos);


router.post('/mantenedor', (req,res) => { 
    let carreraIndex = req.body.select;
    if (carreraIndex == -1){  
        res.send("<script>alert('Seleccione una carrera, aweonao');window.location.href='/mantenedor'</script>");    
    }
        let arrPilotos = fs.readFileSync("./data/piloto.");
        let arrCircuitos = fs.readFileSync("./data/circuitos.");

    console.log(arrPilotos);
    console.log(arrCircuitos);
       


    
})
