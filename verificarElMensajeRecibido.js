const router = require('express').Router()
const e = require('express')
const enviarMensaje = require('./enviarMensaje')

let palabraSecreta = 'banana'
let mensaje = ''
let jugando = false
let errores = 0
let mensajeGuiones = ''
let mensajeHombre = ''
let arrPalabraSecreta = palabraSecreta.split('')
for (let i = 0; i < arrPalabraSecreta.length; i++) {
  // if (i == arrPalabraSecreta.length - 1) {
  //   // _ _ _ _ _ _
  //   mensajeGuiones += `_`
  // } else {
  //   mensajeGuiones += `_ `
  // }
  mensajeGuiones += '_'
}
const IMAGENES_AHORCADO = [
  `+ \t\t+-------+
\t\t  |\t\t\t|
\t\t   \t\t\t|
\t\t   \t\t\t|
\t\t   \t\t\t|
\t\t   \t\t\t|
\t\t=========`,
`+ \t\t+-------+
\t\t  |\t\t\t|
\t\t O\t\t\t|
\t\t   \t\t\t|
\t\t   \t\t\t|
\t\t   \t\t\t|
\t\t=========`,
`+ \t\t+-------+
\t\t  |\t\t\t|
\t\t O\t\t\t|
\t\t  |\t\t\t|
\t\t   \t\t\t|
\t\t   \t\t\t|
\t\t=========`,
`+ \t\t+-------+
\t\t  |\t\t\t|
\t\t O\t\t\t|
\t\t/|\t\t\t|
\t\t\t\t\t\t\t|
\t\t   \t\t\t|
\t\t=========`,
`+ \t\t+-------+
\t\t  |\t\t\t|
\t\t O\t\t\t|
\t\t/|\\ \t\t|
\t\t   \t\t\t|
\t\t    \t\t\t|
\t\t=========`,
`+ \t\t+-------+
\t\t  | \t\t\t|
\t\t O \t\t\t|
\t\t/|\\ \t\t|
\t\t/  \t\t\t|
\t\t    \t\t\t|
\t\t=========`,
`+ \t\t+-------+
\t\t  |\t\t\t|
\t\t O\t\t\t|
\t\t/|\\ \t\t|
\t\t/ \\ \t\t\t|
\t\t    \t\t\t|
\t\t=========`
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
            mensajeGuiones = ''
            arrPalabraSecreta.forEach(letra => {
              mensajeGuiones += '_'
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
          console.log(mensajeGuiones)
          // mensajeGuiones = mensajeGuiones.split(' ') // vuelve a hacer un
          if (
            arrPalabraSecreta.includes(mensaje) &&
            !mensajeGuiones.includes(mensaje)
          ) {
            for (let i = 0; i < arrPalabraSecreta.length; i++) {
              // aqui se da agregan las letras que son correctas
              const letra = arrPalabraSecreta[i]
              if (letra === mensaje) {
                mensajeGuiones[i] = letra
              }
            }
          } else {
            //corregir que errores debe empezar en 0
            errores++
          }
        } else {
          if (mensaje !== '') {
            errores++
            await enviarMensaje(null,"Recuerda, es solo 1 letra...")
          }
        }
        let mensajeGuionesTemp = '' // aqui da el espaciado al mensajeGuiones
        for (let i = 0; i < mensajeGuiones.length; i++) {
          if (i == mensajeGuiones.length - 1) {
            // _ _ _ _ _ _
            mensajeGuionesTemp += `${mensajeGuiones[i]}`
          } else {
            mensajeGuionesTemp += `${mensajeGuiones[i]} `
          }
        }
        mensajeGuiones = mensajeGuionesTemp
        mensajeHombre = IMAGENES_AHORCADO[errores]
        console.log(mensajeGuiones)

        // mensajeGuiones = mensajeGuiones.join(" ")
        mensaje = mensajeHombre + `\n\n` + `\t\t` + mensajeGuiones
        await enviarMensaje(null, mensaje)
        mensaje = ''
        mensajeGuiones = mensajeGuiones.split(' ') // se vuelve un array
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
