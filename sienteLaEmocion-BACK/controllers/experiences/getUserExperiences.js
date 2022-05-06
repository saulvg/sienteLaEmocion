const getDB = require('../../database/getDB');

const getUserExperiences = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id de la exeriencia que queremso obtener
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        //const { idUser } = req.params;
        const idReqUser = req.userAuth.id;
        let { idExperiencesBooking } = req.params;
        //const { idExperience } = req.params;
        /*  CREATE TABLE votes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            vote TINYINT,
            review VARCHAR(255),
            createdAt DATETIME NOT NULL,
            id_user INT NOT NULL,
            FOREIGN KEY(id_user) REFERENCES users(id),
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE 
            
              await connection.query(`
        CREATE TABLE booking (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            id_user INT NOT NULL,
            userMessage VARCHAR(255),
            vote TINYINT,
            createdAt DATETIME NOT NULL,
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE,
            FOREIGN KEY (id_user) REFERENCES users(id)
        )
    `);
        )*/
        //obtenemso la informacion de la experiencia que queremos obtener haciendo un join con los datos de otras tablas que tambien necesitamos aqui
        //Obtenemos los datos del historial de actividades reservadas por el usuario con el id propietario del perfil
     
             /* ...................... */

        /*    const [experiences] = await connection.query(
            `
    SELECT 
        id,
        id_user,
        vote,
        id_experiences
    FROM
        booking
    WHERE
        id_user = ? 

    `,
            [idReqUser]
        );
        //Guradamos los id de las experiencias que haya hecho dicho usuario
        idExperiencesBooking = experiences.map((idExp) => idExp.id_experiences);
        //LEFT JOIN booking ON (experiences.id = booking.id_experiences)
        const userExperiences = [];
        for (const idExperienceBooking of idExperiencesBooking) {
            const [experience] = await connection.query(
                `
        SELECT
     
            experiences.id as experienceId, 
            experiences.price, 
            experiences.date, 
            experiences.city,
            experiences.photoHeader,
            experiences_category.name AS category,
            company.name AS company
        FROM experiences
        LEFT JOIN experiences_category ON (experiences.id_experiences_category = experiences_category.id)
        
        LEFT JOIN company ON (experiences.id_company= company.id)

        WHERE experiences.id = ?
        `,
                [idExperienceBooking]
            );
            userExperiences.push(experience[0]);
        } */

        /* ...................... */

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
            `, [idReqUser]
        )
        console.log('bookings user', bookings);
        const userExperiencesBooking = [];
        for (const booking of bookings){
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
            `, [booking.id_experiences]
        )
        userExperiencesBooking.push(experiences[0])
        }
       
       

        res.send({
            status: 'ok',
            data: { 
                userExperiencesBooking,
         },
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
module.exports = getUserExperiences;
