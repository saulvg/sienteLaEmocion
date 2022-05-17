const getDB = require('../../database/getDB');

const { deletePhoto } = require('../../helpers');

const deleteExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id de la experiencia que queremos borrar.
        const { idExperience } = req.params;

        // Seleccionamos el nombre de las fotos relaccionadas con la experiencia.
        const [photos] = await connection.query(
            `SELECT id, path, description FROM experiences_photos WHERE id_experiences = ?`,
            [idExperience]
        );

        // Borramos las fotos del servidor.
        for (const photo of photos) {
            await deletePhoto(photo.path, photo.description);
        }
        //Borramos las fotos
        for (const photo of photos) {
            await connection.query(
                `DELETE FROM experiences_photos WHERE id = ? `,
                [photo.id]
            );
        }

        // Borramos la entrada.
        await connection.query(`DELETE FROM experiences WHERE id = ?`, [
            idExperience,
        ]);

        res.send({
            status: 'ok',
            message: 'La experiences ha sido eliminada',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteExperience;
