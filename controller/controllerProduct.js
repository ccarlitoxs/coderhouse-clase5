const fs = require('fs');

class productController {
    //Listado de productos
    async listaProductos (req, res) {
        try{
            const data = await fs.promises.readFile('./db/product.json', 'utf-8');
            let dataJson = JSON.parse(data);
            res.status(200).render('index', {dataJson} );
        }
        catch{
            res.status(400).send('Error al mostrar los productos');
        }
    }

    //Agregar un producto nuevo 
    async agregarProductos (req, res) {
        try{
            const data = await fs.promises.readFile('./db/product.json', 'utf-8');
            let dataJson = JSON.parse(data);

            let producto = {
                    id:dataJson.length + 1,
                    name: req.body.name,
                    price: req.body.price,
                    url: req.body.url
            }
            dataJson.push({product: producto});    
            
            let productJson = JSON.stringify(dataJson, null, 2)
            await fs.promises.writeFile(`./db/product.json`,productJson);
            res.status(200).redirect('/');
        } 
        catch {
            res.status(400).send('Error al guardar el prodcuto');
        }
    }
}

module.exports = productController