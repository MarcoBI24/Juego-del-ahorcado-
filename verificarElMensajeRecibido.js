// IDEAS:
// HACER UN BOTON PARA VER LA DEFINICION DE LA PALABRA
// CONECTAR CON LA IA PARA QUE CONVERSE

const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')
const fetch = require('node-fetch')
const dotenv = require('dotenv').config()
let palabraSecreta = ''
let mensaje = ''
let jugando = false
let perdio = false
let gano = false
let errores = 0
let aciertos = 0
let intentoAcertado = false
let letrasErroneas = ''
let palabraSecretaMensaje = ''
let arrPalabraSecreta
const EMOJIS = {
  alegres: ['π', 'π', 'π', 'π'], // para palabras de 5 letras
  alegres2: ['π', 'π', 'π'], // para palabras de 4 letras
  tristes1: ['π', 'π₯', 'π¨', 'π°', 'π­']
}
let urlPalabra = process.env.URLPALABRA

async function peticionPalabra () {
  let peticion = await fetch(urlPalabra)
  let respuesta = await peticion.json()
  return respuesta
}

async function asignarVariables () {
  let expRegPalabras = /\w*?[Γ‘Γ©Γ­Γ³ΓΊ]+\w*/
  do {
    let res = await peticionPalabra() // recibe una res en forma de array con un solo elemento
    gano = false
    perdio = false
    palabraSecreta = res[0].toLowerCase()
    mensaje = ''
    errores = 0
    aciertos = 0
    intentoAcertado = false
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
function obtener_imagen_ahorcado (errores, aciertos, intentoAcertado) {
  let emoji
  if (intentoAcertado == true) {
    if (palabraSecreta.length === 5) {
      emoji = EMOJIS.alegres[aciertos - 1]
    } else {
      emoji = EMOJIS.alegres2[aciertos - 1]
    }
    if (aciertos == palabraSecreta.length) {
      emoji = 'π₯³'
    }
  } else {
    if (errores == EMOJIS.tristes1.length + 1) {
      emoji = 'π'
    } else {
      emoji = EMOJIS.tristes1[errores - 1]
    }
  }
  const IMAGENES_AHORCADO = [
    `\n\n.\t\t\t\t\t\t\t *+------+*
  \t\t\t\t\t\t\t  *|*\t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t*==========*`,
    `.\t\t\t\t\t\t\t *+------+*
  \t\t\t\t\t\t\t  *|*\t\t\t\t*|*
  \t\t\t\t\t\t  *${emoji}*\t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t*===========*`,
    `.\t\t\t\t\t\t\t *+------+*
  \t\t\t\t\t\t\t  *|*\t\t\t\t*|*
  \t\t\t\t\t\t  *${emoji}*\t\t\t\t*|*
  \t\t\t\t\t\t\t  *|*\t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t*===========*`,
    `.\t\t\t\t\t\t\t *+------+*
  \t\t\t\t\t\t\t  *|*\t\t\t\t*|*
  \t\t\t\t\t\t  *${emoji}*\t\t\t\t*|*
  \t\t\t\t\t\t\t*/|*\t\t\t\t*|*
  \t\t\t\t\t\t\t\t\t\t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t*===========*`,
    `.\t\t\t\t\t\t\t *+------+*
  \t\t\t\t\t\t\t  *|*\t\t\t\t*|*
  \t\t\t\t\t\t  *${emoji}*\t\t\t\t*|*
  \t\t\t\t\t\t\t*/|\\* \t\t\t*|*
  \t\t\t\t\t\t\t   \t\t\t\t*|*
  \t\t\t\t\t\t\t    \t\t\t\t*|*
  \t\t\t\t\t\t*===========*`,
    `.\t\t\t\t\t\t\t *+------+*
  \t\t\t\t\t\t\t  *|* \t\t\t\t*|*
  \t\t\t\t\t\t  *${emoji}* \t\t\t\t*|*
  \t\t\t\t\t\t\t*/|\\* \t\t\t*|*
  \t\t\t\t\t\t\t*/*  \t\t\t\t*|*
  \t\t\t\t\t\t\t    \t\t\t\t*|*
  \t\t\t\t\t\t*===========*`,
    `.\t\t\t\t\t\t\t *+------+*
  \t\t\t\t\t\t\t  *|*\t\t\t\t*|*
  \t\t\t\t\t\t  *${emoji}*\t\t\t\t*|*
  \t\t\t\t\t\t\t*/|\\* \t\t\t*|*
  \t\t\t\t\t\t\t*/* *\\* \t\t\t*|*
  \t\t\t\t\t\t\t    \t\t\t\t*|*
  \t\t\t\t\t\t*===========*`
  ]

  return IMAGENES_AHORCADO[errores]
}
async function mostrarAhorcado (
  letrasErroneas,
  errores,
  aciertos,
  intentoAcertado,
  palabraSecretaMensaje,
  aviso,
  numero
) {
  let mensaje =
    obtener_imagen_ahorcado(errores, aciertos, intentoAcertado) +
    `\n\n` +
    `\t\t\t\t\t\t\t\t` +
    `*${formatearMensaje(palabraSecretaMensaje).toUpperCase()}*` +
    `\n\n` +
    `_Letras errΓ³neas:_ ${formatearMensaje(letrasErroneas)}`
  await enviarMensaje(null, aviso, numero)
  await enviarMensaje(null, mensaje, numero) // se envia el mensaje
}

// hacer una variable con intento acertado que se asignara cada que ocurre un error o acierta y se validara cunaod se lanzara el emoji
router.route('/facebook').post(async (req, res) => {
  // esta funcion espera el mensaje de whatsap
  console.log(palabraSecreta)
  if (palabraSecreta === '') {
    asignarVariables()
  }
  try {
    const REQ = req.body.entry[0].changes[0].value.messages
    if (REQ !== undefined && REQ[0] !== undefined) {
      // verifica que la req sea un mensaje
      const REQNumber = REQ[0].from
      console.log(REQ[0])
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
            await enviarMensaje(null, `Hola ${nombreUser}, ΒΏQuΓ© tal?`,REQNumber)
            mensaje = ''
            break
          }
          break
        case '/menu':
          if (!jugando) {
            await enviarMensaje('mostrar_opciones', null, REQNumber)
          } else {
            await enviarMensaje(
              null,
              'Escribe /salir para abandonar el juego ',
              REQNumber
            )
          }
          mensaje = ''
          return res.sendStatus(200)
          break
        case 'jugar':
          if (!jugando) {
            nombreUser =
              req.body.entry[0].changes[0].value.contacts[0].profile.name
            jugando = true
            await mostrarAhorcado(
              letrasErroneas,
              errores,
              aciertos,
              intentoAcertado,
              palabraSecretaMensaje,
              'Empezando...',
              REQNumber
            )
            mensaje = ''
            break
          } else {
            await enviarMensaje(null, 'Comando no disponible.', REQNumber)
          }

          break
        case '/salir':
          if (jugando) {
            jugando = false
            await enviarMensaje(null, 'Saliste del juego.', REQNumber)
            await asignarVariables()
          } else {
            await enviarMensaje(null, 'Comando no disponible.', REQNumber)
          }
          break
        case '/rendir':
          if (jugando) {
            asignarVariables().then(() => {
              mostrarAhorcado(
                letrasErroneas,
                errores,
                aciertos,
                intentoAcertado,
                palabraSecretaMensaje,
                'Cambiando palabra...',
                REQNumber
              )
            })
          } else {
            await enviarMensaje(null, 'Comando no disponible', REQNumber)
          }

          break
        case '/siguiente':
          if (jugando == true && (gano == true || perdio == true)) {
            asignarVariables().then(() => {
              mostrarAhorcado(
                letrasErroneas,
                errores,
                aciertos,
                intentoAcertado,
                palabraSecretaMensaje,
                'Nueva palabra',
                REQNumber
              )
            })
            gano = false
            perdio = false
          } else {
            await enviarMensaje(null, 'Comando no disponible', REQNumber)
          }
          break
        default:
          let aviso = ''
          let expNum = /[.\d*]/
          if (jugando == true) {
            if (gano === true || perdio === true) {
              await enviarMensaje(
                null,
                'Escriba /siguiente para seguir jugando',
                REQNumber
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
                    aciertos++
                    palabraSecretaMensaje[i] = arrPalabraSecreta[i]
                  }
                }
                if (!palabraSecretaMensaje.includes('_')) {
                  // verifica que no existe un guion ya que cuando no haya ningun guion significa que la palabra esta completo
                  aviso = `*Β‘Felicidades ${nombreUser}*! Has completado +100px*.\nEscribe _/siguiente_ para la proxima palabra o _/salir_ para abandonar.`
                  gano = true
                  intentoAcertado = true
                } else {
                  // en caso contrario solo a acertado una letra
                  aviso = '_Β‘Genial! Has acertado._'
                  intentoAcertado = true
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
              if (errores === EMOJIS.tristes1.length + 1) {
                // verifica el largo de los emojis tristes + 1(emoji final cuando pierde) con los errores para ver si perdio
                aviso = `*Β‘Perdiste! -50px.*\nLa palabra secreta era: *${palabraSecreta}*.\nEscribe _/siguiente_ para la proxima palabra o _/salir_ para abandonar.`
                perdio = true
              } else {
                aviso = '_Β‘Oh! Has fallado._'
                intentoAcertado = false
              }
            }
            await mostrarAhorcado(
              letrasErroneas,
              errores,
              aciertos,
              intentoAcertado,
              palabraSecretaMensaje,
              aviso,
              REQNumber
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
