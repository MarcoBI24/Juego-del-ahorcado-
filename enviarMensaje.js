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
        
        console.log('NO SE PUDO ENVIAR EL MENSAJE HA' + numero)
        return
      }
      
      console.log('Mensaje o template enviado a ' + numero)
    }).catch((e)=>{
      console.log(e)
    })
  } catch (error) {
    console.log(
      'Hubo un error al enviar el mensaje o template al enviar a ' + numero
    )
    console.log(error)
  }

  // console.log('MENSAJE ENVIADO... --> ' + numero)
}
