const getDB = require('../../database/getDB');

const getListEntry = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Quey que nos devuleve las categorias existentes
        const [categories] = await connection.query(
            `
            SELECT name FROM experiences_category
            `
        );

        // Obtenemos los posibles query params.
        //NOSOTROS NO VAMOS A DAR LA OPCION DE CAMBIAR EL ORDEN DEL FILTRO
        const { category, price, date, votes } = req.query;

        // Variable donde almacenaremos las entradas.
        let experiences;

        // Si alguno de los filtos esta activado.

        if (category || price || date || votes) {
            const [meansVotes] = await connection.query(
                `SELECT vote, id_experiences FROM votes`
            );
            const filte = meansVotes.filter((id) => id.id_experiences === 2);
            console.log(meansVotes);
            console.log('filte', filte);
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
                company.companyFacebook,
                AVG(IFNULL(votes.vote, 0)) AS votes_entry 
            FROM experiences
            LEFT JOIN experiences_category ON (experiences.id_experiences_category = experiences_category.id)
            LEFT JOIN company ON (experiences.id_company = company.id)
            LEFT JOIN votes ON (experiences.id = votes.id_experiences)
            WHERE 
                experiences_category.name = ? OR
                experiences.price <= ? OR
                votes.vote = ? OR
                experiences.date LIKE ? 
            GROUP BY experiences_category.id, company.id, experiences.id
            ORDER BY experiences.date ASC
            ;  
                    `,
                [category, price, votes, `%${date}%`]
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
                    company.companyFacebook,
                    AVG(IFNULL(votes.vote, 0)) AS votes_entry
                FROM experiences
                LEFT JOIN experiences_category ON (experiences.id_experiences_category = experiences_category.id)
                LEFT JOIN company ON (experiences.id_company= company.id)
                LEFT JOIN votes ON (experiences.id = votes.id_experiences)
                GROUP BY experiences_category.id, company.id, experiences.id
                ORDER BY experiences.date ASC

                    `
            );
        }

        const experienceFuture = experiences.filter(
            (date) => date.date > new Date()
        );

        res.send({
            status: 'ok',
            data: {
                experiences: experienceFuture,
                categories,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getListEntry;
