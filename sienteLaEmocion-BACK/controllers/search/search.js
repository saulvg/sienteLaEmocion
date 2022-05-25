const getDB = require('../../database/getDB');

const search = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos los posibles query params.
        const { search } = req.query;

        // Variable donde almacenaremos las experiencias.
        let experiences;

        // Si la variable "search" no está vacía filtramos todas las experiencias en cuya propiedad
        if (search) {
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
                experiences.direction, 
                experiences.text_1, 
                experiences.text_2, 
                experiences.text_3, 
                experiences.text_4,
                experiences.text_5,
                experiences.text_6,
                experiences.photoHeader,
                experiences_category.name AS category,
                company.name AS company,
                company.companyInstagram,
                company.companyFacebook
            FROM experiences
            LEFT JOIN experiences_category ON (experiences.id_experiences_category = experiences_category.id)
            LEFT JOIN company ON (experiences.id_company = company.id)
            WHERE 
                experiences.city LIKE ? OR
                experiences.text_1 LIKE ? OR
                experiences.text_2 LIKE ? OR
                experiences.text_3 LIKE ? OR
                experiences.text_4 LIKE ? OR
                experiences.text_5 LIKE ? OR
                experiences.text_6 LIKE ? OR 
                experiences_category.name LIKE ? OR
                company.name LIKE ?
                ORDER BY createdAt desc
                `,
                [
                    `%${search}%`,
                    `%${search}%`,
                    `%${search}%`,
                    `%${search}%`,
                    `%${search}%`,
                    `%${search}%`,
                    `%${search}%`,
                    `%${search}%`,
                    `%${search}%`,
                ]
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
                    experiences.direction, 
                    experiences.text_1, 
                    experiences.text_2, 
                    experiences.text_3,
                    experiences.text_4,
                    experiences.text_5,
                    experiences.text_6,
                    experiences.photoHeader,
                    experiences_category.name AS category,
                    company.name AS company,
                    company.companyInstagram,
                    company.companyFacebook
                FROM experiences
                LEFT JOIN experiences_category ON (experiences.id_experiences_category = experiences_category.id)
                LEFT JOIN company ON (experiences.id_company= company.id)
                GROUP BY experiences_category.id, company.id, experiences.id
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

module.exports = search;
