// qvnvdefdsljpclrh --- password
// 'use strict'
// SERVIDOR
const express = require('express')
const path = require('path')
const body_parser = require('body-parser')
const app = express().use(body_parser.json())
const request = require("request")
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'public')))
// app.use('/', require('./routes'))
app.get('/facebook', (req, res) => {
    // GET https://www.your-clever-domain-name.com/webhooks? hub.mode=subscribe& hub.challenge=1158201444& hub.verify_token=meatyhamhock

  const verify_token = 'hiworld'
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']
  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK verificado!!!!')
      res.status(200).send(challenge)
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(403)
  }
})
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
