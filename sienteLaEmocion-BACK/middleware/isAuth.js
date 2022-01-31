//Este middleware personalizado, nos sirve para saber si el usuario esta reguistrado o no, si su token es valido 

const getDB = require("../database/getDB");
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Obtenemos la cabezera de autorizacion(el token)
        const {authorization} = req.headers;

        //si no hay cabezera de autorizacion mostramos un error 
        if(!authorization) {
            const error = new Error('Falta la cabezera de autorizacion');
            error.httpStatus = 401;
            throw error;
        }

        //si hay cabezera de autorizacion, creamos una varianle que almacenara informacion del token(formado por id y rol)
        let tokenInfo;
            //creamos este try-catch para en el caso de que el metodo que vamos a utilizar falle, salga en el catch un mensaje personalizado por nosotros y no un mensaje generico en ingles
        try {
            //desencriptamos el token
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (_) {
            const error = new Error('El token no es valido');
            error.httpStatus = 401;
            throw error;
        }

        //seleccionamos el usuario con el id que viene en el token 
        const [users] = await connection.query(
            `SELECT active, deleted  FROM users WHERE id = ?`, 
            [tokenInfo.id]
        )
        //si el usuario no esta activado o esta borrado lanzamos un error 
        if(!users[0].active || users[0].delete){
            const error = new Error ('El token no es valido');
            error.httpStatus = 401;
            throw error;
        }

        //si todo esta bien inyectamos en el objeto 'request' la info del token (id , role) en forma de una nueva propiedad'usersAuth'
        req.userAuth = tokenInfo; // = { id: x, role: y}
        
        //Pasamos el control a la siguiente funcion 
        next();

    } catch (error) {
        next(error)
        
    }finally{
        if (connection) connection.release();
    }
};
 
module.exports = isAuth;