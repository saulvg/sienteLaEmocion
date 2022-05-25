const getDB = require('./getDB.js');
const bcrypt = require('bcrypt');
const faker = require('faker/locale/es');

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
            username VARCHAR(50) UNIQUE NOT NULL,
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
            id_company INT NOT NULL,
            vote TINYINT,
            review VARCHAR(255),
            createdAt DATETIME NOT NULL,
            id_user INT NOT NULL,
            FOREIGN KEY(id_user) REFERENCES users(id),
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE,
            FOREIGN KEY (id_company) REFERENCES company(id) 
            
        )
    `);

        await connection.query(`
        CREATE TABLE booking (
            id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            id_user INT NOT NULL,
            userMessage VARCHAR(255),
            createdAt DATETIME NOT NULL,
            FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE,
            FOREIGN KEY (id_user) REFERENCES users(id)
        )
    `);

        // Creamos la contraseña del administrador y la encriptamos.
        const { ADMIN_PASS } = process.env;
        const adminPassword = await bcrypt.hash(ADMIN_PASS, saltRounds);
        const { ADMIN_EMAIL } = process.env;

        // Insertamos el usuario administrador.
        await connection.query(`
        INSERT INTO users (email, password, username, active, role, dni_nie, postalCode, phone, createdAt)
        VALUES (
            "${ADMIN_EMAIL}",
            "${adminPassword}",
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
            const username = faker.internet.userName();

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
                ('Escalada'), ('Monta a Caballo'), ('Buceo'),('espeleologia'),('motorciclismo'),('yoga'),('piraguismo'),('esqui'),('paracaidismo')`
        );
        console.log('Categorias creadas');

        await connection.query(
            `INSERT INTO experiences 
                (id_user, id_experiences_category, id_company, capacity, price, date, city, direction, text_1, text_2, text_3, text_4, text_5, text_6, createdAt) 
            VALUES 
                (1, 1, 1, 12, 67,'2021-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

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

                (1, 2, 2, 8, 32,'2021-02-03 16:37:55', 'Teruel', 'Albarracin N 23', 

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
                
                (1, 3, 3, 8, 32,'2021-02-03 16:37:55', 'Teruel', 'Albarracin N 23', 

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

                (1, 4, 4, 12, 67,'2021-02-03 16:37:55', 'Las Palmas', 'Juan Bethencourt', 

                'Equipo: linternas.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de montaña, mochila y agua',
                
                'Media jornada.
                Todo el año.',

                'La espeleología es la ciencia que estudia el origen y la formación de las cavernas y las cavidades subterráneas naturales. Analiza su morfología, su flora y fauna.',

                'Esta experiencia no tiene niveles de dificultad', 

                'Para los más experimentados, organizamos excursiones a cuevas donde la dificultad de acceso es alta', 

                '2022-02-03 16:37:55'),
                
                (1, 5, 5, 12, 67,'2021-02-03 16:37:55', 'Tenerife', 'Santa Cruz de Tenerife', 

                'Equipo: Motocicleta y cascos.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Guantes, chaqueta de cuero homologada y botas',
                
                'Media jornada.
                Todo el año.',

                'Nos referimos a motociclismo cuando hablamos del uso deportivo de la motocicleta en todas sus variantes. Este ejercicio comenzó a llevarse a cabo cuando se creó la Federación Internacional del Motociclismo, que es el órgano gobernante de las competiciones.',

                'Hay tres niveles de dificultad: principiante, medio y experto', 

                'Si te desenvuelves con soltura, puedes atreverte montar en nuestras motos de mayor cilindrada, así como participar en carreras que organizamos', 

                '2022-02-03 16:37:55'),
                
                (1, 6, 6, 12, 67,'2021-02-03 16:37:55', 'La Gomera', 'Garajonay', 

                'Equipo: Esterilla.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Ropa cómoda y calcetines antideslizantes',
                
                'Media jornada.
                Todo el año.',

                'El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.',

                'Hay tres niveles de dificultad: principiante, medio y experto', 

                'Formarás parte del grupo de expertos, donde podrás realizar las posturas más complicadas de realizar en el yoga', 

                '2022-02-03 16:37:55'),
                
                (1, 7, 7, 12, 70,'2021-02-03 16:37:55', 'Asturias', 'Finca Fundición de Coviella', 

                'Equipo: ropa cómoda y calzado apropiado
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado cerrado',
                
                '4h
                Todo el año.',

                'La actividad estrella dentro de las actividades de aventura en Asturias, consiste en el descenso del río Sella en canoa o kayak (piraguas), entre las localidades de Arriondas a Llovió, en las inmediaciones de Ribadesella.
                El descenso del Sella se hace a lo largo de siete, once o dieciséis kilómetros, decidiendo tú la distancia en el mismo momento que realizas la actividad.',

                'El piragüismo es un deporte acuático que se practica sobre una embarcación, fabricada en diversos materiales que variarán en función de las características del medio donde naveguemos y la especialidad que practiquemos.

                Hay diversas especialidades para practicarlo, como pueden ser: aguas bravas, aguas tranquilas, kayak-polo y kayak de mar. En cada una de ellas se utilizan diferentes tipos de material adecuados al medio donde se practican las especialidades, siendo compatibles en algunos casos. Así mismo dentro de cada especialidad hay diferentes modalidades.', 

                'Lo único que se necesita es saber nadar, pues lógicamente al ser una actividad de aventura que se desarrolla en el agua, por seguridad es imprescindible saber defenderse en el medio.
                Por lo demás es una actividad totalmente segura, que se puede hacer sin ningún problema. Además, cuenta con embarcaciones adaptadas para personas con movilidad reducida', 

                '2022-07-03 16:37:55'),
                
                (1, 8, 8, 12, 67,'2021-02-03 16:37:55', 'Sierra Nevada', 'Granada', 

                'Equipo: 	Esquís de montaña, botas, palos, sonda, pala, A.R.V.A. Además del material necesario para una actividad invernal. De no tenerlo se puede alquilar en la estación.

                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de nieve, agua y mochila.',
                
                '3h.
                Invierno.',

                'Con estas clases te ofrecemos la posibilidad de entrar en el apasionante mundo del esquí de montaña, dándote los elementos básicos necesarios para moverte con la suficiente seguridad en itinerarios fáciles, y si tienes experiencia podrás desarrollar más tus conocimientos gracias a los profesionales enfocados por niveles.
',

                'Sierra Nevada proporciona uno de los dominios esquiables más amplios y atractivos del sur de Europa. La estación invernal cuenta con 110,4 km esquiables distribuidos en 131 pistas con el mayor desnivel esquiable de España (1.200m).
El esquí es un deporte de invierno que se realiza sobre dos tablas para deslizar sobre la nieve. Ambas tablas -denominadas comúnmente como esquís- están sujetas a la suela del calzado del esquiador, mediante un sistema de fijación.
Históricamente, el esquí surgió como consecuencia de una necesidad de transporte pero actualmente, está ligado a la práctica puramente deportiva y lúdica.'
, 

                'No es necesaria experiencia previa para el grupo de iniciación. ', 

                '2022-02-03 16:37:55'),
                
                (1, 9, 9, 12, 67,'2021-02-03 16:37:55', 'Vigo', 'Av. de Lavadores', 

                'Equipo: mono, casco, arnés y gafas
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado cerrado',
                
                '3h.
                Todo el año.',

                'El salto en paracaídas está pensado para que cualquier persona que cumpla una serie de requisitos mínimos pueda hacer paracaidismo de forma rápida y con total seguridad, ya que  durante todas las fases del salto la persona permanece unida a uno de nuestros expertos instructores mediante un paracaídas biplaza desde la salida del avión hasta el aterrizaje.',

                'El paracaidismo es un deporte extremo que incluye salto con paracaídas, el cual puede ser realizado desde un avión, un helicóptero o un globo aerostático.
Durante la caída, es necesario activar dicho paracaídas para aterrizar de la manera más segura.
Se trata de uno de los deportes más atractivos y apasionantes, por lo que a él van asociados también unos componentes de diversión, ocio y fines recreativos, de ahí que muchos se planteen si el paracaidismo es realmente un deporte.
', 

                'Nivel para personas sin experiencia anterior, ya que en todo momento hay un profesional con la persona participante. ', 

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
