//para crear y enviar codigo de registro
const crypto = require('crypto'); //esta dependencia ya viene en el core modules de node, no hace falta instalarla
const sgMail = require('@sendgrid/mail');


//importamos las variables de entorno
const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env;

//Asignamos la API KEY de Sendgird
sgMail.setApiKey('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');


/**
 * #####################################
 * ## Generar una cadena alfanumerica ##
 * #####################################
 */

function generateRandomString (length) {
    return crypto.randomBytes(length).toString('hex');
}

/**
 * #############################################
 * ## Enviar un Email de activacion de cuenta ##
 * #############################################
 */

async function sendMail({to, subject, body}) {
    try {
        console.log("Start sendMail");
        //preparamso el mensaje que se enviara
        const msg = {
            to, //para
            from: SENDGRID_FROM, //de
            subject, //asunto
            text: body, //cuarpo del mensaje
            html: //composicon del mail
            ` 
                <div>
                    <h1>${subject}</h1>
                    <p>${body}</p>
                </div>
            `
        };

        //enviamos el mensaje
        await sgMail.send(msg);
        console.log("End sendMail");
    } catch (error) {
        console.error(error);
        throw new Error('Hubo un problema al enviar el mensaje');
    }
}

module.exports = {
    generateRandomString, 
    sendMail, 
};