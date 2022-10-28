const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')
const fetch = require('node-fetch')
// const { reservationsUrl } = require('twilio/lib/jwt/taskrouter/util')
function peticionPalabra () {
  //  https://clientes.api.greenborn.com.ar/public-random-word
  let res = fetch(
    'https://clientes.api.greenborn.com.ar/public-random-word?l=6'
  )
    .then(d => d.json())
    .then(r => {
      return r
    })
    .catch(e => {
      console.log(e)
    })
  // let data = await res.json()
  // console.log(data)
  console.log(res[0])
  return res[0]
}
// async function obtenerPalabra () {
//   palabraSecreta = await peticionPalabra()
// }
let palabraSecreta = peticionPalabra()
// obtenerPalabra()
console.log(palabraSecreta)
let mensaje = ''
let jugando = false
let errores = 0
let palabraSecretaMensaje = ''
let arrPalabraSecreta = palabraSecreta.split('')
let letrasErroneas = ''
for (let i = 0; i < arrPalabraSecreta.length; i++) {
  palabraSecretaMensaje += '_'
}
palabraSecretaMensaje = palabraSecretaMensaje.split('')
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
    `\t\t\t\t\t` +
    formatearMensaje(palabraSecretaMensaje) +
    `\n\n` +
    `_Letras erróneas:_ ${formatearMensaje(letrasErroneas)}`
  await enviarMensaje(null, aviso)
  await enviarMensaje(null, mensaje) // se envia el mensaje
}

const IMAGENES_AHORCADO = [
  `\n\n+\t\t\t\t\t +------+
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
      // verifica que la req sea un mensaje
      console.log(REQ)
      console.log('RECIBIDO ^^^^^^^^^')
      if (REQ[0].button) {
        //verifica si el mensaje fue un boton o un texto
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
        case '/menu':
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
              'Empezando...'
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
            letrasErroneas = ''
            palabraSecreta = peticionPalabra()
            arrPalabraSecreta = palabraSecreta.split('')
            palabraSecretaMensaje = ''
            for (let i = 0; i < arrPalabraSecreta.length; i++) {
              palabraSecretaMensaje += '_'
            }
            palabraSecretaMensaje = palabraSecretaMensaje.split('')
          }
          break
        case '/rendir':
          if (jugando) {
            mensaje = ''
            errores = 0
            letrasErroneas = ''
            palabraSecreta = peticionPalabra()
            arrPalabraSecreta = palabraSecreta.split('')
            palabraSecretaMensaje = ''
            for (let i = 0; i < arrPalabraSecreta.length; i++) {
              palabraSecretaMensaje += '_'
            }
            palabraSecretaMensaje = palabraSecretaMensaje.split('')
            mostrarAhorcado(
              letrasErroneas,
              errores,
              palabraSecretaMensaje,
              'Cambiando palabra...'
            )
          } else {
            await enviarMensaje(null, 'Comando no disponible')
          }

          break

        default:
          let aviso = ''
          let expNum = /[.\d*]/
          if (jugando == true) {
            mensaje = mensaje.toLowerCase()
            console.log(palabraSecretaMensaje)
            if (expNum.test(mensaje)) {
              aviso = '_Recuerda, solo letras(a-z)._'
            } else if (mensaje.length > 1) {
              // verifica que sea una letra
              aviso = '_Recuerda, es 1 letra a la vez_'
            } else if (
              arrPalabraSecreta.includes(mensaje) &&
              mensaje.length == 1
            ) {
              if (!palabraSecretaMensaje.includes(mensaje)) {
                // verifica que no exista
                for (let i = 0; i < arrPalabraSecreta.length; i++) {
                  //  aqui se agregan las letras que son correctas
                  if (arrPalabraSecreta[i] === mensaje) {
                    palabraSecretaMensaje[i] = arrPalabraSecreta[i]
                  }
                }
                aviso = '_¡Genial! Has acertado una letra._'
              } else {
                aviso = '_Mmmm... Esa letra ya existe._'
              }
            } else {
              errores++
              letrasErroneas += mensaje
              aviso = '_¡Oh! Has fallado._'
            }
            await mostrarAhorcado(
              letrasErroneas,
              errores,
              palabraSecretaMensaje,
              aviso
            )
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
