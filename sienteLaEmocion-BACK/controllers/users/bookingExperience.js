const getDB = require('../../database/getDB');
const { sendMail } = require('../../helpers');
//const { experienceVotes } = require('../entries');

// experienceVotes
const newBooking = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos las propiedades del body que el usuario completa para hacer la reserva

        const {
            username,
            email,
            phone,
            dni_nie /*,  date */,
            postalCode /* , message */,
        } = req.body;

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
            /* !date || */
            !postalCode /*||
            !message */
        ) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }
        //AQUI DEBERIAMOS COMPRIBAR QUE LOS DATOS RELLENADOS POR EL USUARIO SEAN CORRECTOS O DIRECTAMENTE NO PEDIRLSO PORQUE YA SABEMSO QUE ESTA LOGEADO AL ESTAR AUTORIZADO PARA HACER LAA RESERVA

        //sabemos que actividad reserva porque esta en la ruta

        // Obtenemos la información de la experiencia de la base de datos.
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
            experiences.text_4,
            experiences.text_5,
            experiences.text_6,
            experiences.howManyBookings,
            AVG(IFNULL(votes.vote, 0)) AS votes_entry 
        FROM experiences
        LEFT JOIN votes ON (experiences.id = votes.id_experiences)

        WHERE experiences.id = ?`,

            [idExperience]
        );

        //Cogemos los diferentes datos que nos hacen falta para completar la reserva, creo que no hacen falta algunos de estos datos para realizar una reserva asi que los comento
        /* 
        const [photos] = await connection.query(
            `SELECT id FROM experiences_photos WHERE id_experiences = ?`,
            [idExperience]
        );
         */

        /*  creo qeu si queremso el nombre de la categoria para la reserva, pero de momento lo comento
        const [categories] = await connection.query(
            `SELECT id FROM experiences_category WHERE id_experiences = ?`,
            [idExperience]
        );
         */
        /* 
        const [votes] = await connection.query(
            `SELECT vote FROM votes WHERE id_experiences =?`,
            [idExperience]
        );
         */
        /*  const [howManyBookings] = await connection.query(
            `SELECT howManyBookings FROM experiences WHERE id_experiences = ?`,
            [idExperience]
        ); */
        /* `INSERT INTO experiences (howManyBookings) VALUE (?)`, [1]; */

        /* 
        `INSERT INTO votes (id_experiences, vote) VALUES (?,?)`,
            [idExperience, votes[0].vote];
             */

        // Creamos la reserva y obtenemos el valor que retorna .
        //AQUI METERLA EN LA LISTA DE ACTIVIDADES QUE REALIZÓ EL USUARIO((?))
        const [newBooking] = await connection.query(
            `INSERT INTO booking (id_experiences, id_user, createdAt) VALUES (?, ?,?)`,

            [idExperience, idReqUser, new Date()]
        );
        //  const idReserva = newBooking.insertId;
        //CAMBIAR ESTO POR INSERTASR UNICAMENTE EL VOTO EN LA TABLA BOOKING UAN VEZ PASE LA FECHA

        /* NO existe la tabla my_experience 
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
                `INSERT INTO votes (id_experiences, id_user,vote, createdAt) VALUES (?,?,?,?)`,
                [idExperience, idReqUser, votes[0].vote, new Date()]
            );
        }
         */ //

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
