const getDB = require('./getDB');

const comnay = async () => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO company (name, companyInstagram, companyFacebook) VALUES ('montañas felices', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'), ('EquinoClub', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'), ('Astronautas del las profundidades', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/')`
        );
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};
comnay();
