const router = require('express').Router()
const { EnvironmentContext } = require('twilio/lib/rest/serverless/v1/service/environment')
const enviarMensaje = require("./enviarMensaje")


router.route("/facebook").post((req, res) => { // esta funcion espera el mensaje de whatsap 
    let mensaje = ""

    console.log('Solicitud de Facebook')
    console.log(JSON.stringify(req.body))
    mensaje = req.body.entry[0].changes[0].value.messages[0].text.body
    if (mensaje === "/opciones") {
        enviarMensaje("mostar_opciones")
    }
    res.sendStatus(200)
  })



module.exports = router