//gracias a este archivo solo importamos al archivo server un archivo y no todos los de las funciones controladoras

const getUser = require('./getUser');
const newUser = require('./newUser');
const loginUser = require('./loginUser');
const validateUser = require('./validateUser');
const editUser = require('./editUser');
const editUserAvatar = require('./editUserAvatar');

module.exports = {
    newUser,
    getUser,
    loginUser,
    validateUser,
    editUser,
    editUserAvatar,
};
