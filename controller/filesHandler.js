const fs = require('fs');

class Contenedor {

    constructor(fileName) {
        this.fileName=fileName;
        this.id = 0;
        this.data =[];
    }

    async save(objeto) {
        await this.getAll();
        this.id++;
        this.data.push({
            id:this.id,
            product: objeto
        })
        await fs.promises.writeFile(`./src/Productos/${this.fileName}`,JSON.stringify(this.data, null, 2));
        return ({
            id:this.id,
            product: objeto
        });
    }

    async getById(id) {
        await this.getAll();
        return this.data.find((producto) => producto.id === parseInt(id))
    }

    async updateById(id,productoRecibido) {
        id = parseInt(id);

        await this.getAll();
        await fs.promises.unlink(`./src/Productos/${this.fileName}`);

        const productoActualizado = this.data.find((producto) => producto.id === id);
        productoActualizado.product = productoRecibido;

        const data = this.data.map((producto) => producto.id === id ? productoActualizado : producto);
        await fs.promises.writeFile(`./src/Productos/${this.fileName}`,JSON.stringify(data, null, 2));
        return productoActualizado
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(`./src/Productos/${this.fileName}`, 'utf-8')
            if (data) {
                this.data = JSON.parse(data);
                this.data.map((producto) => {
                    if (this.id < producto.id) {
                        this.id = producto.id
                    }
                })
                return this.data;
            }
        } catch (error) {
            return 
        }
    }

    async deleteById(id) {
        id = parseInt(id);
        await this.getAll();
        await fs.promises.unlink(`./src/Productos/${this.fileName}`);
        const data = this.data.filter((producto) => producto.id !== id);
        await fs.promises.writeFile(`./src/Productos/${this.fileName}`,JSON.stringify(data, null, 2));
    }

    async deleteAll() {
        await fs.promises.unlink(`./src/Productos/${this.fileName}`);
        this.id = 0;
        this.data =[];
    }

}

module.exports = Contenedor

