const getDB = require('../../database/getDB');

const getUserExperiences = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id de la exeriencia que queremso obtener
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const idReqUser = req.userAuth.id;

        /* ...........Saul................ */
        const [bookings] = await connection.query(
            `
            SELECT 
                id,
                id_experiences
            FROM 
                booking
            WHERE  
                id_user = ?
            `,
            [idReqUser]
        );
        console.log('bookings user', bookings);
        const userExperiencesBooking = [];
        for (const booking of bookings) {
            const [experiences] = await connection.query(
                `
            SELECT 
            experiences.id,
            experiences.photoHeader, 
            experiences.id_company,
            experiences.id_experiences_category,
            experiences.date,
            company.name AS company,
            experiences_category.name AS category,
            votes.vote AS votes_entry
            FROM 
                experiences
            LEFT JOIN company ON (experiences.id_company = company.id)
            LEFT JOIN experiences_category ON (experiences.id_experiences_category = experiences_category.id)
            LEFT JOIN votes ON (experiences.id = votes.id_experiences)
            WHERE  
            experiences.id = ?
            `,
                [booking.id_experiences]
            );
            userExperiencesBooking.push(experiences[0]);
        }

        res.send({
            status: 'ok',
            data: {
                userExperiencesBooking,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = getUserExperiences;
