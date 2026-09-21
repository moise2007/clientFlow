const http = require("http")
const { app } = require("./app")


// recuperation du port 
const PORT = process.env.PORT || 3000

// creation du serveur HTTP
const serveur = http.createServer(app)

//lancement du serveur
serveur.listen(PORT,"0.0.0.0",(err)=>{
    if(err){
        return console.log("le serveur a tracher")
    }
    console.log(`le serveru a demarrer sur http://localhost:${PORT}`)
})


// ecout du trash du serveur
serveur.on("error",()=>{
    console.log("le serveur a tracher")
})
