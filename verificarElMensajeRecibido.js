const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')

let palabraSecreta = 'banana'
let mensaje = ''
let jugando = false
let errores = 0
let palabraSecretaMensaje = ''
let mensajeHombre = ''
let arrPalabraSecreta = palabraSecreta.split('')
let letrasErroneas = ''
for (let i = 0; i < arrPalabraSecreta.length; i++) {
  palabraSecretaMensaje += '_'
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
  console.log(mensajeGuionesTemp)
  return mensajeGuionesTemp
}
async function mostrarAhorcado (
  letrasErroneas,
  errores,
  palabraSecretaMensaje,
  aviso
) {
  let mensaje =
    IMAGENES_AHORCADO[errores] +
    `\n\n` +
    `\t\t\t\t\t\t` +
    formatearMensaje(palabraSecretaMensaje) +
    `\n\n` +
    `_Letras erróneas : ${formatearMensaje(letrasErroneas)}_`
  await enviarMensaje(null, aviso)
  await enviarMensaje(null, mensaje) // se envia el mensaje
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
            await mostrarAhorcado(
              letrasErroneas,
              errores,
              palabraSecretaMensaje,
              'EL JUEGO DEL AHORCADO 🧑‍🔬'
            )
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
          if (jugando == true) {
            // if (mensaje.length == 1) {
            mensaje = mensaje.toLowerCase()
            console.log(palabraSecretaMensaje)
            if (mensaje.length > 1) {
              // verifica que sea una letra
              await mostrarAhorcado(
                letrasErroneas,
                errores,
                palabraSecretaMensaje,
                '_Recuerda, es 1 letra a la vez_'
              )
              res.sendStatus(200)
              return
            }
            if (
              arrPalabraSecreta.includes(mensaje) &&
              !palabraSecretaMensaje.includes(mensaje) &&
              mensaje.length == 1
            ) {
              palabraSecretaMensaje = palabraSecretaMensaje.split('') // se vuelve un array
              for (let i = 0; i < arrPalabraSecreta.length; i++) {
                //  aqui se agregan las letras que son correctas
                if (arrPalabraSecreta[i] === mensaje) {
                  palabraSecretaMensaje[i] = arrPalabraSecreta[i]
                }
              }
              await mostrarAhorcado(
                letrasErroneas,
                errores,
                palabraSecretaMensaje,
                '_¡Genial! Has acertado una letra._'
              )
            } else {
              errores++
              letrasErroneas += mensaje
              await mostrarAhorcado(
                letrasErroneas,
                errores,
                palabraSecretaMensaje,
                '_¡Oh! Has fallado._'
              )
            }

            // } else {
            // if (mensaje !== '') {
            // errores++
            // await enviarMensaje(null, 'Recuerda, es solo 1 letra...')
            // }
            // }

            mensaje = '' // se reinicia la varibale mensaje
          }
          break
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
