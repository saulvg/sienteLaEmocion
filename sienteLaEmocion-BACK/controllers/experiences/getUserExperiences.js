const getDB = require('../../database/getDB');

const getUserExperiences = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id del usuario que realiza la consulta
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const idReqUser = req.userAuth.id;

        //Obtenemos las reservas realizadas por dicho usuario
        const [bookings] = await connection.query(
            `
            SELECT 
                id,
                id_experiences,
                id_user
            FROM 
                booking
            WHERE  
                id_user = ?
            `,
            [idReqUser]
        );

        //Constante que guardara todas las experiencias reservadas por el usuario con los datos que necesitamos
        const userExperiencesBooking = [];

        //Bucle que recorre el array de todas las reservas realizadas por el usuario y nos inserta en la contante anterior el valor de cada experiencia mas el voto que el usuario a realizado de esa experiencia (si lo a hecho)
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
            experiences_category.name AS category
            FROM 
                experiences
            LEFT JOIN company ON (experiences.id_company = company.id)
            LEFT JOIN experiences_category ON (experiences.id_experiences_category = experiences_category.id)
            WHERE  
            experiences.id = ?
            `,
                [booking.id_experiences]
            );

            const [user_vote] = await connection.query(
                `
            SELECT 
                vote,
                id_experiences
            FROM
                votes
            WHERE 
                id_user = ? 
            `,
                [booking.id_user]
            );
            //Para saber si el usuario a votado o no esa experiencia en concreto, usamos el metodo filter para ver si la experiencia con id 'X' tiene voto, si el valor es undefined es que no tiene y sino lo contrario
            const personalVote = user_vote.filter(
                (id_experiences) =>
                    id_experiences.id_experiences === experiences[0].id
            );
            //Pusheamos el valro de personalVote a el objeto experiences que ya teniamos de antes, con los datos de la experiencia
            experiences[0].personal_vote = personalVote[0];
            //Pusheamso el valor del objeto 'experiences' al array creado al comienzo
            userExperiencesBooking.push(experiences[0]);
            //Repetimos este bucle hasta que no queden reservas realizadas por el usuario
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
