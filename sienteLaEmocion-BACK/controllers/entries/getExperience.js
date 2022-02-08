const getDB = require('../../database/getDB');

const getExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id de la exeriencia que queremso obtener
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const { idExperience } = req.params;

        //obtenemso la informacion de la experiencia que queremos
        const [experiences] = await connection.query(
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

        // Fotos
        const [experiences_photos] = await connection.query(
            `
            SELECT * FROM experiences_photos WHERE id_experiences = ?
            `,
            [idExperience]
        );

        // Company
        const [company] = await connection.query(
            `
        SELECT name FROM company WHERE id_experiences = ?`,
            [idExperience]
        );

        // Category
        const [experiences_category] = await connection.query(
            `
        SELECT name FROM experiences_category WHERE id_experiences = ?`,
            [idExperience]
        );

        //Bookings
        //si el usuario esta logeado, podra ver el nombre de los participantes que han reservado esa actividad
        const { authorization } = req.headers;
        let users_booking = '';
        if (authorization) {
            [users_booking] = await connection.query(
                `
            SELECT 
                users.username
            FROM 
                booking
            LEFT JOIN users ON (booking.id_user = users.id) 
            WHERE booking.id_experiences = ?`,
                [idExperience]
            );
        } else {
            users_booking = '';
        }

        res.send({
            status: 'ok',
            data: {
                experience: experiences[0],
                photos: experiences_photos,
                company: company[0].name,
                experiences_category: experiences_category[0].name,
                users_booking: users_booking,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getExperience;
