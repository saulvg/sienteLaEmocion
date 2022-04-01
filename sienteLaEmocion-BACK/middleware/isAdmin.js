//Middleware para comprobar que el usuario es el administrador

const jwt = require('jsonwebtoken');

const getDB = require('../database/getDB');

const isAdmin = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemos la cabezera de autorizacion
        const { authorization } = req.headers;

        //si no hay cabecera de autorizacion lanzamos un error
        if (!authorization) {
            const error = new Error('Falta cabecera de autorizacion');
            error.httpStatus = 401;
            throw error;
        }

        let tokenInfo;

        try {
            //Desencriptamos el token
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (_) {
            const error = new Error('El token no es vaildo');
            error.httpStatus = 401;
            throw error;
        }

        //Seleccionamos el usuario con el id que viene en el token
        const [users] = await connection.query(
            `
        SELECT active, deleted, role FROM users WHERE id = ?`,
            [tokenInfo.id]
        );

        //si el usuario no esta activo, esta borrado o no es admin, lanzamos un errro
        if (!users[0].active || users[0].deleted || users[0].role !== 'admin') {
            const error = new Error('El token no es valido');
            error.httpStatus = 401;
            throw error;
        }

        //si todo a ido bien inyectamos en el objeto 'request la info del token (id, role') en forma de una nueva propiedad admin
        req.admin = tokenInfo;

        // Pasamos el control a la siguiente función.
        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = isAdmin;
