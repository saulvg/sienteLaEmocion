const getDB = require('../../database/getDB');
const { savePhoto } = require('../../helpers');

const editExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemos el id de la entrada que queremos editar
        const { idExperience } = req.params;

        //Obtenemos los campos del body que se van a editar
        const {
            text_1,
            text_2,
            text_3,
            text_4,
            text_5,
            text_6,
            capacity,
            price,
            date,
            city,
            direction,
            /* name,
            category, */
        } = req.body;

        const photoHeader = req.files?.photoHeader;

        //si no se edita ningun campo lanzamos un error
        if (
            !text_1 &&
            !text_2 &&
            !text_3 &&
            !text_4 &&
            !text_5 &&
            !text_6 &&
            !capacity &&
            !price &&
            !date &&
            !city &&
            !direction &&
            !photoHeader
            /* !name &&
            !category */
        ) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        // Guardamos la foto en el servidor y obtenemos su nombre.
        const savedPhoto = await savePhoto(req.files.photoHeader, 1);

        //Actualizamos la base de datos
        //estos campos son los que si o si se deben rellenar al crear la experiencia, si no estan para actualizar, no se actualizan, por eso los separamos de la query rande preguntandoles uno a uno si esta este campo en la peticion

        /* if (name) {
            const [companyName] = await connection.query(
                `
            SELECT id FROM company WHERE name = ?
            `,
                [name]
            );
            console.log('soy idCOmpany', companyName[0]);
            await connection.query(`UPDATE company SET name = ? WHERE id = ?`, [
                name,
                companyName,
            ]);
        }
        if (category) {
            const [companyCategory] = await connection.query(
                `
            SELECT id FROM experiences_category WHERE name = ?
            `,
                [name]
            );
            console.log('soy IDexperiences_category', companyCategory[0]);
            await connection.query(
                `UPDATE experiences_category SET name = ? WHERE id = ?`,
                [category, companyCategory]
            );
        } */
        if (photoHeader) {
            await connection.query(
                `
            UPDATE experiences SET photoHeader = ?, modifiedAt = ? WHERE id = ?`,
                [savedPhoto, new Date(), idExperience]
            );
        }

        if (capacity) {
            await connection.query(
                `
            UPDATE experiences SET capacity = ?, modifiedAt = ? WHERE id = ?`,
                [capacity, new Date(), idExperience]
            );
        }
        if (date) {
            await connection.query(
                `
            UPDATE experiences SET date = ?, modifiedAt = ? WHERE id = ?`,
                [date, new Date(), idExperience]
            );
        }
        if (direction) {
            await connection.query(
                `
            UPDATE experiences SET direction = ?, modifiedAt = ? WHERE id = ?`,
                [direction, new Date(), idExperience]
            );
        }
        if (city) {
            await connection.query(
                `
            UPDATE experiences SET city = ?, modifiedAt = ? WHERE id = ?`,
                [city, new Date(), idExperience]
            );
        }

        await connection.query(
            `
            UPDATE experiences SET 
                text_1 = ?, 
                text_2 = ?, 
                text_3 = ?, 
                text_4 = ?, 
                text_5 = ?, 
                text_6 = ?, 
                price= ?,
                modifiedAt = ?
            WHERE id = ?`,
            [
                text_1,
                text_2,
                text_3,
                text_4,
                text_5,
                text_6,
                price,
                new Date(),
                idExperience,
            ]
        );

        res.send({
            status: 'ok',
            message: 'Experiencia actualizada con exito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editExperience;
