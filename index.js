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


app.post('/', require('./enviarMensajeWhatsapp'))
// app.use('/', require('./routes'))
app.get('/facebook', require('./verificarTokenWhatsapp')) // esta funcion verifica el token

app.post('/facebook', (req, res) => { // esta funcion espera el mensaje de whatsap 


  console.log('Solicitud de Facebook')
  console.log(JSON.stringify(req.body))
  // mensajes.unshift(req.body.entry[0].changes[0].value.messages[0].text.body)
  res.sendStatus(200)
})

app.listen(process.env.PORT || 3000)