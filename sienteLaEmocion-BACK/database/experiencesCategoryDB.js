const getDB = require('./getDB');

const experiencesCategory = async () => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO experiences_category (name) VALUES ('buceo'), ('senderismo'), ('parapente')`
        );
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};
experiencesCategory();
