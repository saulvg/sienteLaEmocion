const getDB = require('./getDB.js');
const bcrypt = require('bcrypt');
const faker = require('faker/locale/es'); //borrar

const saltRounds = 10;

const { format } = require('date-fns');
function formatDate(date) {
    return format(date, 'yyyy-MM-dd HH:mm:ss');
}

async function initDB() {
    let connection;

    try {
        connection = await getDB();
        await connection.query('DROP TABLE IF EXISTS votes');
        await connection.query('DROP TABLE IF EXISTS booking');
        await connection.query('DROP TABLE IF EXISTS my_experiences');
        await connection.query('DROP TABLE IF EXISTS experiences_photos');
        await connection.query('DROP TABLE IF EXISTS experiences_category');
        await connection.query('DROP TABLE IF EXISTS company');
        await connection.query('DROP TABLE IF EXISTS experiences'); //Añadir los campos de las tablas "experiences_description", "experiences_description_type" y "address"
        await connection.query('DROP TABLE IF EXISTS users');

        await connection.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            username VARCHAR(50) NOT NULL,
            dni_nie VARCHAR(50) NOT NULL,
            avatar VARCHAR(50),
            role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
            active BOOLEAN DEFAULT false,
            deleted BOOLEAN DEFAULT false,
            registrationCode VARCHAR(100),
            recoverCode VARCHAR(100),
            phone INT NOT NULL, 
            biography VARCHAR (255),
            postalCode MEDIUMINT NOT NULL,
            createdAt DATETIME NOT NULL, 
            modifiedAt DATETIME 

        )
    `);

        await connection.query(`
        CREATE TABLE experiences (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_user INT NOT NULL,
            capacity TINYINT NOT NULL,
            price DECIMAL NOT NULL,
            date DATETIME NOT NULL, 
            city VARCHAR(50) NOT NULL,
            street VARCHAR(50),
            number VARCHAR(50),
            postalCode MEDIUMINT,
            longitude VARCHAR(50),
            latitude VARCHAR(50),
            text_1 TEXT,
            text_2 TEXT,
            text_3 TEXT,
            text_4 TEXT,
            text_5 TEXT,
            text_6 TEXT,
            createdAt DATETIME NOT NULL, 
            modifiedAt DATETIME,
            FOREIGN KEY (id_user) REFERENCES users(id)  

        )
    `);
        await connection.query(`
        CREATE TABLE company (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            name VARCHAR(50) NOT NULL,
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE               
        )
    `);
        await connection.query(`
        CREATE TABLE experiences_category (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            name VARCHAR(50) NOT NULL,
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE    
        )
    `);
        await connection.query(`
        CREATE TABLE experiences_photos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            path VARCHAR(150),
            description TEXT,
            createdAt DATETIME NOT NULL,
            FOREIGN KEY (id_experiences) REFERENCES experiences(id)
        )
    `);

        await connection.query(`
        CREATE TABLE votes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            vote TINYINT,
            review VARCHAR(255),
            createdAt DATETIME NOT NULL,
            id_user INT NOT NULL,
            FOREIGN KEY(id_user) REFERENCES users(id),
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE 
            
        )
    `);
        await connection.query(`
        CREATE TABLE booking (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            id_user INT NOT NULL,
            createdAt DATETIME NOT NULL,
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE,
            FOREIGN KEY (id_user) REFERENCES users(id)
        )
    `);
        await connection.query(`
    CREATE TABLE my_experiences (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_experiences INT NOT NULL,
        id_experiences_photos INT NOT NULL, 
        id_experiences_category INT NOT NULL,
        vote TINYINT,
        createdAt DATETIME NOT NULL,
        FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE,
        FOREIGN KEY (id_experiences_photos) REFERENCES experiences_photos(id),
        FOREIGN KEY (id_experiences_category) REFERENCES experiences_category(id)
    )
`);

        // Creamos la contraseña del administrador y la encriptamos.
        const ADMIN_PASS = await bcrypt.hash('123456', saltRounds);

        // Insertamos el usuario administrador.
        await connection.query(`
        INSERT INTO users (email, password, username, active, role, dni_nie, postalCode, phone, createdAt)
        VALUES (
            "saulvgproyecto@gmail.com",
            "${ADMIN_PASS}",
            "Admin",
            true,
            "admin",
            "0000",
            "0000",
            "0000",
            "${formatDate(new Date())}"
        )
    `);

        // Constante que nos dice el nº de usuarios que vamos a crear.
        const USERS = 10;

        // Creamos un bucle que se repite tantas veces como nº de usuarios.
        for (let i = 0; i < USERS; i++) {
            // Datos faker.
            const email = faker.internet.email();
            const username = faker.name.findName();
            const password = await bcrypt.hash('123456', saltRounds);

            //insertamos un usuario en cada repeticion
            await connection.query(`
            INSERT INTO users (email, username, password, dni_nie, postalCode, phone, active, createdAt)
            VALUES (
                "${email}", 
                "${username}",
                "${password}",
                "123456789",
                "22008",
                "444555666",
                true, 
                "${formatDate(new Date())}"
            )
        `);
        }
        console.log('Usuarios creados');
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
}

initDB();

//DUDAS

/* 
    
    EL PRECIO ES DECIMAL mirar como se escribe en la documentacion mysql?


*/
