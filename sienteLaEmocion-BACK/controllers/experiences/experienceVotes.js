const getDB = require('../../database/getDB');

const voteEntry = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id de la entrada que va a ser votada.
        const { idExperience } = req.params;
        const { idExperiencesBooking } = req.params;

        // Obtenemos el id del usuario que realiza la request.
        const idReqUser = req.userAuth.id;

        // Obtenemos el voto.
        const { vote, review } = req.body;

        // Si falta el voto lanzamos un error.
        if (!vote) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        // Array con los posibles valores válidos del voto.
        const validVotes = [1, 2, 3, 4, 5];

        // Si el voto no es un valor comprendido en el array anterior lanzamos un error.
        if (!validVotes.includes(Number(vote))) {
            const error = new Error(
                'Solo se admiten valores enteros entre 1 y 5'
            );
            error.httpStatus = 400;
            throw error;
        }

        // Obtenemos la propiedad "idEntry" de la entrada que va a ser votada.
        const [experiences] = await connection.query(
            `SELECT id_user FROM experiences WHERE id = ?`,
            [idExperience]
        );

        // Si el usuario que está intentando votar es el dueño de la entrada lanzamos
        // un error.
        if (experiences[0].id_user === idReqUser) {
            const error = new Error('No puedes votar tu propia experiencia');
            error.httpStatus = 403;
            throw error;
        }

        // Intentamos obtener un voto anterior del usuario que está realizando la request
        // sobre esta entrada.
        const [votes] = await connection.query(
            `SELECT id FROM votes WHERE id_user = ? AND id_experiences = ?`,
            [idReqUser, idExperience]
        );

        // Si el usuario ya ha votado la entrada lanzamos un error.
        if (votes.length > 0) {
            const error = new Error('Esta experiencia ya ha sido votada');
            error.httpStatus = 403;
            throw error;
        }

        //Obtenemos el id de la company que alberga dicha experiencia
        const [company] = await connection.query(
            `SELECT id_company FROM experiences WHERE id = ?`,
            [idExperience]
        );
        console.log('comapny', company[0].id_company);

        // Añadimos el voto.
        await connection.query(
            `INSERT INTO votes (vote, review, id_user, id_experiences, id_company, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                vote,
                review,
                idReqUser,
                idExperience,
                company[0].id_company,
                new Date(),
            ]
        );

        /*  await connection.query(
            `
            INSERT INTO booking (vote) VALUES (?)`,
            [vote, idExperiencesBooking]
        ); */

        res.send({
            status: 'ok',
            message: 'La experiencia ha sido votada',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = voteEntry;
