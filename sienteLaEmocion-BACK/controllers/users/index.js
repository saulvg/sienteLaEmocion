//gracias a este archivo solo importamos al archivo server un archivo y no todos los de las funciones controladoras

const getUser = require('./getUser');
const newUser = require('./newUser');
const validateUser = require('./validateUser')


module.exports = {
    newUser,
    getUser,
    validateUser,

};