// qvnvdefdsljpclrh --- password
// 'use strict'
// SERVIDOR
const express = require('express')
const path = require('path')
const body_parser = require('body-parser')
const app = express().use(body_parser.json())
var xhub = require('express-x-hub')
app.use(xhub({ algorithm: 'sha1', secret: '08daf43ab4a670e4178e2922f2af9c2b' }))
// const request = require("request")
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'public')))
// app.get("/chat", (req,res)=>{
//     res.send("hoola")
// })
let mensajes = ["hola", "como estas", "prueba"]
app.post('/', require('./enviarMensajeWhatsapp'))
// app.use('/', require('./routes'))
app.get('/facebook', require('./verificarTokenWhatsapp')) // esta funcion verifica el token
app.post('/facebook', (req, res) => { // esta funcion espera el mensaje de whatsap 
  console.log('Facebook request body')
  console.log(JSON.stringify(req.body))
  mensajes.unshift(req.body.entry[0].changes[0].value.messages[0].text.body)

  console.log('request header X-Hub-Signature validated')
  // Process the Facebook updates here
  res.sendStatus(200)
})

app.get('/chat', (req, res) => {
  console.log(req)
  console.log('REQUEST!!!')
  res.send("<pre>" + JSON.stringify(mensajes, null, 2) + "</pre>")
})
app.listen(process.env.PORT || 3000)
// app.listen(, () => console.log('Se prendio la máquina'))

// links:

/*
https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1
https://www.twilio.com/es-mx/docs/sms/api/message-resource
https://www.twilio.com/es-mx/docs/sms/api/message-resource
https://www.twilio.com/es-mx/docs/messaging/twiml


https://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/country-sync.html
https://www.twilio.com/blog/validate-phone-number-input
https://github.com/jackocnr/intl-tel-input#features
*/
