const getDB = require('../../database/getDB');
const { sendMail } = require('../../helpers');
//const { experienceVotes } = require('../entries');

// experienceVotes
const newBooking = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos las propiedades del body que el usuario completa para hacer la reserva

        const { username, email, phone, dni_nie, date, postalCode, message } =
            req.body;

        // Obtenemos el id de la actividad que se quiere reservar
        const { idExperience } = req.params;
        // Obtenemos el id del usuario que está haciendo la reserva
        const idReqUser = req.userAuth.id;
        // Si falta algún campo lanzamos un error.
        if (
            !username ||
            !email ||
            !phone ||
            !dni_nie ||
            !date ||
            !postalCode ||
            !message
        ) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }
        /*const [users] = await connection.query(
            `SELECT email FROM users WHERE id = ?`,
            [idReqUser]
        );*/
        ///////////////////////////
        //Obtener lista de actividades para saber qué actividad reserva el usuario
        // Obtenemos la información de la entrada de la base de datos.
        const [activities] = await connection.query(
            `
            SELECT 
            experiences.id, 
            experiences.createdAt, 
            experiences.id_user, 
           
            experiences.capacity, 
            experiences.price, 
            experiences.date, 
            experiences.city, 
            experiences.street, 
            experiences.number, 
            experiences.postalCode, 
            experiences.longitude, 
            experiences.latitude, 
            experiences.text_1, 
            experiences.text_2, 
            experiences.text_3, 
            AVG(IFNULL(votes.vote, 0)) AS votes_entry 
        FROM experiences
        LEFT JOIN votes ON (experiences.id = votes.id_experiences)

        WHERE experiences.id = ?`,

            [idExperience]
        );
        const [photos] = await connection.query(
            `SELECT id FROM experiences_photos WHERE id_experiences = ?`,
            [idExperience]
        );
        const [categories] = await connection.query(
            `SELECT id FROM experiences_category WHERE id_experiences = ?`,
            [idExperience]
        );
        const [votes] = await connection.query(
            `SELECT vote FROM votes WHERE id_experiences =?`,
            [idExperience]
        );

        `INSERT INTO votes (id_experiences, vote) VALUES (?,?)`,
            [idExperience, votes[0].vote];
        //LEFT JOIN experiences_photos ON (experiences.id = experiences_photos.id_experiences)

        /////////////////////////
        // Creamos la reserva y obtenemos el valor que retorna "connection.query".
        //AQUI METERLA EN LA LISTA DE ACTIVIDADES QUE REALIZÓ EL USUARIO((?))
        //AÑADIR CREATED AT
        const [newBooking] = await connection.query(
            `INSERT INTO booking (id_experiences, id_user, createdAt) VALUES (?, ?,?)`,

            [idExperience, idReqUser, new Date()]
        );
        //  const idReserva = newBooking.insertId;
        if (activities[0].date < new Date()) {
            await connection.query(
                `INSERT INTO my_experiences(id_experiences, id_experiences_photos, id_experiences_category, vote, createdAt) VALUES (?, ?, ? ,?, ?)`,
                [
                    idExperience,
                    photos[0].id,
                    categories[0].id,
                    votes[0].vote,
                    new Date(),
                ]
            );
            await connection.query(
                `INSERT INTO votes (id_experiences, id_user,vote, createdAt) VALUES (?,?, ?,?)`,
                [idExperience, idReqUser, votes[0].vote, new Date()]
            );
        }
        //

        // Mensaje que enviaremos al correo del usuario.

        res.send({
            status: 'ok',
            data: {
                booking: newBooking[0],
            },
            message: 'La reserva ha sido creada',
        });
        const emailBody = `
            Acabas de realizar una reserva en Siente la emoción hfudishfdiasu
            `;
        // Enviamos el email.//MIRAR SI HAY QUE COGER DATOS DEL loginUser.js

        await sendMail({
            to: email,
            subject: `Acabas de realizar una reserva en Siente la emoción hfudishfdiasu ${activities[0].date}`,
            body: emailBody,
        });
        // Obtenemos el id de la RESERVA que acabamos de crear.
        //const idBooking = newBooking.insertId;
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newBooking;
