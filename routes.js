const router = require("express").Router()

// funciones

router.route("/").post((req,res)=>{
    const {usuario, email, contraseña, numero } = req.body
    console.log(`The user is ${usuario}`)
})
module.exports = router