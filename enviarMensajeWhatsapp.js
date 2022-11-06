const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')
router.route('/').post(async (req, res) => {
  const { usuario, numero, correo } = req.body
  console.log(usuario)
  await enviarMensaje('hello_world', null, numero)
  await enviarMensaje(
    null,
    `¡Hey ${usuario}! Bienvenido a The HangGame.`,
    numero
  )
})

module.exports = router
