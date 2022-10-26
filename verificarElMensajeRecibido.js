const router = require('express').Router()
const e = require('express')
const enviarMensaje = require('./enviarMensaje')

let palabraSecreta = 'banana'
let mensaje = ''
let jugando = false
let errores = 0
let palabraSecretaMensaje = ''
let mensajeHombre = ''
let arrPalabraSecreta = palabraSecreta.split('')
for (let i = 0; i < arrPalabraSecreta.length; i++) {

  palabraSecretaMensaje += '_'
}
const IMAGENES_AHORCADO = [
  `+\t\t\t\t\t +------+
\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t=========`,
  `+\t\t\t\t\t +------+
\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t O\t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t=========`,
  `+\t\t\t\t\t +------+
\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t O\t\t\t|
\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t=========`,
  `+\t\t\t\t\t +------+
\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t O\t\t\t|
\t\t\t\t\t/|\t\t\t|
\t\t\t\t\t\t\t\t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t=========`,
  `+\t\t\t\t\t +------+
\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t O\t\t\t|
\t\t\t\t\t/|\\ \t\t|
\t\t\t\t\t   \t\t\t|
\t\t\t\t\t    \t\t\t|
\t\t\t\t\t=========`,
  `+\t\t\t\t\t +------+
\t\t\t\t\t  | \t\t\t|
\t\t\t\t\t O \t\t\t|
\t\t\t\t\t/|\\ \t\t|
\t\t\t\t\t/  \t\t\t|
\t\t\t\t\t    \t\t\t|
\t\t\t\t\t=========`,
  `+\t\t\t\t\t +------+
\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t O\t\t\t|
\t\t\t\t\t/|\\ \t\t|
\t\t\t\t\t/ \\ \t\t|
\t\t\t\t\t    \t\t\t|
\t\t\t\t\t=========`
]

router.route('/facebook').post(async (req, res) => {
  // esta funcion espera el mensaje de whatsap

  try {
    const REQ = req.body.entry[0].changes[0].value.messages
    if (REQ !== undefined && REQ[0] !== undefined) {
      console.log(REQ)
      console.log('RECIBIDO ^^^^^^^^^')
      if (REQ[0].button) {
        mensaje = REQ[0].button.payload
      } else if (REQ[0].text) {
        mensaje = REQ[0].text.body
      }
      switch (mensaje) {
        case 'Hola':
          if (!jugando) {
            let nombreUser =
              req.body.entry[0].changes[0].value.contacts[0].profile.name
            await enviarMensaje(null, `Hola ${nombreUser}, ¿Qué tal?`)
            mensaje = ''
          }
          break
        case '/opciones':
          if (jugando == false) {
            await enviarMensaje('mostrar_opciones', null)
          } else {
            await enviarMensaje(null, 'Escribe /salir para abandonar el juego ')
          }
          mensaje = ''
          return res.sendStatus(200)
          break
        case 'Jugar':
          if (!jugando) {
            jugando = true
            await enviarMensaje('como_jugar', null)
            mensaje = ''
          }
          break
        case '/salir':
          if (jugando) {
            jugando = false
            await enviarMensaje(null, 'Saliste del juego')
            mensaje = ''
            errores = 0
            palabraSecretaMensaje = ''
            arrPalabraSecreta.forEach(letra => {
              palabraSecretaMensaje += '_'
            })
          }
          break
        default:
          break
      }

      if (jugando == true) {
        // tener la palabra secreta
        // el largo de la palabra secreta
        // hacer un mensaje con guiones del largo de la palabra secreta
        // hacer un mensaje con el dibujo en la posicion del numero de errores
        // recibir la letra
        if (mensaje.length == 1) {
          mensaje = mensaje.toLowerCase()
          console.log(palabraSecretaMensaje)
          if (
            arrPalabraSecreta.includes(mensaje) &&
            !palabraSecretaMensaje.includes(mensaje)
          ) {
            for (let i = 0; i < arrPalabraSecreta.length; i++) {
              //  aqui se agregan las letras que son correctas
              if (arrPalabraSecreta[i] === mensaje) {
                palabraSecretaMensaje[i] = letra
              }
            }
          } else {
            errores++
          }
        } else {
          if (mensaje !== '') {
            errores++
            await enviarMensaje(null, 'Recuerda, es solo 1 letra...')
          }
        }
        console.log(palabraSecretaMensaje)
        mensaje =
          IMAGENES_AHORCADO[errores] +
          `\n\n` +
          `\t\t\t\t\t\t` +
          formatearMensaje(palabraSecretaMensaje)
        await enviarMensaje(null, mensaje) // se envia el mensaje
        mensaje = '' // se reinicia la varibale mensaje
        palabraSecretaMensaje = palabraSecretaMensaje.split(' ') // se vuelve un array
      }
    } else {
      console.log('El mensaje se ha enviado,entregado o leido')
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(404)
  }

  res.sendStatus(200)
})

module.exports = router
function mostrarAhorcado() {
  
}
function formatearMensaje (msg) {
  let mensajeGuionesTemp = '' // aqui da el espaciado al mensajeGuiones
  for (let i = 0; i < msg.length; i++) {
    if (i == msg.length - 1) {
      // _ _ _ _ _ _
      mensajeGuionesTemp += `${msg[i]}`
    } else {
      mensajeGuionesTemp += `${msg[i]} `
    }
  }
  return mensajeGuionesTemp
}
