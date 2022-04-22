const getDB = require('./getDB');

const experiences = async () => {
    let connection;

    try {
        connection = await getDB();

        await connection.query(
            `INSERT INTO experiences 
                (id_user, id_experiences_category, id_company, capacity, price, date, city, direction, text_1, text_2, text_3, text_4, text_5, text_6, createdAt) 
            VALUES 
                (1, 1, 1, 12, 67,'2022-02-03 16:37:55', 'Huesca', 'Vadiello calle Mayor', 

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

                (1, 2, 2, 8, 32,'2022-02-03 16:37:55', 'Teruel', 'Albarracin N 23', 

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
                
                (1, 2, 2, 8, 32,'2022-02-03 16:37:55', 'Teruel', 'Albarracin N 23', 

                'Equipo: chaleco salvavidas, pala y kayak.
                Seguro de Responsabilidad Civil.
                Seguro de Accidentes.',
                
                'Ropa de recambio, bañazor y calzado acuático.',
                
                'Media jornada.
                Primavera y verano.',

                'Una actividad perfecta para disfrutar con toda la familia, realizando un recorrido por un entorno idílico como es el pantano de Benagéber. Aguas mansas y tranquilas donde podrás descubrir cañones y acantilados excavados en la piedra por el río Túria.', 
                
                'Una experiencia única que te permitirá descubrir paisajes increíbles rodeados de naturaleza y aves como el buitre leonado o el águila real. El Alto Turia de Valencia en todo su esplendor y majestuosidad, como sólo la vista desde un kayak puede ofrecer.', 
                
                'Esta actividad es perfecta para disfrutar de un fantástico día de primavera o verano con amigos o familia. Los Kayak con varias plazas permiten dosificar bien el esfuerzo y disfrutar en compañía de una ruta inolvidable por el embalse. El embalse de Benagéber cuenta con 722 hectáreas navegables e incluye entre sus límites la reserva de fauna natural Valdeserillas. Un enclave precioso a menos de 1 hora de Valencia.',

                '2022-02-03 16:37:55')`
        );
    } catch (error) {
        /* (1, 2, 2, 12, ${img}, 34, 25, '2022-02-03 16:37:55','Zaragoza', 22005, '2022-02-03 16:37:55'),
        (1, 3, 3, 12, ${img}, 12, 50, '2022-02-03 16:37:55', 'Teruel', 22003, '2022-02-03 16:37:55') */
        console.error(error);
    } finally {
        if (connection) connection.release();

        process.exit();
    }
};
experiences();
