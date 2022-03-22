/*const getDB = require('../../database/getDB');

const getExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id de la exeriencia que queremso obtener
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const { idExperience } = req.params;

        //obtenemso la informacion de la experiencia que queremos obtener haciendo un join con los datos de otras tablas que tambien necesitamos aqui
        const [review] = await connection.query(
            `
        SELECT 
            review
            FROM votes
        WHERE id_experiences = ?`,
            [idExperience]
        );

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

module.exports = getExperience;
*/

const getDB = require('../../database/getDB');

const getReviews = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemso el id de la exeriencia que queremso obtener
        //ya hemos comprobado si existe anteriormente en un middleware asi que no lo comprobamos de nuevo
        const { idExperience } = req.params;
        /*  CREATE TABLE votes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            vote TINYINT,
            review VARCHAR(255),
            createdAt DATETIME NOT NULL,
            id_user INT NOT NULL,
            FOREIGN KEY(id_user) REFERENCES users(id),
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE 
            
        )*/
        //obtenemso la informacion de la experiencia que queremos obtener haciendo un join con los datos de otras tablas que tambien necesitamos aqui
        const [review] = await connection.query(
            `
        SELECT 
        votes.id,
        votes.createdAt,
        votes.id_user,
        users.username AS username, 
users.avatar AS avatar,
        id_experiences,
        votes.review,
        votes.vote
       FROM votes
       LEFT JOIN users ON (votes.id_user = users.id)
        WHERE id_experiences = ?`,
            [idExperience]
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
