//consegimos un aconexionlibre con la base de datos y para eso nos conectamos con la base de datos ya que vamos a crear un nuevo usuario alli 
const getDB = require('../../database/getDB')

//Requerimos la dependencia bcrypt para .hash las password
const bcrypt = require('bcrypt');
const saltRounds = 10; //nivel de encriptacion de bcrypt, la recomendada por el creador es 10

//importamos la funcion del fichero helpers que nos va ha ayudar a crear una cadena alfanumerica como codigo de registro
const { generateRandomString, sendMail } = require('../../helpers');

//requerimos la variable del servidor para no andar escribiendola todo el rato, se encuentra en el .envv
const { PUBLIC_HOST } = process.envv


//funcion controladora de el endpoin /users con el metodo POST
const newUser = async (req, res, next) => {
    let connection;

    try {
        //intentamos obtener una nueva conexion 
        connection = await getDB();

        //obtenemos los campos necesarios del body con destructurin
        const {email, password, username, dni_nie,postalCode, phone} = req.body;

        //como estos dos campos son obligatorios comproamos que estan rellenados
        if(!email || !password || !username || !dni_nie || !postalCode || !phone) {
            const error =  new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        //Generamos un codiogo de registro
        const registrationCode = generateRandomString(40);

        //Haseamos la password
        const hashedPasswors = await bcrypt.hash(password, saltRounds);

        //Guardamos el usuario en la base de datos
        await connection.query(
            `INSERT INTO users (email, password, username, dni_nie, postalCode, phone, registrationCode, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [email, hashedPasswors, username, dni_nie, postalCode, phone, registrationCode, new Date()] //con el metodo de las interrogaciones la fecha se formatea sola
        );

        //Mensaje que enviaremso al correo del usuario
        const emailBody = `
            Te acabas de registrar en Siente la EMOCION!!.
            Pulsa este link para verificar tu cuenta: ${PUBLIC_HOST}/users/validate/${registrationCode}    
        `;

        //Enviamos el email
        await sendMail({
            to: email,
            subject: 'Activa tu usuario de Siente la EMOCION!!',
            body: emailBody
        });

        //express asume que sino ponemos el res.status('codigo de peticion') el codigo es 200, por lo que en este caso que es para si todo va bien , no haria falta ponerlo, si lo ponemos tampoco pasa nada
         res.send({
             status:'ok', 
             message: 'Usuario registrado, comprueba tu email para activarlo'
         });

    } catch (error) {
        console.error(error);//impresion de error solo para que se ubique el desarrollador
        next(error)
    }finally{
        if(connection) connection.release();
    }
    
};

module.exports = newUser;