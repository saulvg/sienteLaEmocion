const getDB = require('../../database/getDB');

const deleteReview = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { idExperience } = req.params;

        const idReqUser = req.userAuth.id;

        // borro los votos
        /*await connection.query(
            `
      DELETE FROM entries_votes WHERE entry_id=?
    `,
            [idExperience]
        );*/
        // Obtenemos la propiedad "idEntry" de la entrada que va a ser votada.
        const [votes] = await connection.query(
            `SELECT id_user FROM votes WHERE id = ?`,
            [idExperience]
        );
        /*const [votes] = await connection.query(
            ` SELECT 
            votes.id,
            votes.createdAt,
            votes.id_user,
            users.username AS username, 
    users.avatar AS avatar,
    users.biography AS biography,
            id_experiences,
            votes.review,
            votes.vote
           FROM votes
           LEFT JOIN users ON (votes.id_user = users.id)
            WHERE id_experiences = ?`,
            [idExperience]
        );*/
        if (votes[0].id_user === idReqUser) {
            await connection.query(
                `
      DELETE FROM votes WHERE id=?
    `,
                [idExperience]
            );
        }
        // borro la entry!!!!!

        res.send({
            status: 'ok',
            message: `La review ha sido borrada`,
        });
    } catch (error) {
        // voy al middleware de los errores
        next(error);
    } finally {
        // libero la connexion
        if (connection) connection.release();
    }
};

module.exports = deleteReview;
