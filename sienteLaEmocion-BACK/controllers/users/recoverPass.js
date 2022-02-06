const getDB = require('../../database/getDB');

const { generateRandomString, sendMail } = require('../../helpers');

const recoverPass = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // obtenemos el email del usuario
        const { email } = req.body;

        //si falta el email lanzamos error
        if (!email) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        // comprobamos si el email existe en la base de datos
        const [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        // si existe un usuario con ese email se envia email con codigo de
        //recuperacion

        if (users.length > 0) {
            //generamos codigo de recuperacion
            const recoverCode = generateRandomString(20);
            //body del mensaje
            const emailBody = `Se solicitó un cambio de contraseña para el usuario registrado con este email en *Siente la emoción* 
            El código de recuperación es: ${recoverCode} 
            Si no has pedido tú el cambio de contraseña por favor ignora este email`;

            // enviamos el email
            await sendMail({
                to: email,
                subject: 'Cambio de contraseña Siente la emoción',
                body: emailBody,
            });
            //agregamos codigo de recuperación al usuario con ese email
            await connection.query(
                `UPDATE users SET recoverCode = ?, modifiedAt = ? WHERE email = ?`,
                [recoverCode, new Date(), email]
            );
        }
        res.send({
            status: 'ok',
            message:
                'Si el email existe se ha enviado un código de recuperación',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = recoverPass;
