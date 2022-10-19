const router = require('express').Router()
const fetch = require('node-fetch')
router.route('/').post((req, res) => {
  const mensaje = req.body.mensaje
  console.log(mensaje);
  const token =
    'EAAHWaNPjDy4BABuDdAB9ut23Q4azbVp6aGXq1dE0iRt5zgbMLctQ4yKcPot43ZBP90E5tcJc1jeNqyLEnqfcxicnnC9WxXQMZCavinQRK3AXK3XJOdraX7fU1fFi919gjyfylDcfQtbww0HzBkoWM1o9RR1X14Cwu63p3NJwZC6kfR9HLgufUISNov9rQZBCjzW1YczwtNU7vKU4NFoB'
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  const options = {
    messaging_product: 'whatsapp',
    to: '51900866170',
    type: 'text',
    text: {
      body: mensaje
    }
  }
  fetch('https://graph.facebook.com/v14.0/110109848553255/messages', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(options)
  })
    .then(r => {
      return r.text()
    })
    .then(r => {
      console.log(r)
    })
    .catch(e => {
      console.log(e)
    })
})

module.exports = router
