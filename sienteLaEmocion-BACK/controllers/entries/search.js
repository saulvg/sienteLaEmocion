const getDB = require('../../database/getDB');

const search = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos los posibles query params.
        const { search, order, direction } = req.query;

        // Posibles valores para "order".
        const validOrderOptions = ['title', 'createdAt', 'votes'];

        // Posibles valores para "direction".
        const valirDirectionOptions = ['desc', 'asc'];

        // Establecemos el orden por defecto en caso de que la variable "order"
        // no exista o su contenido sea incorrecto. Si la variable "order" existe
        // y tiene un contenido correcto nos quedamos con ese valor.
        const orderBy = validOrderOptions.includes(order) ? order : 'createdAt';

        // Lo mismo que el caso anterior pero con la dirección.
        const orderDirection = valirDirectionOptions.includes(direction) ? direction : 'desc';

        // Variable donde almacenaremos las experiencias.
        let experiences;

        // Si la variable "search" no está vacía filtramos todas las experiencias en cuya propiedad
        // "title" o "description" exista el string contenido en "search".
        if(search) {
            [experiences] = await connection.query(`
            SELECT experiences.id, experiences.name, `)
        }


    }catch (error){
        next(error)
    }finally{
        if(connection) connection.release()
    }

module.exports = search