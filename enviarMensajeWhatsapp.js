const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')
router.route('/').post(async (req, res) => {
  let { usuario, numero, correo } = req.body
  console.log(usuario)
  console.log(numero)
  console.log(correo)
  if (numero.includes(" ")) {
    let numTemp = ""
    for (let i = 0; i < numero.length; i++) {
      if (numero[i] !== " ") {
        numTemp+=[i]
      }
    }
    numero = numTemp
  }
  console.log(numero)
  await enviarMensaje('hello_world', null, numero)
  //  await enviarMensaje(
  //   null,
  //   `¡Hey ${usuario}! Bienvenido a The HangGame.`,
  //   numero
  // )
 
})

module.exports = router
