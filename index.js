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



// links:


/*
https://www.twilio.com/blog/como-enviar-un-mensaje-de-whatsapp-con-javascript-y-node-js



https://www.twilio.com/es-mx/docs/whatsapp/quickstart/node
https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment#start-a-new-nodejs-project-with-npm-init
https://console.twilio.com/us1/develop/sms/settings/whatsapp-sandbox?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Fsandbox%3Fx-target-region%3Dus1
https://ahoy.twilio.com/webinar-SendGrid-spa-1-TY?aliId=eyJpIjoiUGphMVpTOHU2bEVFUGtSeiIsInQiOiJPUDQ5T25aWXZuUjQwamQrWDRYU1J3PT0ifQ%253D%253D
https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1
https://www.twilio.com/es-mx/docs/sms/api/message-resource
https://www.twilio.com/es-mx/docs/sms/api/message-resource
https://www.twilio.com/es-mx/docs/messaging/twiml


https://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/country-sync.html
https://www.twilio.com/blog/validate-phone-number-input
https://github.com/jackocnr/intl-tel-input#features
*/
