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