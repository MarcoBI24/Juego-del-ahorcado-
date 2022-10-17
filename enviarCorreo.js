// va a exportar una funcion para que en router la ejecute cuando haga el metodo post al formulario
const nodemailer = require('nodemailer')
const sid = "AC5de12d20dddbcf7af06d1e7e6cd0ba2d"
const authToken = "c2e0ad9d60cd1a75e053814ab82a3935"
const clientTwilio = require('twilio')(sid, authToken)
const transportador = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mbernaildeonso@gmail.com',
        pass: 'qvnvdefdsljpclrh' // entregado por Google
    }
})

transportador
    .verify()
    .then(() => {
        console.log('Listo para enviar correo!!')
    })
    .catch(e => {
        console.log(e)
        console.log('Hubo un error ^^^')
    })

module.exports = async function (usuario, correo, contraseña) {
    const d = new Date()
    const msg = await clientTwilio.messages.create({
        from: "+14155238886",
        body : "Bienvenido a The Hangman Game, tu registro fue exitoso",
        to: "+51900866170"
    })

    const statusMail = await transportador.sendMail({
        from: 'Juego del ahorcado 💂‍♂️<mbernaildeonso@gmail.com>',
        to: correo,
        subject: 'Registro',
        html: `<!DOCTYPE html>
        <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email</title>
          <style>
              * {
                  padding: 0;
                  margin: 0;
                  box-sizing: border-box;
              }
      
              body {
                  width: 100%;
                  height: 100vh;
                  max-width: 1000px;
                  margin: auto;
                  background-color: #ffa73b;
                  position: relative;
                  gap: 20px;
              }
      
              .contenedor-general {
                  margin: auto;
                  margin-top: 100px;
                  min-height: 600px;
                  width: 100%;
                  max-width: 600px;
                  height: min-content;
                  padding: 20px 30px;
                  border-radius: 10px;
                  background-color: #fff;
                  border:2px solid #ffa73b;
      
              }
      
              .titulo {
                  font-size: 40px;
              }
      
              .contenedor-bienvenida-text {
                  align-self: flex-start;
      
              }
      
              .contenedor-button {
                  margin-top: 40px;
                  margin-bottom: 40px;
      
              }
      
              .btn {
                  border-radius: 5px;
                  background-color: #ffa73b;
                  width: 100%;
                  max-width: 200px;
                  cursor: pointer;
                  transition: all .4s;
                  margin: auto;
                  height: 50px;
                  position: relative;
              }
      
              .btn:hover {
                  border: 2px solid #ffa73b;
                  background-color: #fff;
              }
      
              .btn:hover>.link {
      
                  color: #ffa73b;
              }
      
              .link {
                  position: absolute;
                  font-family: sans-serif;
                  color: #000;
                  font-weight: 800;
                  font-size: 22px;
                  text-decoration: none;
                  text-align: center;
                  width: 100%;
                  height: 100%;
                  display: inline-block;
                  margin: auto;
                  margin-top: 10px;
      
              }
              .link:visited{
                  color: #fff;
              }
      
              .link:active {
                  color: #fff;
                  text-decoration: none;
              }
      
              .contenedor-informacion {
                  margin-top: 100px;
                  margin-bottom: 10px;
                  width: 100%;
      
              }
      
              .informacion-titulo {
                  text-align: center;
                  font-size: 22px;
                  color: #ffa73b;
                  font-weight: 900;
              }
      
              table {
                  align-self: center;
                  justify-content: center;
                  margin: auto;
              }
      
              tr {}
      
              td {
                  color: #ffa73b;
                  font-weight: 700;
                  text-align: right;
              }
      
              th {
                  text-align: left;
              }
      
              .contenedor-footer {
                  background-color: #f7c589;
                  width: 100%;
                  max-width: 600px;
                  margin: auto;
                  margin-top: 15px;
                  border-radius: 10px;
                  color: #fff;
                  text-align: center;
                  font-size: 20px;
                  padding: 10px;
              }
      
              .micorreo {
                  color: #fff;
                  justify-content: center;
                  align-items: center;
                  font-size: 16px;
                  font-family: sans-serif;
                  width: 100%;
                  max-width: 400px;
                  align-self: center;
                  background-color: #ffa73b;
                  transition: all .4s;
                  padding: 5px;
              }
      
              .micorreo:hover {
                  color: #ffa73b;
                  padding: 10px;
                  background-color: #fff;
              }
              .nombre{
                  width: 100%;
                  display: inline-block;
                  margin-bottom: 10px;
              }
              hr {
                  width: 600px;
                  margin: auto;
                  margin-top: 15px;
              }
              b{
                color: #ffa73b
              }
          </style>
      </head>
      
      <body>
          <div class="contenedor-general">
              <h1 class="titulo">Registro exitoso!</h1>
              <div class="contenedor-bienvenida-text">
                  <p class="bienvenida-text">Bienvenido a The Hangman Game</p>
                  <p class="bienvenida-text">Hola <b>${usuario}</b>, ya estas listo para jugar y adivinar palabras...</p>
              </div>
              <div class="contenedor-button">
                  <div class="btn">
                      <a href="https://github.com/MarcoBI24" style="text-align: center;" class="link">Jugar</a>
                  </div>
              </div>
              <div class="contenedor-informacion">
                  <div class="informacion-titulo">Informacion</div>
                  <table>
                      <tr>
                          <th>Usuario</th>
                          <td>${usuario}</td>
                      </tr>
                      <tr>
                          <th>Contraseña</th>
                          <td><input id="input-password" type="password" value="${contraseña}"><span id="span-show">Show</span></td>
                      </tr>
                      <tr>
                          <th>Número</th>
                          <td>9000000</td>
                      </tr>
                      <tr>
                          <th>Fecha de registro</th>
                          <td>${d.getDate()}-${d.getMonth()}-${d.getFullYear()}</td>
                      </tr>
                  </table>
              </div>
          </div>
          <hr>
          <div class="contenedor-footer">
              <p class="nombre">Marco Berna</p>
              <a href="https://mail.google.com/mail/u/1/#inbox" class="micorreo">mbernaildeonso@gmail.com</a>
          </div>
          <script>
          console.log("funciona manooo")
             </script>
      </body>
      
      </html>`
    })
    return statusMail
}
