import * as fs from "fs";

export async function leerArchivo(url) {
    const data = await fs.promises.readFile(url, (err, data) => {
        if (err) throw err 
        return data
    });
    return await JSON.parse(data);
}

// export async function escribirArchivo(data) {
//     fs.writeFile("./db.json", JSON.stringify(data), err => {
//         if (err) throw err
//     });
// }

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