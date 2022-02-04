const getDB = require('./getDB');

const experiencesCategory = async () => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO experiences_category (id_experiences, name) VALUES (2, 'buceo'), (1, 'senderismo'), (3, 'parapente')`
        );
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};
experiencesCategory();
