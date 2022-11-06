const router = require('express').Router()
const enviarMensaje = require("./enviarMensaje")
router.route('/').post(async (req, res) => {
  const {usuario,numero,correo} = req.body
  console.log(usuario);
  await enviarMensaje("hello_world")
  await enviarMensaje(null,`¡Hey ${usuario}! Bienvenido a The HangGame.`)
})

module.exports = router
