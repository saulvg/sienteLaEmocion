//para crear y enviar codigo de registro
const crypto = require('crypto'); //esta dependencia ya viene en el core modules de node, no hace falta instalarla
const sgMail = require('@sendgrid/mail');
const sharp = require('sharp');
const path = require('path');
const uuid = require('uuid');
const { ensureDir, unlink } = require('fs-extra');

//importamos las variables de entorno
const { SENDGRID_API_KEY, SENDGRID_FROM, UPLOADS_DIRECTORY } = process.env;

//Asignamos la API KEY de Sendgird
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * #####################################
 * ## Generar una cadena alfanumerica ##
 * #####################################
 */

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

/**
 * #############################################
 * ## Enviar un Email de activacion de cuenta ##
 * #############################################
 */

async function sendMail({ to, subject, body }) {
    try {
        //preparamso el mensaje que se enviara
        const msg = {
            to, //para
            from: SENDGRID_FROM, //de
            subject, //asunto
            text: body, //cuarpo del mensaje
            //composicon del mail
            html: ` 
                <div>
                    <h1>${subject}</h1>
                    <p>${body}</p>
                </div>
            `,
        };

        //enviamos el mensaje
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
        throw new Error('Hubo un problema al enviar el mensaje');
    }
}

/**
 * #####################################
 * ## Guardar una foto en el servidor ##
 * #####################################
 */

//creamos una ruta absoluta al directorio de subida de archivos
const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY);

async function savePhoto(img, type) {
    try {
        //Comprobamos que el directorio de la subida de imagen exista, y sino se crea uno (gracias a fs-extra)
        await ensureDir(uploadsDir);

        //Convertimos la imagen en un objeto tipo 'Sharp'
        const sharpImg = sharp(img.data);

        //Accedemos a los metadatos de la imagen para posteriormente comprobar el ancho y/o alto de la imagen
        //creo que no vamos a usar esta variable
        //const imgInfo = await sharpImg.metadata();

        //Comprobamos el tipo de img es 0 (imgAvatar) si es 1 (imgExperiences). Para redimensionar las imagenes
        //ESTOS VALORES ME LOS E INVENTADO,HAY QUE HABLARLOS
        if (type === 0) {
            sharpImg.resize(150, 150);
        } else if (type === 1) {
            sharpImg.resize(1000, 700);
        }

        //Generamos un nombre unico para esa imagen (con un paquete llamado 'uuid')
        const imgName = `${uuid.v4()}.jpg`;

        //Creamos la ruta absoluta a la ubicacion donde queremos guardar la imagen
        const imgPath = path.join(uploadsDir, imgName);

        //Guardamos la imagen en el directorio uploads
        await sharpImg.toFile(imgPath);

        //Retornamos el nombre de la imagen
        return imgName;
    } catch (error) {
        console.error(error);
        throw new Error('Error al procesar la imagen');
    }
}

/**
 * ####################################
 * ## Eliminar una foto del servidor ##
 * ####################################
 */
async function deletePhoto(photoName) {
    try {
        //Creamos la ruta absoluta a la foto
        const photoPath = path.join(uploadsDir, photoName);

        //Eliminamos la foto del disco?
        await unlink(photoPath);
    } catch (error) {
        console.error(error);
        if (error.code === 'ENOENT') {
            console.log('seguimos');
        } else {
            console.error('error del catch', error.code);
            throw new Error('Error al eliminar la imagen del servidor');
        }
    }
}

module.exports = {
    generateRandomString,
    sendMail,
    savePhoto,
    deletePhoto,
};
