const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')

let palabraSecreta = 'marco'
let mensaje = ''
let jugando = false
let errores = 0
let mensajeGuiones = ''
let mensajeHombre = ''
const IMAGENES_AHORCADO = [
  `

   +---+
   |   |
       |
       |
       |
       |

=========`,
  `

  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `

  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `

  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `

  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========`,
  `

  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========`,
  `

  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========`
]
// [
//   // en req me envia la data
//   // en res le envio el status
//   {
//     context: {
//       from: '15550877052',
//       id: 'wamid.HBgLNTE5MDA4NjYxNzAVAgARGBI4MDVCMDJGRDk2QTNDNDVEMzAA'
//     },
//     from: '51900866170',
//     id:
//       'wamid.HBgLNTE5MDA4NjYxNzAVAgASGCBFMzY2QzZDODFGQTJFODFDRjAzRDJGRTA2QjZFNDFFRgA=',
//     timestamp: '1666585809',
//     type: 'button',
//     button: { payload: 'Jugar', text: 'Jugar' }
//   }
// ]

router.route('/facebook').post(async (req, res) => {
  // esta funcion espera el mensaje de whatsap
  try {
    const REQ = req.body.entry[0].changes[0].value.messages
    if (REQ !== undefined && REQ[0] !== undefined) {
      console.log(REQ)
      if (REQ[0].button) {
        mensaje = REQ[0].button.payload
      } else if (REQ[0].text) {
        mensaje = REQ[0].text.body
      }
      console.log(mensaje + 'MENSAJE RECIBIDO')
      switch (mensaje) {
        case 'Hola' && jugando === false:
          let nombreUser =
            req.body.entry[0].changes[0].value.contacts[0].profile.name
          await enviarMensaje(null, `Hola ${nombreUser}, ¿Qué tal?`)
          mensaje = ''
          break
        case '/opciones':
          if (jugando == false) {
            await enviarMensaje('mostrar_opciones', null)
          } else {
            await enviarMensaje(null, 'Escribe /salir para abandonar el juego ')
          }
          mensaje = ''
          break
        case 'Jugar' && jugando === false:
          jugando = true
          await enviarMensaje('como_jugar', null)
          mensaje = ""
          break
        case '/salir' && jugando === true:
          jugando = false
          await enviarMensaje(null, 'Saliste del juego')
          mensaje = ""
          break
        default:
          break
      }
      // if (mensaje === 'Hola' && jugando === false) {
      //   let nombreUser =
      //     req.body.entry[0].changes[0].value.contacts[0].profile.name
      //   await enviarMensaje(null, `Hola ${nombreUser}, ¿Qué tal?`)
      //   mensaje = ''
      //   res.sendStatus(200)
      //   return
      // }
      // if (mensaje === '/opciones' && jugando == false) {
      //   await enviarMensaje('mostrar_opciones', null)
      //   mensaje = ''
      // } else if (mensaje === '/opciones' && jugando == true) {
      //   await enviarMensaje(null, 'Escribe /salir para abandonar el juego ')
      //   res.sendStatus(200)
      //   mensaje = ''
      //   return
      // }

      // if (mensaje === 'Jugar' && jugando == false) {
      //   jugando = true
      //   await enviarMensaje('como_jugar', null)
      //   mensaje = ''
      // }
      // if (mensaje === '/salir' && jugando == true) {
      //   jugando = false
      //   await enviarMensaje(null, 'Saliste del juego')
      //   mensaje = ''
      // }
      if (jugando == true) {
        // tener la palabra secreta
        // el largo de la palabra secreta
        // hacer un mensaje con guiones del largo de la palabra secreta
        // hacer un mensaje con el dibujo en la posicion del numero de errores
        // recibir la letra
        mensajeHombre = IMAGENES_AHORCADO[errores]
        palabraSecreta.split('').forEach(letra => {
          mensajeGuiones += '_'
        })
        mensajeGuiones = mensajeGuiones.split('')
        mensajeGuiones = mensajeGuiones.join(' ')
        mensaje = mensajeHombre + '\n\n' + mensajeGuiones
        await enviarMensaje(null, mensaje)
        mensaje = ''
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
