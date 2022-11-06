// qvnvdefdsljpclrh --- password
// 'use strict'
// SERVIDOR
const express = require('express')
const path = require('path')
const body_parser = require('body-parser')
const app = express().use(body_parser.json())
var xhub = require('express-x-hub')
app.use(xhub({ algorithm: 'sha1', secret: process.env.CODEWAS }))
// const request = require("request")
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(__dirname, 'public')))


app.post('/', require('./enviarMensajeWhatsapp'))
// app.use('/', require('./routes')) // esto es para enviar el correo
app.get('/facebook', require('./verificarTokenWhatsapp')) // esta funcion verifica el token

app.post('/facebook', require("./verificarElMensajeRecibido"))

app.listen(process.env.PORT || 3000)