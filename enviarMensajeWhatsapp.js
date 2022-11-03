const router = require('express').Router()
const enviarMensaje = require("./enviarMensaje")
router.route('/').post((req, res) => {
  const mensaje = req.body.mensaje
  console.log(mensaje);
  enviarMensaje("hello_world")
})

module.exports = router
