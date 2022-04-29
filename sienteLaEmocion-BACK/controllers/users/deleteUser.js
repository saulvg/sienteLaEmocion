const getDB = require('../../database/getDB');
const { deletePhoto, generateRandomString } = require('../../helpers');

const deleteUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id del usuario que queremos borrar / anonimizar.
        //const { idUser } = req.params;
        const idReqUser = req.userAuth.id;

        // Si el id del usuario que queremos eliminar es el administrador principal (id: 1)
        // lanzamos un error.
        if (Number(idReqUser) === 1) {
            const error = new Error(
                'El administrador principal no puede ser eliminado'
            );
            error.httpStatus = 403;
            throw error;
        }

        // Obtenemos el avatar del usuario.
        const [users] = await connection.query(
            `SELECT avatar FROM users WHERE id = ?`,
            [idReqUser]
        );

        // Si el usuario tiene un avatar lo borramos del servidor.
        if (users[0].avatar) {
            await deletePhoto(users[0].avatar);
        }

        // Anonimizamos el usuario.
        await connection.query(
            `
                UPDATE users
                SET password = ?, username = ?, dni_nie = "[deleted]", phone = 0, biography = "[deleted]", postalCode = 0, email = ?, avatar = NULL, active = 0, deleted = 1, modifiedAt = ?
                WHERE id = ?
            `,
            [
                generateRandomString(20),
                generateRandomString(20),
                generateRandomString(20),
                new Date(),
                idReqUser,
            ]
        );

        res.send({
            status: 'ok',
            message: 'Usuario eliminado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteUser;
