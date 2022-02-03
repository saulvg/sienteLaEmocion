const getDB = require('./getDB');

const comnay = async () => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO company (id_experiences, name) VALUES (1, 'montahas felices'), (2, 'Bajo el mar'), (3, 'surcando los cielos')`
        );
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};
comnay();
