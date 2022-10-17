// qvnvdefdsljpclrh --- password

// SERVIDOR
const express = require('express')
const path = require('path')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes'))











app.listen(3000, () => console.log('Se prendio la máquina'))



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
