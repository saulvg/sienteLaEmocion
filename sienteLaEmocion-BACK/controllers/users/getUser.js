//consegimos un aconexionlibre con la base de datos y para eso nos conectamos con la base de datos ya que vamos a solicitar informacion del usuario.
const getDB = require('../../database/getDB');


//funcion controladora de el endpoin.
const getUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Obtenemos el id del usuario del que queremos obtener la info.
        const { idUser } = req.params;

        // Obtenemos el id del usuario que realiza la request.
        const idReqUser = req.userAuth.id;

        // Obtenemos todos los datos que me interesan del usuario del cuál
        // se solicita información.
        const [users] = await connection.query(
            `SELECT id, username, email, avatar, role, biography, createdAt FROM users WHERE id = ?`,
            [idUser]
        );

        // Objeto co nla información básica del usuario.
        const userInfo = {
            username: users[0].username,
            avatar: users[0].avatar,
            biography:users[0].biography
        };

        // Si el usuario que realiza la request es el dueño de dicho usuario o si es
        // un administrador vamos a agregar información extra.
        if (users[0].id === idReqUser || req.userAuth.role === 'admin') {
            userInfo.email = users[0].email;
            userInfo.role = users[0].role;
            userInfo.createdAt = users[0].createdAt;
        }
        //express asume que sino ponemos el res.status('codigo de peticion') el codigo es 200, por lo que en este caso que es para si todo va bien , no haria falta ponerlo, si lo ponemos tampoco pasa nada
        res.send({
            status: 'ok',
            data: {
                user: userInfo,
            },
        });
    } catch (error) {
        console.error(error);//impresion de error solo para que se ubique el desarrollador
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUser;