const getDB = require('../../database/getDB');

const getReviews = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id de la exeriencia de la que queremos ver las reviews
        // Ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const { idExperience } = req.params;

        const [company] = await connection.query(
            `SELECT id_company FROM experiences WHERE id = ?`,
            [idExperience]
        );
        console.log('soyyyyyy', company);

        // Obtenemos la informacion de la review haciendo un join con los datos de otras tablas que necesitamos
        const [review] = await connection.query(
            `
        SELECT 
            votes.id,
            votes.createdAt,
            votes.id_user,
            votes.id_experiences,
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
        WHERE id_company= ?
        ORDER BY createdAt desc
        `,
            [company[0].id_company]
        );

        console.log('soyyyyyy', review);

        res.send({
            status: 'ok',
            data: {
                review,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getReviews;
