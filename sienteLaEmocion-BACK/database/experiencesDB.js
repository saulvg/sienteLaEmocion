const getDB = require('./getDB');

const experiences = async () => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO experiences (id_user, capacity, price, date, city, postalCode, createdAt) 
            VALUES (11, 12, 128, '2022-02-03 16:37:55', 'Huesca', 22003, '2022-02-03 16:37:55'), (11, 12, 25, '2022-02-03 16:37:55', 'Huesca', 22005, '2022-02-03 16:37:55'), (11, 12, 128, '2022-02-03 16:37:55', 'Huesca', 22003, '2022-02-03 16:37:55')`
        );
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};
experiences();
