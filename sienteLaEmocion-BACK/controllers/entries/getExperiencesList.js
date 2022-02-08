const getDB = require('../../database/getDB');

const getListEntry = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos los posibles query params.
        //NOSOTROS VAMOS A DAR LA OPCION DE CAMBIAR EL ORDEN DEL FILTRO
        const { category, price1, price2, date, createdAt, votes } = req.query;

        // Variable donde almacenaremos las entradas.
        let experiences;

        // Si alguno de los filtos esta activado.

        if (category || (price1 && price2) || date || createdAt || votes) {
            [experiences] = await connection.query(
                `
                SELECT 
                    experiences.id, 
                    experiences.createdAt, 
                    experiences.id_user, 
                    experiences.capacity, 
                    experiences.price, 
                    experiences.date, 
                    experiences.city, 
                    experiences.street, 
                    experiences.number, 
                    experiences.postalCode, 
                    experiences.longitude, 
                    experiences.latitude, 
                    experiences.text_1, 
                    experiences.text_2, 
                    experiences.text_3, 
                    experiences_category.name AS category,
                    company.name AS company
                FROM experiences
                LEFT JOIN experiences_category ON (experiences.id = experiences_category.id_experiences)
                LEFT JOIN company ON (experiences.id = company.id_experiences)
                WHERE 
                    experiences_category.name = ? OR
                    (experiences.price >= ? AND experiences.price <= ?) OR
                    experiences.date LIKE ? 
                    

                    `,
                [`${category}`, price1, price2, `%${date}%`, votes]
            );
        } else {
            [experiences] = await connection.query(
                `
                SELECT 
                    experiences.id, 
                    experiences.createdAt, 
                    experiences.id_user, 
                    experiences.capacity, 
                    experiences.price, 
                    experiences.date, 
                    experiences.city, 
                    experiences.street, 
                    experiences.number, 
                    experiences.postalCode, 
                    experiences.longitude, 
                    experiences.latitude, 
                    experiences.text_1, 
                    experiences.text_2, 
                    experiences.text_3, 
                    experiences_category.name AS category,
                    company.name AS company
                FROM experiences
                LEFT JOIN experiences_category ON (experiences.id = experiences_category.id_experiences)
                LEFT JOIN company ON (experiences.id = company.id_experiences)
                ORDER BY createdAt desc
                    `
            );
        }

        res.send({
            status: 'ok',
            data: {
                experiences,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getListEntry;
