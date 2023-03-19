import * as fs from "fs";

//Funcion para leer un archivo JSON
export async function leerArchivo(url) {
    const data = await fs.promises.readFile(url, (err, data) => {
        if (err) throw err 
        return data
    });
    return await JSON.parse(data);
}


//Funcion para sobreescribir un archivo JSON
export async function escribirArchivo(url,data) {
    fs.writeFile(url, JSON.stringify(data), err => {
        if (err) throw console.log('No se pudo guardar el JSON');
    });
}


//Funcion para convertir de horas a milisegundos
export function convMS(hr,min,seg,ms){
    let enMS = (hr*3600000)+(min*60000)+(seg*1000)+ms
    return enMS;
}

export function mostrarTiempo(tiempoenms){
    console.log("===============");
    let totalseg = Math.trunc(tiempoenms/1000)
    let ms = tiempoenms%1000
    let seg = (Math.trunc(tiempoenms/1000))%60
    let min = (Math.trunc(totalseg/60))%60
    let totalmin = Math.trunc(totalseg/60)
    let hr = Math.trunc(totalmin/60);
    return `${hr}:${min}:${seg}:${ms}`
}

//El primer parámetro debe contener el tiempo del ganador en milisegundos, el segundo parámetro el tiempo del competidor que desea mostrar en formato de diferencia.
export function mostrarDif(tiempo1,tiempo2){
    let dif = tiempo2 - tiempo1;
    return `+${dif/1000}s`;
}


//Funcion para calcular puntaje del piloto según posicion
export function calcularPos(arr){
    arr.forEach((e,index) => {
        if (index == 0 && !e.abandono){
            e.posicion = 1;
            e.puntaje = 25;
        } else if (index == 1 && !e.abandono){
            e.posicion = 2;
            e.puntaje = 18;
        } else if (index == 2 && !e.abandono){
            e.posicion = 3;
            e.puntaje = 15;
        } else if (index == 3 && !e.abandono){
            e.posicion = 4;
            e.puntaje = 12;
        } else if (index == 4 && !e.abandono){
            e.posicion = 5;
            e.puntaje = 10;
        } else if (index == 5 && !e.abandono){
            e.posicion = 6;
            e.puntaje = 8;
        } else if (index == 6 && !e.abandono){
            e.posicion = 7;
            e.puntaje = 6;
        } else if (index == 7 && !e.abandono){
            e.posicion = 8;
            e.puntaje = 4;
        } else if (index == 8 && !e.abandono){
            e.posicion = 9;
            e.puntaje = 2;
        } else if (index == 9 && !e.abandono){
            e.posicion = 10;
            e.puntaje = 1;
        } else {
            e.posicion = index+1;
        }
    })
};