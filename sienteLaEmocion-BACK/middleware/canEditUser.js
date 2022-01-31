//Middlewate que nos sirve para ver si el usuario que intenta editar el perfil es el mismo que el dueño del perfil 

const getDB = require('../database/getDB')


const canEditUser = async (req, res ,next) => {
    let connection;

    try {
        connection = await getDB()

        //obtenemos el id del usuario que quereos editar
        const {idUser} = req.params;

        //cuidado idUser viene como string por lo que al compararlo con idReqUser que viene como numero daria error, por eso pasamos  a numero el primero 
        //lanzamos un error si el id del usuario que queremos editar y el id del usuario que realiza la request(peticion) no es el mismo
        //req.userAuth viene del valor del token que fabricamos en el fichero previo que llamamos a este (isAuth.js) y el punto id para acceder al valor de la propiedad id
        if(Number(idUser) !== req.userAuth.id) {
            const error = new Error('No tienes suficientes permisos')
            error.http=403
            throw error
        }

        //si todo ha ido bien le pasamos el control a la siguiente fincion
        next()
    } catch (error) {
        next(error)
    }finally {
        if (connection) connection.release()
    }
}
module.exports = canEditUser;