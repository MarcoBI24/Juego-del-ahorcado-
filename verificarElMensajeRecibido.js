const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')

let palabraSecreta = 'marco'
let mensaje = ''
let jugando = false
let errores = 0
let mensajeGuiones = ''
let mensajeHombre = ''
let arrPalabraSecreta = palabraSecreta.split('')
arrPalabraSecreta.forEach(letra => {
  mensajeGuiones += '_'
})
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
          }
          break
        default:
          break
      }

      if (jugando == true || (mensaje.length === 1 && jugando === true)) {
        // tener la palabra secreta
        // el largo de la palabra secreta
        // hacer un mensaje con guiones del largo de la palabra secreta
        // hacer un mensaje con el dibujo en la posicion del numero de errores
        // recibir la letra
        mensajeGuiones = mensajeGuiones.split('')
        if (
          arrPalabraSecreta.includes(mensaje) &&
          !mensajeGuiones.includes(mensaje)
        ) {
          for (let i = 0; i < arrPalabraSecreta.length; i++) {
            const letra = arrPalabraSecreta[i]
            if (letra === mensaje) {
              mensajeGuiones[i] = letra
            }
          }
        } else {
          errores++
        }
        mensajeHombre = IMAGENES_AHORCADO[errores]
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
