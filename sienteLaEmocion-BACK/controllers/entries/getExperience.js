const getDB = require('../../database/getDB');

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
        SELECT experiences.id, experiences.name, experiences.createdAt, experiences.id_user, experiences.id_company, experiences.id_address, experiences.id_experiences_category, AVG(IFNULL(votes.vote, 0)) AS votes_entry 
        FROM experiences
        LEFT JOIN votes ON (experiences.id = votes.id_experiences)
        WHERE experiences.id = ?`,
            [idExperience]
        );

        // Fotos
        const [experiences_photos] = await connection.query(
            `
            SELECT * FROM experiences_photos WHERE id_experiences=?
            `,
            [idExperience]
        );

        // Company

        //const [experience_company] ....

        res.send({
            status: 'ok',
            data: {
                experience: experiences[0],
                photos: experiences_photos,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getExperience;
