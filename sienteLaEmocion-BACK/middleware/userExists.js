const getDB = require('../database/getDB');

const userExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemos el id del usuario al que queremso acceder
        //const { idUser } = req.params;
        const idReqUser = req.userAuth.id;

        //Obtenemso el id del usuario, si esta eliminado no deberiamos poder acceder
        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ? AND deleted = false`,
            [idReqUser]
        );

        //si el suario no coincide con ninguno lanzamos un error
        if (users.length < 1) {
            const error = new Error('El usuario no existe ');
            error.httpStatus = 404;
            throw error;
        }

        //si todo ha ido bien pasamos el control a la sigiente funcion
        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;
