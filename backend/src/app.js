const express  = require("express")
const helmet = require("helmet")
const app = express()

// importation des variables d'environement
require("dotenv").config()

// securisation des entetes de responses
app.use(helmet())



module.exports = {app}