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
            id_company,
            id_experiences_category,
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

        // Obtenemos las propiedades de files.
        // Si no recibimos ninguna foto lanzamos un error.
        if (!(req.files && req.files.photoHeader)) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }
        // Guardamos la foto en el servidor y obtenemos su nombre.
        const photoHeader = await savePhoto(req.files.photoHeader, 1);

        // Creamos la entrada y obtenemos el valor que retorna "connection.query".
        await connection.query(
            `INSERT INTO experiences 
                (id_user, id_company, id_experiences_category, capacity, photoHeader, price, date, city, street, number, postalCode, longitude, latitude, text_1, text_2, text_3, text_4, text_5, text_6, createdAt) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                1,
                id_company,
                id_experiences_category,
                capacity,
                photoHeader,
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
