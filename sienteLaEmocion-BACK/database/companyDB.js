const getDB = require('./getDB');

const comnay = async () => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO company (name) VALUES ('montahas felices'), ('Bajo el mar'), ('surcando los cielos')`
        );
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};
comnay();
