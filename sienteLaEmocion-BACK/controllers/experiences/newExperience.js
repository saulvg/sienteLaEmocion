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
            companyName,
            categoryName,
            capacity,
            price,
            date,
            city,
            direction,
            text_1,
            text_2,
            text_3,
            text_4,
            text_5,
            text_6,
        } = req.body;

        if (
            !companyName &&
            !capacity &&
            !price &&
            !date &&
            !city &&
            !direction
        ) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }
        // Obtenemos las propiedades de files.
        // Si no recibimos ninguna foto lanzamos un error.
        /* if (!(req.files && req.files.photoHeader)) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        } */
        // Guardamos la foto en el servidor y obtenemos su nombre.
        /* const photoHeader = await savePhoto(req.files.photoHeader, 1); */

        //Seleccionamos el id de id_company e id_experiences_category con el nombre de las mismas, y si no existiesen las creamos
        //company
        let id_company;
        id_company = await connection.query(
            `SELECT id FROM company WHERE name = ?`,
            [companyName]
        );
        if (id_company[0].length <= 0) {
            await connection.query(`INSERT INTO company (name) VALUES (?)`, [
                companyName,
            ]);
        }
        id_company = await connection.query(
            `SELECT id FROM company WHERE name = ?`,
            [companyName]
        );

        //category
        let id_experiences_category;
        id_experiences_category = await connection.query(
            `SELECT id FROM experiences_category WHERE name = ?`,
            [categoryName]
        );

        if (id_experiences_category[0].length <= 0) {
            await connection.query(
                `INSERT INTO experiences_category (name) VALUES (?)`,
                [categoryName]
            );
        }

        id_experiences_category = await connection.query(
            `SELECT id FROM experiences_category WHERE name = ?`,
            [categoryName]
        );

        // Creamos la entrada y obtenemos el valor que retorna "connection.query".
        await connection.query(
            `INSERT INTO experiences 
                (id_user, id_company, id_experiences_category, capacity, price, date, city, direction, text_1, text_2, text_3, text_4, text_5, text_6, createdAt) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                1,
                id_company[0][0].id,
                id_experiences_category[0][0].id,
                capacity,
                /* photoHeader, */
                price,
                date,
                city,
                direction,
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
