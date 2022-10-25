const fetch = require('node-fetch')

module.exports = async (nameTemplate, mensaje) => {
  const token =
    'EAAHWaNPjDy4BAOkgGh0825nrF1wV6jDqGieLdULl0fyhV07FL3YZBlZCAIsF1D4VOElV8ect16JxISrij8gMxKyigkLIzgKMqttMpLuZBDFcONQT91WkRK4m2haACqPZCkQ0YFgr8a5eI2n33ZCgnZA7F0Mk3dSKKYtCkIn6MEA9trMu4iXDffDTsXtun7manZApaZCZCVNvaVQNdHyS2u1m1'
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
  try {
    await fetch('https://graph.facebook.com/v15.0/110109848553255/messages', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(options)
    })
    console.log('Mensaje o template enviado!!!')
  } catch (error) {
    console.log('Hubo un error al enviar el mensaje o template!!!')
    console.log(error)
  }

  console.log('MENSAJE ENVIADO...')
}
