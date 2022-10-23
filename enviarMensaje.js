const fetch = require('node-fetch')

module.exports = async (nameTemplate, mensaje) => {
  const token =
    'EAAHWaNPjDy4BAH1Nmkj7r5NyfJatfnlN60J5iFedQcAHOS32zQknlWGPz2G1zwGK8xR4d1WwihLyUsyPNxjZCRMhWuNOf00y2ujHskjDvxcK1t9OQwS8JPkm7q7ZBaZBDTHFr05zfwtLzS8bztEioeCFLaxcM2uShL0zQL3IKqsNZCHGjNTecLZA1GvdAKqoPzdAp0rDeQqvNfQ7pUke0'
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  let options = {}
  if (nameTemplate !== null) {
    options = {
      messaging_product: 'whatsapp',
      to: '51900866170',
      type: 'template',
      template: {
        name: nameTemplate,
        language: {
          code: 'en_US'
        }
      }
    }
  } else if (mensaje !== null || mensaje !== undefined) {
    options = {
      messaging_product: 'whatsapp',
      to: '51900866170',
      type: 'text',
      text: {
        body: mensaje
      }
    }
  }
  await fetch('https://graph.facebook.com/v15.0/110109848553255/messages', {
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

  console.log('MENSAJE ENVIADO...')
}
