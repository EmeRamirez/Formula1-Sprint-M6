import * as fs from "fs";

export async function leerArchivo(url) {
    const data = await fs.promises.readFile(url, (err, data) => {
        if (err) throw err 
        return data
    });
    return await JSON.parse(data);
}

export async function escribirArchivo(url,data) {
    fs.writeFile(url, JSON.stringify(data), err => {
        if (err) throw console.log('No se pudo guardar el JSON');
    });
}