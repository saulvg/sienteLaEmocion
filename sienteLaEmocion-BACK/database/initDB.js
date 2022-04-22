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
        //await connection.query('DROP TABLE IF EXISTS my_experiences');
        await connection.query('DROP TABLE IF EXISTS experiences_photos');
        await connection.query('DROP TABLE IF EXISTS experiences');
        await connection.query('DROP TABLE IF EXISTS experiences_category');
        await connection.query('DROP TABLE IF EXISTS company');
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
        CREATE TABLE company (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL, 
            companyInstagram VARCHAR(100),
            companyFacebook VARCHAR(100)
    )
`);
        await connection.query(`
        CREATE TABLE experiences_category (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL
    )
`);

        //add campo fotCabezera y modificarlo en newExperience
        await connection.query(`
        CREATE TABLE experiences (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_user INT NOT NULL,
            id_experiences_category INT NOT NULL,
            id_company INT NOT NULL,
            photoHeader VARCHAR(150),
            capacity TINYINT NOT NULL,
            price DECIMAL NOT NULL,
            date DATETIME NOT NULL, 
            city VARCHAR(50) NOT NULL,
            direction VARCHAR(255) NOT NULL,
            text_1 TEXT,
            text_2 TEXT,
            text_3 TEXT,
            text_4 TEXT,
            text_5 TEXT,
            text_6 TEXT,
            createdAt DATETIME NOT NULL, 
            modifiedAt DATETIME,
            FOREIGN KEY (id_user) REFERENCES users(id),  
            FOREIGN KEY (id_experiences_category) REFERENCES experiences_category(id) ON DELETE CASCADE,
            FOREIGN KEY (id_company) REFERENCES company(id) ON DELETE CASCADE

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
        //add campo review y eliminar tabla de votes (corregir back)
        await connection.query(`
        CREATE TABLE booking (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            id_user INT NOT NULL,
            userMessage VARCHAR(255),
            vote TINYINT,
            createdAt DATETIME NOT NULL,
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE,
            FOREIGN KEY (id_user) REFERENCES users(id)
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
        console.log('Tablas creadas');

        connection = await getDB();

        await connection.query(
            `INSERT INTO company 
                (name, companyInstagram, companyFacebook)
            VALUES 
                ('montañas felices', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('EquinoClub', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('Astronautas del las profundidades', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('espeleologia', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('motorBike', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('yoga', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('piraguismo', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('esqui', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('paracaidismo', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
                ('ciclismo', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/')
                
                `
        );
        console.log('Comañias creadas');

        await connection.query(
            `INSERT INTO experiences_category 
                (name) 
            VALUES 
                ('Escalada'), ('Monta a Caballo'), ('Buceo'),('espeleologia'),('motorBike'),('yoga'),('piraguismo'),('esqui'),('paracaidismo'),('ciclismo')`
        );
        console.log('Categorias creadas');

        await connection.query(
            `INSERT INTO experiences 
                (id_user, id_experiences_category, id_company, capacity, price, date, city, direction, text_1, text_2, text_3, text_4, text_5, text_6, createdAt) 
            VALUES 
                (1, 1, 1, 12, 67,'2023-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

                'Equipo: casco, arnés, material técnico, pie de gato y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de montaña, agua y mochila.',
                
                'Media jornada.
                Todo el año.',

                'Podrás disfrutar de esta maravillosa actividad en un entorno único como es el Alto Turia en la Serranía de Valencia. Auténtico paraíso de la escalada con un entorno inmejorable, vías ferratas, gargantas, desfiladeros y murallas de hasta 200 m de altura.',

                'La Escalada es un deporte que consiste en realizar una progresión vertical ya sea en roca natural o en una instalación artificial (rocódromo). Para ellos iremos equipados con arnés y casco, estaremos unidos a la pared por una cuerda y sujetados por un guía en todo momento., Apto para todos los públicos, se trata de una toma de contacto con la escalada donde conocerás el material y realizaras una jornada de iniciación escalando vías de poca dificultad técnica para que puedas experimentar las sensaciones que proporciona este deporte sin preocuparte de nada. Nivel apto para personas aficionados a la naturaleza y con destreza para andar por la montaña. Pasos más técnicos pero de un nivel muy asequible, donde el disfrute es lo principal. Seguridad y diversión a partes iguales.', 

                'Nivel para personas con experiencia anterior en escalada. Vías técnicas y largos de mayor altura. Tramos con mayor exigencia física pero donde la diversión se encuentra en cada pared.', 

                '2022-02-03 16:37:55'),

                (1, 2, 2, 8, 32,'2023-02-03 16:37:55', 'Teruel', 'Albarracin N 23', 

                'Equipo: casco y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Ropa cómoda (mallas largas o similar) y calzado deportivas o montaña.',
                
                '2 horas.
                Todo el año.',

                'Con nuestra Ruta a Caballo disfrutarás de un agradable y gratificante paseo ecuestre recorriendo los viñedos y pinares que rodean la población de Titaguas. Nuestro guía te dará todas las explicaciones y consejos necesarios para que sólo te preocupes de disfrutar.', 
                
                'Si nunca has probado a montar a caballo, te lo recomendamos sin dudar, es una de las actividades que más te acercará a la verdadera naturalera del ser humano. Realiza tu ruta al ocaso y vivirás la increíble experiencia de un precioso atardecer a caballo. Tomamos como punto de partida la Hípica Bulerías, con sede en Titaguas, y con larga experiencia en doma y actividades ecuestres.', 
                
                'Dependiendo de tu experiencia con caballos, haremos una sencilla toma de contacto y el guía te proporcionará muchos consejos útiles para que disfrutes al máximo. No hay duda que el caballo es uno de los animales que más fascinación causa a todo el mundo, pero en especial a los niños. Es una experiencia que nunca olvidarán.',

                '2022-02-03 16:37:55'),
                
                (1, 3, 3, 8, 32,'2022-02-03 16:37:55', 'Teruel', 'Albarracin N 23', 

                'Equipo: chaleco salvavidas, pala y kayak.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Ropa de recambio, bañazor y calzado acuático.',
                
                'Media jornada.
                Primavera y verano.',

                'Una actividad perfecta para disfrutar con toda la familia, realizando un recorrido por un entorno idílico como es el pantano de Benagéber. Aguas mansas y tranquilas donde podrás descubrir cañones y acantilados excavados en la piedra por el río Túria.', 
                
                'Una experiencia única que te permitirá descubrir paisajes increíbles rodeados de naturaleza y aves como el buitre leonado o el águila real. El Alto Turia de Valencia en todo su esplendor y majestuosidad, como sólo la vista desde un kayak puede ofrecer.', 
                
                'Esta actividad es perfecta para disfrutar de un fantástico día de primavera o verano con amigos o familia. Los Kayak con varias plazas permiten dosificar bien el esfuerzo y disfrutar en compañía de una ruta inolvidable por el embalse. El embalse de Benagéber cuenta con 722 hectáreas navegables e incluye entre sus límites la reserva de fauna natural Valdeserillas. Un enclave precioso a menos de 1 hora de Valencia.',

                '2022-02-03 16:37:55'), 

                (1, 4, 4, 12, 67,'2022-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

                'Equipo: casco, arnés, material técnico, pie de gato y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de montaña, agua y mochila.',
                
                'Media jornada.
                Todo el año.',

                'Podrás disfrutar de esta maravillosa actividad en un entorno único como es el Alto Turia en la Serranía de Valencia. Auténtico paraíso de la escalada con un entorno inmejorable, vías ferratas, gargantas, desfiladeros y murallas de hasta 200 m de altura.',

                'La Escalada es un deporte que consiste en realizar una progresión vertical ya sea en roca natural o en una instalación artificial (rocódromo). Para ellos iremos equipados con arnés y casco, estaremos unidos a la pared por una cuerda y sujetados por un guía en todo momento., Apto para todos los públicos, se trata de una toma de contacto con la escalada donde conocerás el material y realizaras una jornada de iniciación escalando vías de poca dificultad técnica para que puedas experimentar las sensaciones que proporciona este deporte sin preocuparte de nada. Nivel apto para personas aficionados a la naturaleza y con destreza para andar por la montaña. Pasos más técnicos pero de un nivel muy asequible, donde el disfrute es lo principal. Seguridad y diversión a partes iguales.', 

                'Nivel para personas con experiencia anterior en escalada. Vías técnicas y largos de mayor altura. Tramos con mayor exigencia física pero donde la diversión se encuentra en cada pared.', 

                '2022-02-03 16:37:55'),
                
                (1, 5, 5, 12, 67,'2022-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

                'Equipo: casco, arnés, material técnico, pie de gato y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de montaña, agua y mochila.',
                
                'Media jornada.
                Todo el año.',

                'Podrás disfrutar de esta maravillosa actividad en un entorno único como es el Alto Turia en la Serranía de Valencia. Auténtico paraíso de la escalada con un entorno inmejorable, vías ferratas, gargantas, desfiladeros y murallas de hasta 200 m de altura.',

                'La Escalada es un deporte que consiste en realizar una progresión vertical ya sea en roca natural o en una instalación artificial (rocódromo). Para ellos iremos equipados con arnés y casco, estaremos unidos a la pared por una cuerda y sujetados por un guía en todo momento., Apto para todos los públicos, se trata de una toma de contacto con la escalada donde conocerás el material y realizaras una jornada de iniciación escalando vías de poca dificultad técnica para que puedas experimentar las sensaciones que proporciona este deporte sin preocuparte de nada. Nivel apto para personas aficionados a la naturaleza y con destreza para andar por la montaña. Pasos más técnicos pero de un nivel muy asequible, donde el disfrute es lo principal. Seguridad y diversión a partes iguales.', 

                'Nivel para personas con experiencia anterior en escalada. Vías técnicas y largos de mayor altura. Tramos con mayor exigencia física pero donde la diversión se encuentra en cada pared.', 

                '2022-02-03 16:37:55'),
                
                (1, 6, 6, 12, 67,'2022-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

                'Equipo: casco, arnés, material técnico, pie de gato y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de montaña, agua y mochila.',
                
                'Media jornada.
                Todo el año.',

                'Podrás disfrutar de esta maravillosa actividad en un entorno único como es el Alto Turia en la Serranía de Valencia. Auténtico paraíso de la escalada con un entorno inmejorable, vías ferratas, gargantas, desfiladeros y murallas de hasta 200 m de altura.',

                'La Escalada es un deporte que consiste en realizar una progresión vertical ya sea en roca natural o en una instalación artificial (rocódromo). Para ellos iremos equipados con arnés y casco, estaremos unidos a la pared por una cuerda y sujetados por un guía en todo momento., Apto para todos los públicos, se trata de una toma de contacto con la escalada donde conocerás el material y realizaras una jornada de iniciación escalando vías de poca dificultad técnica para que puedas experimentar las sensaciones que proporciona este deporte sin preocuparte de nada. Nivel apto para personas aficionados a la naturaleza y con destreza para andar por la montaña. Pasos más técnicos pero de un nivel muy asequible, donde el disfrute es lo principal. Seguridad y diversión a partes iguales.', 

                'Nivel para personas con experiencia anterior en escalada. Vías técnicas y largos de mayor altura. Tramos con mayor exigencia física pero donde la diversión se encuentra en cada pared.', 

                '2022-02-03 16:37:55'),
                
                (1, 7, 7, 12, 67,'2022-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

                'Equipo: casco, arnés, material técnico, pie de gato y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de montaña, agua y mochila.',
                
                'Media jornada.
                Todo el año.',

                'Podrás disfrutar de esta maravillosa actividad en un entorno único como es el Alto Turia en la Serranía de Valencia. Auténtico paraíso de la escalada con un entorno inmejorable, vías ferratas, gargantas, desfiladeros y murallas de hasta 200 m de altura.',

                'La Escalada es un deporte que consiste en realizar una progresión vertical ya sea en roca natural o en una instalación artificial (rocódromo). Para ellos iremos equipados con arnés y casco, estaremos unidos a la pared por una cuerda y sujetados por un guía en todo momento., Apto para todos los públicos, se trata de una toma de contacto con la escalada donde conocerás el material y realizaras una jornada de iniciación escalando vías de poca dificultad técnica para que puedas experimentar las sensaciones que proporciona este deporte sin preocuparte de nada. Nivel apto para personas aficionados a la naturaleza y con destreza para andar por la montaña. Pasos más técnicos pero de un nivel muy asequible, donde el disfrute es lo principal. Seguridad y diversión a partes iguales.', 

                'Nivel para personas con experiencia anterior en escalada. Vías técnicas y largos de mayor altura. Tramos con mayor exigencia física pero donde la diversión se encuentra en cada pared.', 

                '2022-02-03 16:37:55'),
                
                (1, 8, 8, 12, 67,'2022-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

                'Equipo: casco, arnés, material técnico, pie de gato y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de montaña, agua y mochila.',
                
                'Media jornada.
                Todo el año.',

                'Podrás disfrutar de esta maravillosa actividad en un entorno único como es el Alto Turia en la Serranía de Valencia. Auténtico paraíso de la escalada con un entorno inmejorable, vías ferratas, gargantas, desfiladeros y murallas de hasta 200 m de altura.',

                'La Escalada es un deporte que consiste en realizar una progresión vertical ya sea en roca natural o en una instalación artificial (rocódromo). Para ellos iremos equipados con arnés y casco, estaremos unidos a la pared por una cuerda y sujetados por un guía en todo momento., Apto para todos los públicos, se trata de una toma de contacto con la escalada donde conocerás el material y realizaras una jornada de iniciación escalando vías de poca dificultad técnica para que puedas experimentar las sensaciones que proporciona este deporte sin preocuparte de nada. Nivel apto para personas aficionados a la naturaleza y con destreza para andar por la montaña. Pasos más técnicos pero de un nivel muy asequible, donde el disfrute es lo principal. Seguridad y diversión a partes iguales.', 

                'Nivel para personas con experiencia anterior en escalada. Vías técnicas y largos de mayor altura. Tramos con mayor exigencia física pero donde la diversión se encuentra en cada pared.', 

                '2022-02-03 16:37:55'),
                
                (1, 9, 9, 12, 67,'2022-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

                'Equipo: casco, arnés, material técnico, pie de gato y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de montaña, agua y mochila.',
                
                'Media jornada.
                Todo el año.',

                'Podrás disfrutar de esta maravillosa actividad en un entorno único como es el Alto Turia en la Serranía de Valencia. Auténtico paraíso de la escalada con un entorno inmejorable, vías ferratas, gargantas, desfiladeros y murallas de hasta 200 m de altura.',

                'La Escalada es un deporte que consiste en realizar una progresión vertical ya sea en roca natural o en una instalación artificial (rocódromo). Para ellos iremos equipados con arnés y casco, estaremos unidos a la pared por una cuerda y sujetados por un guía en todo momento., Apto para todos los públicos, se trata de una toma de contacto con la escalada donde conocerás el material y realizaras una jornada de iniciación escalando vías de poca dificultad técnica para que puedas experimentar las sensaciones que proporciona este deporte sin preocuparte de nada. Nivel apto para personas aficionados a la naturaleza y con destreza para andar por la montaña. Pasos más técnicos pero de un nivel muy asequible, donde el disfrute es lo principal. Seguridad y diversión a partes iguales.', 

                'Nivel para personas con experiencia anterior en escalada. Vías técnicas y largos de mayor altura. Tramos con mayor exigencia física pero donde la diversión se encuentra en cada pared.', 

                '2022-02-03 16:37:55')`
        );

        console.log('Experiencias creadas');
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
