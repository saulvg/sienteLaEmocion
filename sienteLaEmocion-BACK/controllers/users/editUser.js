const getDB = require('../../database/getDB');
const { generateRandomString, sendMail } = require('../../helpers');
const { PUBLIC_HOST } = process.env;

const editUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //comprobamos que el usuario que quiere editar el perfil es el mismo propietario del perfil (cosa que hacemos a traves de un middleware 'canEditUser')
        //comprobamos qu el usuario exista, cosa que hacemos con el middleware 'userExists'
        //comprobamos que el usuario tenga permisos (token) cosa que hacemos con el middleware 'isAuth'

        //Obtenemos el id del usuario que queremos editar
        //const { idUser } = req.params;
        const idReqUser = req.userAuth.id;

        //Obtenemso los campos editables del perfil
        const { username, newEmail, phone, biography, postalCode, dni_nie } =
            req.body;

        //si no hay ningun campo a editar lanzamso un error
        //Contra intuitivo, si no se guarda nada que mas da?
        /*if (!username && !newEmail && !phone && !biography && !postalCode) {
            const error = new Error('Faltan campos');
            error.http = 400;
            throw error;
        }*/

        //obtener los campos a editar del usuario
        const [users] = await connection.query(
            ` 
        SELECT username, email, phone, biography, postalCode, dni_nie FROM users WHERE id = ?`,
            [idReqUser]
        );

        /*
         * ###########
         * ## Email ##
         * ###########
         */

        //si hay email nuevo comprobamos que no sea igual al anterior

        if (newEmail && newEmail !== users[0].email) {
            //comprobamos que no exista ya en la base de datos
            const [userEmail] = await connection.query(
                `
           SELECT email FROM users WHERE email = ?`,
                [newEmail]
            );

            if (userEmail.length > 0) {
                const error = new Error('Ya existe un usuario con ese email');
                error.http = 409;
                throw error;
            }

            //Necesitamos un codigo de regisrto para cuando actualicemos el usuario tenga que reactivar su cuenta
            const registrationCode = generateRandomString(40);

            //si no salta ningun error actulizamos el valor en la base de datos
            await connection.query(
                `
            UPDATE users SET email = ?, modifiedAt = ?, registrationCode = ?, active = false WHERE id = ?`,
                [newEmail, new Date(), registrationCode, idReqUser]
            );

            //mensaje de reactivar su cuenta ya que a cambiado el email
            const emailBody = `
            Acabas de actualizar tu email en Siente la EMOCION!!.
            Pulsa este link para verificar tu cuenta: ${PUBLIC_HOST}/users/validate/${registrationCode} 
            `;

            //enviamos el email
            await sendMail({
                to: newEmail,
                subject: 'Activa tu usuario de Siente la EMOCION!!',
                body: emailBody,
            });
        }

        /*
         * ##############
         * ## UserName ##
         * ##############
         */

        //comprobamos si el nuevo username es distinto al anterior y si existe en nuevo username

        if (username && username !== users[0].username) {
            //comprobamos que no exista en la base de datos
            const [newUserName] = await connection.query(
                `
            SELECT id FROM users WHERE username = ?`,
                [username]
            );
            if (newUserName.length > 0) {
                const error = new Error('Ya existe un usuario con ese nombre');
                error.httpStatus = 409;
                throw error;
            }

            //si no salta ningun error actulizamos la base de datos
            await connection.query(
                `
            UPDATE users SET username = ?, modifiedAt = ? WHERE id = ?`,
                [username, new Date(), idReqUser]
            );
        }

        /*
         * ##############
         * ## Phone ##
         * ##############
         */

        if (phone) {
            //actulizamos la base de datos
            await connection.query(
                `
            UPDATE users SET phone = ?, modifiedAt = ? WHERE id = ?`,
                [phone, new Date(), idReqUser]
            );
        }

        /*
         * ##############
         * ## Biography ##
         * ##############
         */

        if (biography) {
            if (biography.length > 255) {
                const error = new Error(
                    'La descripcion no puede ser superior a 255 caracteres incluyendo espacios y signos de escritura'
                );
                error.httpStatus = 400; //no estoy seguro de que sea el error 400 preguntar
                throw error;
            }
            //actulizamos la base de datos
            await connection.query(
                `
            UPDATE users SET biography = ?, modifiedAt = ? WHERE id = ?`,
                [biography, new Date(), idReqUser]
            );
        }

        /*
         * ##############
         * ## Postal Code ##
         * ##############
         */

        if (postalCode) {
            //actulizamos la base de datos
            await connection.query(
                `
            UPDATE users SET postalCode = ?, modifiedAt = ? WHERE id = ?`,
                [postalCode, new Date(), idReqUser]
            );
        }

        if (dni_nie) {
            await connection.query(
                `
            UPDATE users SET dni_nie = ?, modifiedAt = ? WHERE id = ?`,
                [dni_nie, new Date(), idReqUser]
            );
        }
        /*
        //Obtenemos los datos del historial de actividades reservadas por el usuario con el id propietario del perfil
        const [experiences] = await connection.query(
            `
            SELECT 
                id,
                id_user,
                id_experiences
            FROM
                booking
            WHERE
                id_user = ? 

            `,
            [idReqUser]
        );
        //Guradamos los id de las experiencias que haya hecho dicho usuario
        const idExperiencesBooking = experiences.map(
            (idExp) => idExp.id_experiences
        );

        const userExperiences = [];
        for (const idExperienceBooking of idExperiencesBooking) {
            const [experience] = await connection.query(
                `
                SELECT
                    experiences.id, 
                    experiences.price, 
                    experiences.date, 
                    experiences.city, 
                    
                    experiences.photoHeader,
                    experiences_category.name AS category,
                    company.name AS company
                FROM experiences
                LEFT JOIN experiences_category ON (experiences.id_experiences_category = experiences_category.id)
                LEFT JOIN company ON (experiences.id_company= company.id)
                LEFT JOIN votes ON (experiences.id = votes.id_experiences)
                WHERE experiences.id = ?
                `,
                [idExperienceBooking]
            );
            userExperiences.push(experience[0]);
        }
*/
        res.send({
            status: 'ok',
            message: `Cambios actualizados con exito. Si has cambiado tu email no olvides activar de nuevo tu usuario en el mensaje que te hemos enviado a tu correo electronico`,

            /* 
                esxperiemces: experiences, */
            /* prueba: experiences.map((idExp) => idExp.id_experiences), */
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = editUser;
