const getDB = require('../../database/getDB');
const { sendMail } = require('../../helpers');

const newBooking = async (req, res, next) => {
    let connection;

    // Obtenemos el id de la actividad que se quiere reservar
    const { idExperience } = req.params;
    // Obtenemos el id del usuario que está haciendo la reserva
    const idReqUser = req.userAuth.id;

    try {
        connection = await getDB();

        //Obtenemso el correo del admin
        const [adminEmail] = await connection.query(
            `
            SELECT 
                email
            FROM 
                users
            WHERE 
                id = ?
            `,
            [1]
        );

        // Obtenemos la propiedad message del body con el contenido si el usuario quisiersa rellenar algo
        const { message } = req.body;

        //Obtenemos los datos del usuario para realizar la reserva de la tabla users
        const [users] = await connection.query(
            `
        SELECT 
            users.id,
            users.username,
            users.email,
            users.phone,
            users.dni_nie,
            users.postalCode
        FROM users
        WHERE 
            users.id = ?
        `,
            [idReqUser]
        );

        // Obtenemos la información de la experiencia de la base de datos,
        //sabemos que actividad reserva porque esta en la ruta.
        const [experiences] = await connection.query(
            `
            SELECT 
                id, 
                createdAt, 
                id_user,
                id_experiences_category,
                id_company, 
                capacity, 
                price, 
                date, 
                city, 
                direction
            FROM experiences
            WHERE id = ?`,
            [idExperience]
        );

        //Cogemos los diferentes datos que nos hacen falta para completar la reserva.
        const [categories] = await connection.query(
            `SELECT name FROM experiences_category WHERE id = ?`,
            [experiences[0].id_experiences_category]
        );
        const [company] = await connection.query(
            `SELECT name FROM company WHERE id = ?`,
            [experiences[0].id_company]
        );

        const [bookings] = await connection.query(
            `
            SELECT
                id,
                id_experiences,
                id_user
            FROM    
                booking
            `
        );

        //Comprobamos que el usuario no haya reservado 2 veces para la misma actividad
        const doubleBooking = bookings.filter(
            (id) =>
                id.id_user === idReqUser &&
                id.id_experiences === Number(idExperience)
        );

        if (doubleBooking.length > 0) {
            const error = new Error(
                'Ya has reservado esta experiencia, porfavor comprueba tu bandeja de entrada, sino es asi ponte en contacto con nosotros,'
            );
            error.httpStatus = 405;
            throw error;
        }

        //Insertamos los datos de reserva en la tabla correspondiente
        await connection.query(
            `INSERT INTO booking (id_experiences, id_user, userMessage, createdAt) VALUES (?, ?, ?, ?)`,

            [idExperience, idReqUser, message, new Date()]
        );

        //Volvemos a llamar a tabla booking para poder reflejar los datos actualizados (no se si quiero estos datos para algo aparte de llamarlos en el res.send)
        const [confirmBookings] = await connection.query(
            `
            SELECT
                id,
                id_experiences,
                id_user,
                userMessage
            FROM    
                booking
            `
        );

        // Mensaje que enviaremos al correo del usuario.
        res.send({
            status: 'ok',
            data: {
                booking: confirmBookings,
            },
            message: 'La reserva ha sido creada',
        });

        //Formateamos la fecha de la acticidad para enviarla
        const date = experiences[0].date;
        const dateFormat = `${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`;

        const emailBodyUser = `
            Acabas de realizar una reserva en Siente la Emoción,
            para la actividad de ${categories[0].name},
            en ${experiences[0].city}, 
            ${experiences[0].direction},
            en fecha: ${dateFormat},
            con la empresa ${company[0].name},
            no se acuerde que tendra que abonar ${experiences[0].price}€ antes de comenzar la experiencia.
        `;
        //Enviamos el correo al usuario
        await sendMail({
            to: users[0].email,
            subject: `Reserva en Siente la Emocion`,
            body: emailBodyUser,
        });

        const emailBodyCompany = `El usuario con los datos:
            Username: ${users[0].username},
            Email: ${users[0].email},
            Telefono: ${users[0].phone},
            Dni: ${users[0].dni_nie},
            Codigo postal: ${users[0].postalCode},
            Acaba de reservar con la empresa ${company[0].name}, para la actividad de ${categories[0].name}, con la fecha ${dateFormat}
            `;

        //Enviamos el correo al usuario
        /*  Funciona, lo dejo comentado para que el correo del admin, el mio no se sature con mensajes mientras hacemos pruebas
        await sendMail({
            to: adminEmail[0].email,
            subject: `Reserva en Siente la Emocion empresa: ${company[0].name}`,
            body: emailBodyCompany,
        });
        */
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newBooking;
