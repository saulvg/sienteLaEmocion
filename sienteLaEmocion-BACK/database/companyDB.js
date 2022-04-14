const getDB = require('./getDB');

const comnay = async () => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO company (name, companyInstagram, companyFacebook) VALUES ('montahas felices', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'), ('Bajo el mar', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'), ('surcando los cielos', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/')`
        );
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};
comnay();
