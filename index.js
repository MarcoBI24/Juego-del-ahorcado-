// qvnvdefdsljpclrh --- password

// SERVIDOR
const express = require('express')
// const nodemailer = require('nodemailer')
const path = require('path')
const app = express()
const bodyParse = require('body-parser')

app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'public')))
// app.use(bodyParse.urlencoded({ extended: true }))
app.use('/', require('./routes'))
// app.set("view engine", "ejs")

app.listen(3000, () => console.log('Se prendio la máquina'))
