const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
}); 

function producto (title, price, id) {

        this.title= title;
        this.price = price;
        this.id = id;
    
    };

const nuevoProducto = new producto("Lapicera", 100);
const p1 = new producto('test', 1250)

async function save(newProd) {
        try{
            const objs = await getAll()
            let newId
            if (objs.length == 0) {
                newId = 1
            } else {
                newId = objs[objs.length - 1].id + 1
            }
            const newObj = {...newProd, id: newId}
            objs.push(newObj)
            await fs.promises.writeFile('./productos.txt', JSON.stringify(objs));
            return newId
        }
        catch(err){
            throw new Error(`Error al guardar: ${err}`)
        };
    };
    
    
    
async function getAll() {
        try{
                const objs = await fs.promises.readFile('./productos.txt', "utf-8");
                return JSON.parse(objs)
        }
        catch(err){
                console.log(err)
        }
};

        async function deleteAll() {
        try{
                return await fs.promises.unlink('./productos.txt')
        }
        catch(err){
                console.log(err)
        }
}


async function getById(id) {
        const objs = await getAll()
        const buscado = objs.find(elem => elem.id == id)
        return buscado
}


async function main() {

        console.log('muestro todo')
        let objs = await getAll();
        console.log(objs);

        console.log('guardo p1')
        let addingObj = await save(p1);
        console.log('id de p1: ', addingObj);

        console.log('muestro todo de nuevo')
        let newObjs = await getAll();
        console.log(newObjs);
        getById(6)
        console.log('buscando por id')
        let searching = await getById(6);
        console.log(searching);
}   
main()




app.get('./productos.txt', (req, res) => {
        res.send(getAll());
});

app.get('./productos.txt', (req, res) => {
        res.send(getById());
});