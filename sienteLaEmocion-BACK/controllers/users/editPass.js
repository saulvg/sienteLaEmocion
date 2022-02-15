const getDB = require('../../database/getDB');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const editPass = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();
        // id usuario
        //const { idUser } = req.params;
        const idReqUser = req.userAuth.id;

        // contraseña vieja y nueva
        const { oldPass, newPass } = req.body;
        // contraseña del usuario en el que estamos. para comprobar
        // que X usuario tiene esa contraseña y que está en la base de datos
        const [users] = await connection.query(
            `SELECT password FROM users WHERE id = ?`,
            [idReqUser]
        );
        // guardamos en una variable un booleano : contraseña correcta o incorrecta
        const isValid = await bcrypt.compare(oldPass, users[0].password);
        // si es incorrecta
        if (!isValid) {
            const error = new Error('La contraseña no es correcta');
            error.httpStatus = 401;
            throw error;
        }

        //hasheamos la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPass, saltRounds);

        //actualizamos base de datos

        await connection.query(
            `UPDATE users SET password = ?, modifiedAt = ? WHERE id = ?`,
            [hashedPassword, new Date(), idReqUser]
        );
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = editPass;
