const getDB = require('../../database/getDB');

const { savePhoto } = require('../../helpers');

const addEntryPhotos = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id de la experiencia a la cual queremos añadir una foto.
        const { idExperience } = req.params;

        // Si no recibimos ninguna foto lanzamos un error.
        if (!(req.files && req.files.photo)) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        // Obtenemos las fotos de la experiencia.
        const [photos] = await connection.query(
            `SELECT id FROM experiences_photos WHERE id_experiences = ?`,
            [idExperience]
        );

        // Si no hay 4 fotos lanzamos un error.
        if (photos.length === 4) {
            const error = new Error('Esta experiencia no tiene cuatro fotos');
            error.httpStatus = 403;
            throw error;
        }

        // Guardamos la foto en el servidor y obtenemos su nombre.
        const photoName = await savePhoto(req.files.photo, 1);

        // Guardamos el nombre de la foto en la base de datos.
        await connection.query(
            `INSERT INTO experiences_photos (id_experiences, path, createdAt) VALUES (?, ?, ?)`,
            [idExperience, photoName, new Date()]
        );

        res.send({
            status: 'ok',
            message: 'Foto agregada',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addEntryPhotos;
