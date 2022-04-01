const getDB = require('../../database/getDB');

const { savePhoto } = require('../../helpers');

const addExperiencePhotos = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id de la experiencia a la cual queremos añadir una foto.
        const { idExperience } = req.params;
        /* 
        const photosBody = req.files?.photosBody;
*/
        // Si no recibimos ninguna foto lanzamos un error.
        if (!req.files) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        // Obtenemos las fotos de la experiencia.
        const [photos] = await connection.query(
            `SELECT id FROM experiences_photos WHERE id_experiences = ?`,
            [idExperience]
        );

        // Si hay mas 3 fotos lanzamos un error.
        if (photos.length >= 3) {
            const error = new Error('Esta experiencia ya tiene 3 fotos');
            error.httpStatus = 403;
            throw error;
        }

        // Comprobamos que "req.files" exista y si tiene uno o más archivos (fotos).
        if (req.files && Object.keys(req.files).length > 0) {
            // Recorremos los valores de "req.files". Por si las moscas, nos quedamos únicamente
            // con las tres primeras posiciones del array. Si hay más serán ignoradas.
            for (const photo of Object.values(req.files).slice(0, 3)) {
                // Guardamos la foto en el servidor y obtenemos su nombre.
                const photoName = await savePhoto(photo, 1);

                // Guardamos el nombre de la foto en la base de datos.
                await connection.query(
                    `INSERT INTO experiences_photos (id_experiences, path, createdAt) VALUES (?, ?, ?)`,
                    [idExperience, photoName, new Date()]
                );
            }
        }

        res.send({
            status: 'ok',
            message: 'Fotos agregadas',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addExperiencePhotos;
