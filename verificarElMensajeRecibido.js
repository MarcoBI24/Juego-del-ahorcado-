const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')
const fetch = require('node-fetch')

let palabraSecreta = ''
let mensaje = ''
let jugando = false
let perdio = false
let gano = false
let errores = 0
let letrasErroneas = ''
let palabraSecretaMensaje = ''
let arrPalabraSecreta
let urlPalabra = 'https://clientes.api.greenborn.com.ar/public-random-word?l=5'

async function peticionPalabra () {
  let peticion = await fetch(urlPalabra)
  let respuesta = await peticion.json()
  return respuesta
}

async function asignarVariables () {
  let expRegPalabras = /\w*?[áéíóú]+\w*/
  do {
    let res = await peticionPalabra()
    palabraSecreta = res[0].toLowerCase()
    mensaje = ''
    errores = 0
    letrasErroneas = ''
    palabraSecretaMensaje = ''
    arrPalabraSecreta = palabraSecreta.split('')
    for (let i = 0; i < arrPalabraSecreta.length; i++) {
      palabraSecretaMensaje += '_'
    }
    palabraSecretaMensaje = palabraSecretaMensaje.split('')
  } while (expRegPalabras.test(palabraSecreta))
}
asignarVariables()
let nombreUser
// obtenerPalabra()
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
    `_Letras erróneas:_ ${formatearMensaje(letrasErroneas)}`
  await enviarMensaje(null, aviso)
  await enviarMensaje(null, mensaje) // se envia el mensaje
}

const IMAGENES_AHORCADO = [
  `\n\n.\t\t\t\t\t\t\t +------+
\t\t\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t=========`,
  `.\t\t\t\t\t\t\t +------+
\t\t\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t\t\t O\t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t=========`,
  `.\t\t\t\t\t\t\t +------+
\t\t\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t\t\t O\t\t\t|
\t\t\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t=========`,
  `.\t\t\t\t\t\t\t +------+
\t\t\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t\t\t O\t\t\t|
\t\t\t\t\t\t\t/|\t\t\t|
\t\t\t\t\t\t\t\t\t\t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t=========`,
  `.\t\t\t\t\t\t\t +------+
\t\t\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t\t\t O\t\t\t|
\t\t\t\t\t\t\t/|\\ \t\t|
\t\t\t\t\t\t\t   \t\t\t|
\t\t\t\t\t\t\t    \t\t\t|
\t\t\t\t\t\t\t=========`,
  `.\t\t\t\t\t\t\t +------+
\t\t\t\t\t\t\t  | \t\t\t|
\t\t\t\t\t\t\t O \t\t\t|
\t\t\t\t\t\t\t/|\\ \t\t|
\t\t\t\t\t\t\t/  \t\t\t|
\t\t\t\t\t\t\t    \t\t\t|
\t\t\t\t\t\t\t=========`,
  `.\t\t\t\t\t\t\t +------+
\t\t\t\t\t\t\t  |\t\t\t|
\t\t\t\t\t\t\t O\t\t\t|
\t\t\t\t\t\t\t/|\\ \t\t|
\t\t\t\t\t\t\t/ \\ \t\t|
\t\t\t\t\t\t\t    \t\t\t|
\t\t\t\t\t\t\t=========`
]

