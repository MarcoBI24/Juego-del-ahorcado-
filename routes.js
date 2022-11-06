const router = require("express").Router()
const enviarCorreo = require("./enviarCorreo.js")




router.route("/").post( async (req,res)=>{
    console.log(req.body)
    let {usuario, correo, contraseña } = req.body
   
   const status =  await enviarCorreo(usuario,correo,contraseña)

    if (!status.error) {
        console.log(`The user ${usuario} has registered`)
        res.send("Registrado con exito")
    }else{
        console.log(status.error);
        res.send(status.error)
    }

})
module.exports = router