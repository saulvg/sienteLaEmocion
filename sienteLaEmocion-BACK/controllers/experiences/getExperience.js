const getDB = require('../../database/getDB');

const getExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id de la exeriencia que queremso obtener
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const { idExperience } = req.params;

        let experiences;

        if (idExperience === 'random') {
            [experiences] = await connection.query(
                `
            SELECT 
                experiences.id,  
                experiences.createdAt, 
                experiences.id_user,
                id_experiences_category,
                experiences.id_company, 
                experiences.capacity, 
                experiences.price, 
                experiences.date, 
                experiences.city, 
                experiences.direction, 
                experiences.photoHeader,
                experiences.text_1, 
                experiences.text_2, 
                experiences.text_3,
                experiences.text_4,
                experiences.text_5,
                experiences.text_6,
                AVG(IFNULL(votes.vote, 0)) AS votes_entry 
            FROM experiences
            LEFT JOIN votes ON (experiences.id = votes.id_experiences)
            GROUP BY experiences.id, votes.id
            ORDER BY RAND()
            LIMIT 1
            `
            );
        } else {
            //Obtenemso la informacion de la experiencia que queremos
            [experiences] = await connection.query(
                `
        SELECT 
            experiences.id,  
            experiences.createdAt, 
            experiences.id_user,
            id_experiences_category,
            experiences.id_company, 
            experiences.capacity, 
            experiences.price, 
            experiences.date, 
            experiences.city, 
            experiences.direction, 
            experiences.photoHeader,
            experiences.text_1, 
            experiences.text_2, 
            experiences.text_3,
            experiences.text_4,
            experiences.text_5,
            experiences.text_6,
            AVG(IFNULL(votes.vote, 0)) AS votes_entry 
        FROM experiences
        LEFT JOIN votes ON (experiences.id = votes.id_experiences)
        WHERE experiences.id = ?`,
                [idExperience]
            );
        }

        // Review
        const [company_votes] = await connection.query(
            `
            SELECT AVG(IFNULL(vote, 0)) AS company_votes FROM votes WHERE id_company = ?
            `,
            [experiences[0].id_company]
        );
        console.log('companyVOtes', company_votes[0].company_votes);

        // Fotos
        const [experiences_photos] = await connection.query(
            `
            SELECT * FROM experiences_photos WHERE id_experiences = ?
            `,
            [experiences[0].id]
        );

        // Company
        const [company] = await connection.query(
            `
        SELECT 
            name
        FROM company WHERE id = ?`,
            [experiences[0].id_company]
        );

        // Category
        const [experiences_category] = await connection.query(
            `
        SELECT name FROM experiences_category WHERE id = ?`,
            [experiences[0].id_experiences_category]
        );

        //Bookings
        const { authorization } = req.headers;

        const [users_booking] = await connection.query(
            `
            SELECT 
                users.id,
                users.username,
                users.biography
            FROM 
                booking
            LEFT JOIN users ON (booking.id_user = users.id) 
            WHERE booking.id_experiences = ?`,
            [experiences[0].id]
        );
        //si el usuario esta logeado, podra ver el nombre de los participantes que han reservado esa actividad
        //sino solo la cantidad de usuarios que han reservado
        let authorizedUser;
        authorization
            ? (authorizedUser = users_booking)
            : (authorizedUser = users_booking.length);

        res.send({
            status: 'ok',
            data: {
                experience: experiences[0],
                photos: experiences_photos,
                company: company[0].name,
                experiences_category: experiences_category[0].name,
                users_booking: authorizedUser,
                company_votes: company_votes[0].company_votes,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getExperience;
