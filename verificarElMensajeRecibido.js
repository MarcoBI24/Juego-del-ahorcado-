const router = require('express').Router()
const enviarMensaje = require('./enviarMensaje')

let palabraSecreta = "marco"
let mensaje = ''
let jugando = false
let errores = 0
let mensajeGuiones = ""
let mensajeHombre = ""
const IMAGENES_AHORCADO = [`

   +---+
   |   |
       |
       |
       |
       |

=========`, `

  +---+
  |   |
  O   |
      |
      |
      |
=========`, `

  +---+
  |   |
  O   |
  |   |
      |
      |
=========`, `

  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, `

  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========`, `

  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========`, `

  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========`]
router.route('/facebook').post(async (req, res) => {
  // esta funcion espera el mensaje de whatsap
  if ( req.body.entry[0].changes[0].value.messages !== undefined && req.body.entry[0].changes[0].value.messages[0].text.body !== undefined) {
    
    mensaje = req.body.entry[0].changes[0].value.messages[0].text.body
    if (mensaje === '/opciones' && jugando == false) {
      await enviarMensaje('mostrar_opciones',null)
    }
    
    if (mensaje === "Jugar" && jugando == false) {
      jugando = true
      await enviarMensaje('como_jugar',null)
      mensaje = ""
    }
    if (mensaje === "/salir" && jugando == true) {
      jugando = false
      await enviarMensaje(null,"Saliste del juego")
      mensaje = ""
    }
    if (jugando == true) {
      // tener la palabra secreta
      // el largo de la palabra secreta
      // hacer un mensaje con guiones del largo de la palabra secreta
      // hacer un mensaje con el dibujo en la posicion del numero de errores
      // recibir la letra
      mensajeHombre = IMAGENES_AHORCADO[errores]
      palabraSecreta.split("").forEach(letra => {
        mensajeGuiones+="_"
      });
      mensajeGuiones = mensajeGuiones.split("")
      mensajeGuiones = mensajeGuiones.join(" ")
      mensaje = mensajeHombre + "\n\n" + mensajeGuiones
     await enviarMensaje(null,mensaje)
      mensaje = ""
  
  
    }  
    
  }



  res.sendStatus(200)
})

module.exports = router
