const router = require("express").Router()
const enviarCorreo = require("./enviarCorreo.js")

// AC5de12d20dddbcf7af06d1e7e6cd0ba2d  -- SID
// c2e0ad9d60cd1a75e053814ab82a3935  -- token de autenticacion


router.route("/form-correo").post( async (req,res)=>{
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