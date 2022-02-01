const isAuth = require("./isAuth");
const userExists = require("./userExists");
const canEditUser = require('./canEditUser')


module.exports={
    userExists,
    isAuth,
    canEditUser
}