router.route('/facebook').post(async (req, res) => {
  // esta funcion espera el mensaje de whatsap
  if (palabraSecreta === '') {
    asignarVariables()
  }
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
      mensaje = mensaje.toLowerCase()
      switch (mensaje) {
        case 'hola':
          if (!jugando) {
            nombreUser =
              req.body.entry[0].changes[0].value.contacts[0].profile.name
            await enviarMensaje(null, `Hola ${nombreUser}, ¿Qué tal?`)
            mensaje = ''
            break
          }
        case '/menu':
          if (jugando == false) {
            await enviarMensaje('mostrar_opciones', null)
          } else {
            await enviarMensaje(null, 'Escribe /salir para abandonar el juego ')
          }
          mensaje = ''
          return res.sendStatus(200)
          break
        case 'jugar':
          if (!jugando) {
            jugando = true
            await mostrarAhorcado(
              letrasErroneas,
              errores,
              palabraSecretaMensaje,
              'Empezando...'
            )
            mensaje = ''
            break
          }
        case '/salir':
          if (jugando) {
            jugando = false
            await enviarMensaje(null, 'Saliste del juego.')
            await asignarVariables()
          }else{
            await enviarMensaje(null, 'Comando no disponible.')
          }
          break
        case '/rendir':
          if (jugando) {
            asignarVariables().then(() => {
              mostrarAhorcado(
                letrasErroneas,
                errores,
                palabraSecretaMensaje,
                'Cambiando palabra...'
              )
            })
          } else {
            await enviarMensaje(null, 'Comando no disponible')
          }

          break
        case '/siguiente':
          if (jugando == true && (gano == true || perdio == true)) {
            asignarVariables().then(() => {
              mostrarAhorcado(
                letrasErroneas,
                errores,
                palabraSecretaMensaje,
                'Nueva palabra'
              )
            })
            gano = false
            perdio = false
          } else {
            await enviarMensaje(null, 'Comando no disponible')
          }
          break
        default:
          let aviso = ''
          let expNum = /[.\d*]/
          if (jugando == true) {
            if (gano === true || perdio === true) {
              await enviarMensaje(
                null,
                'Escriba /siguiente para seguir jugando'
              )

              break
            }
            console.log(palabraSecretaMensaje)
            if (expNum.test(mensaje)) {
              // verifica si es un numero
              aviso = '_Recuerda, solo letras(a-z)._'
            } else if (mensaje.length > 1) {
              // verifica que sea una letra
              aviso = '_Recuerda, es 1 letra a la vez_'
            } else if (
              arrPalabraSecreta.includes(mensaje) &&
              mensaje.length == 1 // se verifica que sea 1 letra y que este incluida en la palabraOriginal
            ) {
              if (!palabraSecretaMensaje.includes(mensaje)) {
                // verifica que no se repita en las palabras correctas
                for (let i = 0; i < arrPalabraSecreta.length; i++) {
                  //  aqui se agregan las letras que son correctas
                  if (arrPalabraSecreta[i] === mensaje) {
                    palabraSecretaMensaje[i] = arrPalabraSecreta[i]
                  }
                }
                if (!palabraSecretaMensaje.includes('_')) {
                  // verifica que no existe un guion ya que cuando no haya ningun guion significa que la palabra esta completo
                  aviso = `_Felicidades *${nombreUser}*!! Has completado la palabra (+100px)_.\nEscribe /siguiente para la proxima palabra o /salir para abandonar.`
                  gano = true
                } else {
                  // en caso contrario solo a acertado una letra
                  aviso = '_¡Genial! Has acertado._'
                }
              } else {
                aviso = '_Mmmm... Esa letra ya existe._'
              }
            } else {
              // en caso contrario fue un error
              errores++
              if (!letrasErroneas.includes(mensaje)) {
                // verifica que la letra erronea no se repita
                letrasErroneas += mensaje
              }
              if (errores === IMAGENES_AHORCADO.length - 1) {
                // verifica el largo de las img's con los errores para ver si perdio
                aviso = `_¡Perdiste!😪(-50px)._\nLa palabra secreta era: *${palabraSecreta}*.\nEscribe /siguiente para la proxima palabra o /salir para abandonar.`
                perdio = true
              } else {
                aviso = '_¡Oh! Has fallado._'
              }
            }
            await mostrarAhorcado(
              letrasErroneas,
              errores,
              palabraSecretaMensaje,
              aviso
            )
            mensaje = '' // se reinicia la varibale mensaje
          } else {
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
