const getDB = require('../../database/getDB');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const resetPass = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //obtenemos el código de recuperacion enviado al email y la nueva contraseña
        const { recoverCode, newPassword } = req.body;

        // si falta algun campo lanzamos error
        if (!recoverCode || !newPassword) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }
        // obtenemos al usuario con ese codigo de recuperacion
        const [users] = await connection.query(
            `SELECT id FROM users WHERE recoverCode = ?`,
            [recoverCode]
        );
        // si no existe ningún usuario con ese codigo de recuperacion lanzamos error
        if (users.length < 1) {
            const error = new Error('Código de recuperación incorrecto');
            error.httpStatus = 404;
            throw error;
        }
        // hasheamos contraseña
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // actualizamos la contraseña del usuario que tenga ese codigo de recuperación.
        //al no saber el id del usuario, se utiliza el recoverCode enviado al email para
        //identificar al usuario. recoverCode = id
        await connection.query(
            `UPDATE users SET password = ?, recoverCode = NULL, modifiedAt = ? WHERE id =?`,
            [hashedPassword, new Date(), users[0].id]
        );
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = resetPass;
