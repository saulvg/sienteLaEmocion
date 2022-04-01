//consegimos una conexion libre con la base de datos
const getDB = require('../../database/getDB');
const bcrypt = require('bcrypt');
const saltRounds = 10; //nivel de encriptacion de bcrypt, la recomendada por el creador.
const { generateRandomString, sendMail } = require('../../helpers');
const { PUBLIC_HOST } = process.env;

const newUser = async (req, res, next) => {
    let connection;

    try {
        //intentamos obtener una nueva conexion
        connection = await getDB();

        //obtenemos los campos necesarios del body con destructurin
        const { email, password, username, dni_nie, postalCode, phone } =
            req.body;

        //como estos seis campos son obligatorios comproamos que estan rellenados
        if (
            !email ||
            !password ||
            !username ||
            !dni_nie ||
            !postalCode ||
            !phone
        ) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }
        // Comprobamos si existe un usuario con ese email.
        /*  const [users] = await connection.query(
            `SELECT id, role, password, active FROM users WHERE email = ?`,
            [email]
        ); */

        // Variable que almacenará un valor booleano: contraseña correcta o incorrecta.
        /* let validEmail;

        // En caso de que exista un usuario con el email establecido en el body comprobamos
        // si la contraseña es correcta.
        if (users.length > 0) {
            validEmail = await bcrypt.compare(email, users[0].email);
        }

        if (validEmail) {
            const error = new Error('Email ya existente');
            error.httpStatus = 401;
            throw error;
        } */
        if (password.length < 5 || password.length > 10) {
            const error = new Error(
                'Contraseña debe de tener entre 5 y 10 caracteres'
            );
            error.httpStatus = 400;
            throw error;
        }
        /* 
        if (username.contains(' ')) {
            const error = new Error(
                'El nombre de usuario no puede tener espacios'
            );
            error.httpStatus = 400;
            throw error;
        } */
        //Generamos un codiogo de registro
        const registrationCode = generateRandomString(40);

        //Haseamos la password
        const hashedPasswors = await bcrypt.hash(password, saltRounds);

        //Guardamos el usuario en la base de datos
        await connection.query(
            `INSERT INTO users (email, password, username, dni_nie, postalCode, phone, registrationCode, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                email,
                hashedPasswors,
                username,
                dni_nie,
                postalCode,
                phone,
                registrationCode,
                new Date(),
            ]
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
            body: emailBody,
        });

        //express asume que sino ponemos el res.status('codigo de peticion') el codigo es 200.
        res.send({
            status: 'ok',
            message: 'Usuario registrado, comprueba tu email para activarlo',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUser;
