import hbs from 'hbs';
import * as fs from 'fs';

hbs.registerHelper('sumarArreglo',(arr)=>{
    let acumulador = 0;
    for (let i=0 ; i < arr.length ; i++){
        acumulador = acumulador + arr[i]
    }
    return acumulador;
})

hbs.registerHelper('contarAbandonos',(arr)=>{
    let acumulador = 0;
    for (let i=0 ; i < arr.length ; i++){
        if (arr[i] == true){
            acumulador++;
        }
    }
    return acumulador;
})

hbs.registerHelper('sumarIndex',(num)=>{
   
    return parseInt(num+1);
})

hbs.registerHelper('visualizarTiempo',(tiempoenms)=>{
    let totalseg = Math.trunc(tiempoenms/1000)
    let ms = tiempoenms%1000
    let seg = (Math.trunc(tiempoenms/1000))%60
    let min = (Math.trunc(totalseg/60))%60
    let totalmin = Math.trunc(totalseg/60)
    let hr = Math.trunc(totalmin/60);
    return `${hr}:${min}:${seg}:${ms}`
})

//El primer parámetro debe contener el tiempo del ganador en milisegundos, el segundo parámetro el tiempo del competidor que desea mostrar en formato de diferencia.
hbs.registerHelper('mostrarDiferenciaTpo',(tiempo1)=>{

    let dif = tiempo2 - tiempo1;
    return `+${dif/1000}s`;
})

// hbs.registerHelper('visTiempo',(tiempo1,index)=>{
    
//     if (index == 0){
//         let compare = tiempo1;
//         let totalseg = Math.trunc(tiempo1/1000)
//         let ms = tiempo1%1000
//         let seg = (Math.trunc(tiempo1/1000))%60
//         let min = (Math.trunc(totalseg/60))%60
//         let totalmin = Math.trunc(totalseg/60)
//         let hr = Math.trunc(totalmin/60);
//         return `${hr}:${min}:${seg}:${ms}`
//     }else{
//         let dif = tiempo1 - compare;
//         return `+${dif/1000}s`;
//     }
  
// })