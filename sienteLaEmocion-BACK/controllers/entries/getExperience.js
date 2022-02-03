const getDB = require('../../database/getDB');
const { isAuth, userExists } = require('../../middleware');

const getExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id de la exeriencia que queremso obtener
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const { idExperience } = req.params;

        //obtenemso la informacion de la experiencia que queremos obtener haciendo un join con los datos de otras tablas que tambien necesitamos aqui
        const [experiences] = await connection.query(
            `
        SELECT 
            experiences.id,  
            experiences.createdAt, 
            experiences.id_user, 
            experiences.id_company, 
            experiences.id_experiences_category, 
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
            SELECT * FROM experiences_photos WHERE id_experience = ?
            `,
            [idExperience]
        );

        // Company
        const [company] = await connection.query(
            `
        SELECT name FROM company WHERE id = ?`,
            [experiences[0].id_company]
        );

        // Category
        const [experiences_category] = await connection.query(
            `
        SELECT name FROM experiences_category WHERE id = ?`,
            [experiences[0].id_experiences_category]
        );

        //si el usuario esta logeado, podra ver el nombre de los participantes que han reservado esa actividad PENDIENTE DE REVISAR
        //NECESITO LA RESERVA DE UN USUARIO
        /* A
        A
        A
        A
        AA
        A
        A
        A
        A
        A
        A
        A
        A
        A
        A
         */
        let users_booking = '';
        if (isAuth && userExists) {
            [users_booking] = await connection.query(
                `
            SELECT id_user FROM booking WHERE id_experiences = ?`,
                [idExperience]
            );
            console.log('aquiiii', users_booking);
        }
        res.send({
            status: 'ok',
            data: {
                experience: experiences[0],
                photos: experiences_photos,
                company: company[0].name,
                experiences_category: experiences_category[0].name,
                users_booking: users_booking, //PENDIENTE DE REVISAR CON LO NOMBRADO ANTERIORMENTE
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getExperience;
