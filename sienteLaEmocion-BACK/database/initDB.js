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

        // Creamos la contrase??a del administrador y la encriptamos.
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

        // Constante que nos dice el n?? de usuarios que vamos a crear.
        const USERS = 10;

        // Creamos un bucle que se repite tantas veces como n?? de usuarios.
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
                ('monta??as felices', 'https://www.instagram.com/onclimb_official/', 'https://es-es.facebook.com/'),
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
        console.log('Coma??ias creadas');

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

                'Equipo: casco, arn??s, material t??cnico, pie de gato y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de monta??a, agua y mochila.',
                
                'Media jornada.
                Todo el a??o.',

                'Podr??s disfrutar de esta maravillosa actividad en un entorno ??nico como es el Alto Turia en la Serran??a de Valencia. Aut??ntico para??so de la escalada con un entorno inmejorable, v??as ferratas, gargantas, desfiladeros y murallas de hasta 200 m de altura.',

                'La Escalada es un deporte que consiste en realizar una progresi??n vertical ya sea en roca natural o en una instalaci??n artificial (roc??dromo). Para ellos iremos equipados con arn??s y casco, estaremos unidos a la pared por una cuerda y sujetados por un gu??a en todo momento., Apto para todos los p??blicos, se trata de una toma de contacto con la escalada donde conocer??s el material y realizaras una jornada de iniciaci??n escalando v??as de poca dificultad t??cnica para que puedas experimentar las sensaciones que proporciona este deporte sin preocuparte de nada. Nivel apto para personas aficionados a la naturaleza y con destreza para andar por la monta??a. Pasos m??s t??cnicos pero de un nivel muy asequible, donde el disfrute es lo principal. Seguridad y diversi??n a partes iguales.', 

                'Nivel para personas con experiencia anterior en escalada. V??as t??cnicas y largos de mayor altura. Tramos con mayor exigencia f??sica pero donde la diversi??n se encuentra en cada pared.', 

                '2022-02-03 16:37:55'),

                (1, 2, 2, 8, 32,'2021-02-03 16:37:55', 'Teruel', 'Albarracin N 23', 

                'Equipo: casco y avituallamiento.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Ropa c??moda (mallas largas o similar) y calzado deportivas o monta??a.',
                
                '2 horas.
                Todo el a??o.',

                'Con nuestra Ruta a Caballo disfrutar??s de un agradable y gratificante paseo ecuestre recorriendo los vi??edos y pinares que rodean la poblaci??n de Titaguas. Nuestro gu??a te dar?? todas las explicaciones y consejos necesarios para que s??lo te preocupes de disfrutar.', 
                
                'Si nunca has probado a montar a caballo, te lo recomendamos sin dudar, es una de las actividades que m??s te acercar?? a la verdadera naturalera del ser humano. Realiza tu ruta al ocaso y vivir??s la incre??ble experiencia de un precioso atardecer a caballo. Tomamos como punto de partida la H??pica Buler??as, con sede en Titaguas, y con larga experiencia en doma y actividades ecuestres.', 
                
                'Dependiendo de tu experiencia con caballos, haremos una sencilla toma de contacto y el gu??a te proporcionar?? muchos consejos ??tiles para que disfrutes al m??ximo. No hay duda que el caballo es uno de los animales que m??s fascinaci??n causa a todo el mundo, pero en especial a los ni??os. Es una experiencia que nunca olvidar??n.',

                '2022-02-03 16:37:55'),
                
                (1, 3, 3, 8, 32,'2021-02-03 16:37:55', 'Teruel', 'Albarracin N 23', 

                'Equipo: chaleco salvavidas, pala y kayak.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Ropa de recambio, ba??azor y calzado acu??tico.',
                
                'Media jornada.
                Primavera y verano.',

                'Una actividad perfecta para disfrutar con toda la familia, realizando un recorrido por un entorno id??lico como es el pantano de Benag??ber. Aguas mansas y tranquilas donde podr??s descubrir ca??ones y acantilados excavados en la piedra por el r??o T??ria.', 
                
                'Una experiencia ??nica que te permitir?? descubrir paisajes incre??bles rodeados de naturaleza y aves como el buitre leonado o el ??guila real. El Alto Turia de Valencia en todo su esplendor y majestuosidad, como s??lo la vista desde un kayak puede ofrecer.', 
                
                'Esta actividad es perfecta para disfrutar de un fant??stico d??a de primavera o verano con amigos o familia. Los Kayak con varias plazas permiten dosificar bien el esfuerzo y disfrutar en compa????a de una ruta inolvidable por el embalse. El embalse de Benag??ber cuenta con 722 hect??reas navegables e incluye entre sus l??mites la reserva de fauna natural Valdeserillas. Un enclave precioso a menos de 1 hora de Valencia.',

                '2022-02-03 16:37:55'), 

                (1, 4, 4, 12, 67,'2021-02-03 16:37:55', 'Las Palmas', 'Juan Bethencourt', 

                'Equipo: linternas.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de monta??a, mochila y agua',
                
                'Media jornada.
                Todo el a??o.',

                'La espeleolog??a es la ciencia que estudia el origen y la formaci??n de las cavernas y las cavidades subterr??neas naturales. Analiza su morfolog??a, su flora y fauna.',

                'Esta experiencia no tiene niveles de dificultad', 

                'Para los m??s experimentados, organizamos excursiones a cuevas donde la dificultad de acceso es alta', 

                '2022-02-03 16:37:55'),
                
                (1, 5, 5, 12, 67,'2021-02-03 16:37:55', 'Tenerife', 'Santa Cruz de Tenerife', 

                'Equipo: Motocicleta y cascos.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Guantes, chaqueta de cuero homologada y botas',
                
                'Media jornada.
                Todo el a??o.',

                'Nos referimos a motociclismo cuando hablamos del uso deportivo de la motocicleta en todas sus variantes. Este ejercicio comenz?? a llevarse a cabo cuando se cre?? la Federaci??n Internacional del Motociclismo, que es el ??rgano gobernante de las competiciones.',

                'Hay tres niveles de dificultad: principiante, medio y experto', 

                'Si te desenvuelves con soltura, puedes atreverte montar en nuestras motos de mayor cilindrada, as?? como participar en carreras que organizamos', 

                '2022-02-03 16:37:55'),
                
                (1, 6, 6, 12, 67,'2021-02-03 16:37:55', 'La Gomera', 'Garajonay', 

                'Equipo: Esterilla.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Ropa c??moda y calcetines antideslizantes',
                
                'Media jornada.
                Todo el a??o.',

                'El yoga es una pr??ctica que conecta el cuerpo, la respiraci??n y la mente. Esta pr??ctica utiliza posturas f??sicas, ejercicios de respiraci??n y meditaci??n para mejorar la salud general.',

                'Hay tres niveles de dificultad: principiante, medio y experto', 

                'Formar??s parte del grupo de expertos, donde podr??s realizar las posturas m??s complicadas de realizar en el yoga', 

                '2022-02-03 16:37:55'),
                
                (1, 7, 7, 12, 70,'2021-02-03 16:37:55', 'Asturias', 'Finca Fundici??n de Coviella', 

                'Equipo: ropa c??moda y calzado apropiado
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado cerrado',
                
                '4h
                Todo el a??o.',

                'La actividad estrella dentro de las actividades de aventura en Asturias, consiste en el descenso del r??o Sella en canoa o kayak (piraguas), entre las localidades de Arriondas a Llovi??, en las inmediaciones de Ribadesella.
                El descenso del Sella se hace a lo largo de siete, once o diecis??is kil??metros, decidiendo t?? la distancia en el mismo momento que realizas la actividad.',

                'El pirag??ismo es un deporte acu??tico que se practica sobre una embarcaci??n, fabricada en diversos materiales que variar??n en funci??n de las caracter??sticas del medio donde naveguemos y la especialidad que practiquemos.

                Hay diversas especialidades para practicarlo, como pueden ser: aguas bravas, aguas tranquilas, kayak-polo y kayak de mar. En cada una de ellas se utilizan diferentes tipos de material adecuados al medio donde se practican las especialidades, siendo compatibles en algunos casos. As?? mismo dentro de cada especialidad hay diferentes modalidades.', 

                'Lo ??nico que se necesita es saber nadar, pues l??gicamente al ser una actividad de aventura que se desarrolla en el agua, por seguridad es imprescindible saber defenderse en el medio.
                Por lo dem??s es una actividad totalmente segura, que se puede hacer sin ning??n problema. Adem??s, cuenta con embarcaciones adaptadas para personas con movilidad reducida', 

                '2022-07-03 16:37:55'),
                
                (1, 8, 8, 12, 67,'2021-02-03 16:37:55', 'Sierra Nevada', 'Granada', 

                'Equipo: 	Esqu??s de monta??a, botas, palos, sonda, pala, A.R.V.A. Adem??s del material necesario para una actividad invernal. De no tenerlo se puede alquilar en la estaci??n.

                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado de nieve, agua y mochila.',
                
                '3h.
                Invierno.',

                'Con estas clases te ofrecemos la posibilidad de entrar en el apasionante mundo del esqu?? de monta??a, d??ndote los elementos b??sicos necesarios para moverte con la suficiente seguridad en itinerarios f??ciles, y si tienes experiencia podr??s desarrollar m??s tus conocimientos gracias a los profesionales enfocados por niveles.
',

                'Sierra Nevada proporciona uno de los dominios esquiables m??s amplios y atractivos del sur de Europa. La estaci??n invernal cuenta con 110,4 km esquiables distribuidos en 131 pistas con el mayor desnivel esquiable de Espa??a (1.200m).
El esqu?? es un deporte de invierno que se realiza sobre dos tablas para deslizar sobre la nieve. Ambas tablas -denominadas com??nmente como esqu??s- est??n sujetas a la suela del calzado del esquiador, mediante un sistema de fijaci??n.
Hist??ricamente, el esqu?? surgi?? como consecuencia de una necesidad de transporte pero actualmente, est?? ligado a la pr??ctica puramente deportiva y l??dica.'
, 

                'No es necesaria experiencia previa para el grupo de iniciaci??n. ', 

                '2022-02-03 16:37:55'),
                
                (1, 9, 9, 12, 67,'2021-02-03 16:37:55', 'Vigo', 'Av. de Lavadores', 

                'Equipo: mono, casco, arn??s y gafas
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Calzado cerrado',
                
                '3h.
                Todo el a??o.',

                'El salto en paraca??das est?? pensado para que cualquier persona que cumpla una serie de requisitos m??nimos pueda hacer paracaidismo de forma r??pida y con total seguridad, ya que  durante todas las fases del salto la persona permanece unida a uno de nuestros expertos instructores mediante un paraca??das biplaza desde la salida del avi??n hasta el aterrizaje.',

                'El paracaidismo es un deporte extremo que incluye salto con paraca??das, el cual puede ser realizado desde un avi??n, un helic??ptero o un globo aerost??tico.
Durante la ca??da, es necesario activar dicho paraca??das para aterrizar de la manera m??s segura.
Se trata de uno de los deportes m??s atractivos y apasionantes, por lo que a ??l van asociados tambi??n unos componentes de diversi??n, ocio y fines recreativos, de ah?? que muchos se planteen si el paracaidismo es realmente un deporte.
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
