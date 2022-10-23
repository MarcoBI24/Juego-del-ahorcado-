const fetch = require('node-fetch')

module.exports = async (nameTemplate, mensaje) => {
  const token =
    'EAAHWaNPjDy4BACK6XtNS3OZCNsr4c12eRoVbr0HjV6m8kWcyJ1OIdGUJpoYdOEDcZB8jv3YLDyaJKmoIi0eiIycBlhJrLfuem19ZBp86ZCZBSfZCeDGic3yAQJMMfvsxDsmbMgZBcZC5NmaNIJ6E1kcC4DgZCpInTMB7MqbxaP4WgFmWPTwzgOR6ER4tvpEwZC5kmmpXNhi5eVi02eOJFqGKo3'
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
