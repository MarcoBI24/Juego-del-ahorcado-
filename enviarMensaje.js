const fetch = require('node-fetch')
const dotenv = require('dotenv').config()
module.exports = async (nameTemplate, mensaje, numero) => {
  let token = process.env.TOKEN
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  let options = {}
  if (nameTemplate !== null) {
    options = {
      messaging_product: 'whatsapp',
      to: numero,
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
      to: numero,
      type: 'text',
      text: {
        body: mensaje
      }
    }
  }
  try {
    await fetch('https://graph.facebook.com/v15.0/110109848553255/messages', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(options)
    }).then(res => {
      if (!res.ok) {
        
        console.log('NO SE PUDO ENVIAR EL CORREO HA' + correo)
        return false
      }
      console.log('Mensaje o template enviado a ' + numero)
      return true
    })
  } catch (error) {
    console.log(
      'Hubo un error al enviar el mensaje o template al enviar a ' + numero
    )
    console.log(error)
  }

  // console.log('MENSAJE ENVIADO... --> ' + numero)
}
