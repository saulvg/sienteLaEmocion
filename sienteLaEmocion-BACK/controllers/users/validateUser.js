const getDB = require('../../database/getDB');

const validateUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el codigo de registro
        const { registrationCode } = req.params;

        //Comprobamos si existe algun usuario pendiente de validar
        const [users] = await connection.query(
            `SELECT id FROM users WHERE registrationCode = ?`,
            [registrationCode]
        );

        //Si no hay usuarios pendientes de validar con ese codigo de registro lanzamos un error
        if (users.length < 1) {
            const error = new Error(
                'No hay usuarios pendientes de validar con ese codigo de registro'
            );
            error.httpStatus = 404;
            throw error;
        }

        //sino se ha activado el error del if anterior significa que queda algun usuario pendiente de validar
        //Activamos el usuario y eliminamos el codigo de registro
        await connection.query(
            `UPDATE users SET active = true, registrationCode = NULL WHERE registrationCode = ?`,
            [registrationCode]
        );

        res.redirect('http://localhost:3000');
        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = validateUser;
