const getDB = require('../../database/getDB');

const getReviews = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id de la exeriencia que queremso obtener
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const { idExperience } = req.params;
        //Obtenemos la company que alberga esta experiencia
        const [company] = await connection.query(
            `
            SELECT 
                experiences.id, 
                experiences.createdAt, 
                experiences.id_user, 
                experiences.date, 
                experiences.id_company
            FROM experiences
            WHERE id = ?
            ORDER BY createdAt desc
            `,
            [idExperience]
        );

        //obtenemso la informacion de la experiencia que queremos obtener haciendo un join con los datos de otras tablas que tambien necesitamos aqui
        const [review] = await connection.query(
            `
        SELECT 
            votes.id,
            votes.createdAt,
            votes.id_user,
            users.username AS username, 
            users.avatar AS avatar,
            users.biography AS biography,
            users.avatar AS avatar,
            votes.id_experiences,
            votes.id_company, 
            votes.review,
            votes.vote
        FROM 
            votes
        LEFT JOIN users ON (votes.id_user = users.id)
        WHERE id_company = ?
        ORDER BY createdAt desc
        `,
            [company[0].id_company]
        );
        /* const [user] = await connection.query(
            `
        SELECT username FROM users WHERE id = ?`,
            [review[0].id_user]
        );
*/
        res.send({
            status: 'ok',
            data: {
                review,
                //idExperience,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getReviews;
