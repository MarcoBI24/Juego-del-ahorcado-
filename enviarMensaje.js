const fetch = require('node-fetch')

module.exports = async (nameTemplate, mensaje) => {
  const token =
    'EAAHWaNPjDy4BACwVkRnT7oVUS7zKq0ZBp1lx7ZC21O8X5A3MJdggc7nmHKIuch6iPj7R3tLICumyaedWjYz4GOYEeRHOk0J2u2SFV6WtMa3OoydZCIhvylPHbve5EOr6jZCsHitFb2rz9qucLZCHZBvoNS92l90gZAYMIgPlQelgUQWZAi467ZBKO8QZC6VDmKmmR8ZA4tx7aF7BTIqlkMZAB63Q'
  const headers = {
    Authorization: `Bearer ${token}`,
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
  const peticion = await fetch(
    'https://graph.facebook.com/v15.0/110109848553255/messages',
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(options)
    }
  )
  if (peticion.status == 200) {
    console.log(await peticion.text())
    console.log('Mensaje o template enviado!!!')
  } else {
    console.log('Hubo un error al enviar el mensaje o template!!!')
    console.log(peticion.status)
  }

  console.log('MENSAJE ENVIADO...')
}
