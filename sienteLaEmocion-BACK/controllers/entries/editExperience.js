const getDB = require('../../database/getDB');

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
            street,
            number,
            postalCode,
            longitude,
            latitude,
        } = req.body;

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
            !street &&
            !number &&
            !postalCode &&
            !longitude &&
            !latitude
        ) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        //Actualizamos la base de datos

        //esto asi no me deja porque los campos que voy a separar me dice que son obligatorios, procedo a separarlso
        /* 
        await connection.query(
            `
        UPDATE experiences SET 
            text_1 = ?, 
            text_2 = ?, 
            text_3 = ?,  
            capacity = ?,
            price= ?,
            date = ?,
            city = ?,
            street = ?,
            number = ?,
            postalCode = ?,
            longitude = ?,
            latitude = ?, 
            modifiedAt = ?
        WHERE id = ?`,
            [
                text_1,
                text_2,
                text_3,
                capacity,
                price,
                date,
                city,
                street,
                number,
                postalCode,
                longitude,
                latitude,
                new Date(),
                idExperience,
            ]
        );
        */
        //Actualizamos la base de datos
        //estos campos son los que si o si se deben rellenar al crear la experiencia, si no estan para actualizar, no se actualizan
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
        if (postalCode) {
            await connection.query(
                `
        UPDATE experiences SET postalCode = ?, modifiedAt = ? WHERE id = ?`,
                [postalCode, new Date(), idExperience]
            );
        }

        await connection.query(
            `
        UPDATE experiences SET 
            text_1 = ?, 
            text_2 = ?, 
            text_3 = ?,  
            price= ?,
            city = ?,
            street = ?,
            number = ?,
            longitude = ?,
            latitude = ?, 
            modifiedAt = ?
        WHERE id = ?`,
            [
                text_1,
                text_2,
                text_3,
                price,
                city,
                street,
                number,
                longitude,
                latitude,
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
