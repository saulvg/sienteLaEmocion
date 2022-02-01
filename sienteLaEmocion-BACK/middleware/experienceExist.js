const getDB = require('../database/getDB')

const experienceExist = async (req, res, next) => {
    let connection; 
    
    try {
        connection = await getDB()

        //Obtenemos el id de la experiencia que queremso obtener
        const {idExperience} = req.params

        //Tratamos de obtener la experiencia de la base de datos
        const [experiences] = await connection.query(`
        SELECT id FROM experiences WHERE ID = ?`,
        [idExperience])

        //Si la entrada no existe lanzamos un error 
        if(experiences.length < 1) {
            const error = new Error ('La experiencia no existe')
            error.httpStatus = 404
            throw error
        }
        //si todo a ido bien le pasamos el control a la siguiente funncion 
        next()
    } catch (error) {
        next(error)
    }finally {
        if(connection) connection.release()
    }

}

module.exports = experienceExist