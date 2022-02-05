const getDB = require('../database/getDB');

const entryExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id de la entrada.
        const { idEntry } = req.params;

        // Tratamos de obtener la entrada en la base de datos.
        const [entries] = await connection.query(
            `SELECT id FROM entries WHERE id = ?`,
            [idEntry]
        );

        // Si la entrada no existe lanzamos un error.
        if (entries.length < 1) {
            const error = new Error('La entrada no existe');
            error.httpStatus = 404;
            throw error;
        }

        // Pasamos el control a la siguiente función.
        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = entryExists;
