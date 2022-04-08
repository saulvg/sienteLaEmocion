//gracias a la dependecia dotenv y a requerirla aqui (en el fichero principal), puedo importar variables de entorno con el process.env, sin necesidad de requerirla en todos los ficheros que hacen referencia a este
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
//dependencia que llamaremos como middleware para informar al front de que el back le da perimiso para coger datos
const cors = require('cors');

//creamos un servidor de express en la constante app
const app = express();

//extraemos el puerto de nuestro servidor de las variables de entorno
const { PORT } = process.env;

/**
 * #################
 * ## Middlewares ##
 * #################
 */

const {
    isAuth,
    userExists,
    canEditUser,
    experienceExist,
    isAdmin,
} = require('./middleware');

/**
 * ###############################
 * ## Controladores de usuarios ##
 * ###############################
 */

const {
    newUser,
    getUser,
    loginUser,
    validateUser,
    editUser,
    newBooking,
    editPass,
    recoverPass,
    resetPass,
    editUserAvatar,
    deleteUser,
} = require('./controllers/users');

/**
 * ###############################
 * ## Controladores de entradas ##
 * ###############################
 */

const {
    getExperience,
    editExperience,
    experienceVotes,
    newExperience,
    getExperienceList,
    addExperiencePhotos,
    deleteExperience,
    getUserExperiences,
    getReviews,
} = require('./controllers/experiences');

/**
 * #############################
 * ## Controladores de search ##
 * #############################
 */
const search = require('./controllers/search/search');

//Middeleware que nos da informacion acerca de las peticiones que entran en el servidor (esto lo muestra en la terminal, para darnos informacion extra de lo que ocurre)
//habilitando asi la dependencia morgan
//informativa
app.use(morgan('dev'));
app.use(cors());

//Middleware que deserealiza el body en formato row (lo pasa de un formato Buffer a un formato JS) y lo pone disponible en la propiedad request.body
app.use(express.json());

// Middleware que deserializa un body en formato "form-data" y lo pone disponible
// en la propiedad "request.body". Si hay algún archivo estará disponible en la
// propiedad "request.files".
app.use(fileUpload());
// Archivos estáticos
app.use('/uploads', express.static('./static/uploads'));

//.................Vamos a crear todos los middlewares que tienen nuestra pagina...........................

/**
 * ###########################
 * ## Endopoins de usuarios ##
 * ###########################
 */

//Crear un nuevo usuario,
app.post('/users', newUser);

//Validar un nuevo usuario
app.get('/users/validate/:registrationCode', validateUser);

//Logear un usuario.
app.post('/users/login', loginUser);

//Obteenr informacion de un usuario
app.get('/users/:idUser', isAuth, userExists, getUser);

//Editar informacion de un usuario
app.put('/users/edit', isAuth, userExists, canEditUser, editUser);

// editar la contraseña de un usuario
app.put('/users/edit/password', isAuth, userExists, canEditUser, editPass);

// enviar un codigo de recuperación de contraseña al email del usuario
app.put('/users/password/recover', recoverPass);

// resetear la contraseña de un usuario utilizando un codigo de recuperacion
app.put('/users/password/reset', resetPass);

//Editamos el avatar del usuario
app.put('/users/edit/avatar', isAuth, userExists, canEditUser, editUserAvatar);

// Anonimizar un usuario.
app.delete('/users/:id', isAuth, userExists, canEditUser, deleteUser);

/**
 * ##############################
 * ## Endopoins de experiencia ##
 * ##############################
 */

// Crear una nueva experiencia.
app.post('/experiences', isAdmin, newExperience);

//Obtener una experiencia
app.get('/experiences/:idExperience', experienceExist, getExperience);

//Editar una experiencia
app.put('/experiences/:idExperience', isAdmin, editExperience);

// Votar una entrada.
app.post(
    '/experiences/:idExperiencesBooking/votes',
    isAuth,
    userExists,
    experienceExist,
    experienceVotes
);

// borrar review de una experiencia

app.delete(
    'experiences/:idExperience/deleteVotes',
    isAuth,
    userExists,
    experienceExist
);
//reservar una experiencia
app.post('/experiences/:idExperience/booking', isAuth, newBooking);

//Obtener el listado de todas las experiencias
app.get('/experiences', getExperienceList);

//Subir fotos de las experiencias
app.post('/experiences/:idExperience/photos', isAdmin, addExperiencePhotos);

//Obtenemos las reviews de una experienca
app.get('/experiences/:idExperience/reviews', experienceExist, getReviews);

app.get(
    '/experiences/:idExperiencesBooking/booking',
    isAuth,
    userExists,
    getUserExperiences
);
//Eliminar una experiencia
app.delete('/experiences/:idExperience', isAdmin, deleteExperience);

/**
 * ########################
 * ## Endopoin de search ##
 * ########################
 */

app.get('/search', search);

/**
 * ##################################
 * ## Middleware Error & Not Found ##
 * ##################################
 */

//Intentamos entrar en el middleware de error, si no fuese posible entrariamos en el de no encontrado, el orden es imoportante
//Middleware de error.
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    console.log(error); //esto unicamente es para que en consola se nos muestre un error algo mas claro del error
    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});

//Middeleware de no encontrado
//si existe un error lo imprimimos para el cliente en modo de respuesta (res)
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

//Ponemos el servidor a escuchar un puerto
app.listen(PORT, () => {
    console.log(`Server listening http://localhost${PORT}`);
});
