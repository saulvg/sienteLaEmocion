//SUBIMOS SOLO LA FOTO EN EXPERIENCE O TAMBIEN EN PHOTO

const getDB = require('../../database/getDB');

/* const newEntrySchema = require('../../schemas/newEntrySchema'); */

const { savePhoto } = require('../../helpers');

const newEntry = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Validamos las propiedades del body.
        /*   await validate(newEntrySchema, req.body); */

        // Obtenemos las propiedades del body.
        const {
            capacity,
            price,
            date,
            city,
            street,
            number,
            postalCode,
            longitude,
            latitude,
            text_1,
            text_2,
            text_3,
            text_4,
            text_5,
            text_6,
        } = req.body;

        // Creamos la entrada y obtenemos el valor que retorna "connection.query".
        const [newExperience] = await connection.query(
            `INSERT INTO experiences 
                (id_user, capacity, price, date, city, street, number, postalCode, longitude, latitude, text_1, text_2, text_3, text_4, text_5, text_6, createdAt) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                1,
                capacity,
                price,
                date,
                city,
                street,
                number,
                postalCode,
                longitude,
                latitude,
                text_1,
                text_2,
                text_3,
                text_4,
                text_5,
                text_6,
                new Date(),
            ]
        );

        // Obtenemos el id de la entrada que acabamos de crear.
        const idExperience = newExperience.insertId;

        // Comprobamos que "req.files" exista y si tiene uno o más archivos (fotos).
        if (req.files && Object.keys(req.files).length > 0) {
            // Recorremos los valores de "req.files". Por si las moscas, nos quedamos únicamente
            // con las tres primeras posiciones del array. Si hay más serán ignoradas.
            for (const photo of Object.values(req.files).slice(0, 1)) {
                // Guardamos la foto en el servidor y obtenemos su nombre.
                const photoName = await savePhoto(photo, 1);

                // Guardamos la foto en la tabla de fotos.
                await connection.query(
                    `INSERT INTO experiences_photos (name, id_experiences, createdAt) VALUES (?, ?, ?)`,
                    [photoName, idExperience, new Date()]
                );
            }
        }

        res.send({
            status: 'ok',
            message: 'La entrada ha sido creada',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newEntry;
