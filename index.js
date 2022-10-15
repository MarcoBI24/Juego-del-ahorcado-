// qvnvdefdsljpclrh --- password

// SERVIDOR
const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'public')))

app.use("/", require("./routes"))


// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'mbernaildeonso@gmail.com',
//     pass: 'qvnvdefdsljpclrh'
//   }
// })
// transporter.verify().then(() => {
//   console.log('Listo para enviar correos')
// })
// app.post('/', async (req, res) => {
//   try {
//     // const { body } = req.body
//     // console.log(body)
//     // const { subject, message } = body
//     // const content = `<i>You are a crack</i>
//     // <img src="./img/user.png">`
//     // const message = {}

//     let info = await transporter.sendMail({
//       from: `<mbernaildeonso@gmail.com>`,
//       to: 'marcobernaildefonso@gmail.com',
//       text: 'For clients with plaintext support only',
//       html: `<!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Email</title>
//     <style>
//         * {
//             padding: 0;
//             margin: 0;
//             box-sizing: border-box;
//         }

//         body {
//             width: 100%;
//             height: 100vh;
//             max-width: 1000px;
//             margin: auto;
//             background-color: #ffa73b;
//             position: relative;
//             gap: 20px;
//         }

       

//         .contenedor-general {
//             margin: auto;
//             margin-top: 100px;
//             min-height: 600px;
//             width: 100%;
//             max-width: 600px;
//             height: min-content;
//             padding: 20px 30px;
//             border-radius: 10px;
//             background-color: #fff;
//             border:2px solid #ffa73b;

//         }

//         .titulo {
//             font-size: 40px;
//         }

//         .contenedor-bienvenida-text {
//             align-self: flex-start;

//         }

//         .contenedor-button {
//             margin-top: 40px;
//             margin-bottom: 40px;


//         }

//         .btn {
//             border-radius: 5px;
//             background-color: #ffa73b;
//             width: 100%;
//             max-width: 200px;
//             cursor: pointer;
//             transition: all .4s;
//             margin: auto;
//             height: 50px;
//             position: relative;
//         }

//         .btn:hover {
//             border: 2px solid #ffa73b;
//             background-color: #fff;
//         }

//         .btn:hover>.link {

//             color: #ffa73b;
//         }

//         .link {
//             position: absolute;
//             font-family: sans-serif;
//             color: #000;
//             font-weight: 800;
//             font-size: 22px;
//             text-decoration: none;
//             text-align: center;
//             width: 100%;
//             height: 100%;
//             display: inline-block;
//             margin: auto;
//             margin-top: 10px;
            

//         }
//         .link:visited{
//             color: #fff;
//         }

//         .link:active {
//             color: #fff;
//             text-decoration: none;
//         }

//         .contenedor-informacion {
//             margin-top: 100px;
//             margin-bottom: 10px;
//             width: 100%;

//         }

//         .informacion-titulo {
//             text-align: center;
//             font-size: 22px;
//             color: #ffa73b;
//             font-weight: 900;
//         }

//         table {
//             align-self: center;
//             justify-content: center;
//             margin: auto;
//         }

//         tr {}

//         td {
//             color: #ffa73b;
//             font-weight: 700;
//             text-align: right;
//         }

//         th {
//             text-align: left;
//         }

//         .contenedor-footer {
//             background-color: #f7c589;
//             width: 100%;
//             max-width: 600px;
//             margin: auto;
//             margin-top: 15px;
//             border-radius: 10px;
//             color: #fff;
//             text-align: center;
//             font-size: 20px;
//             padding: 10px;
//         }

//         .micorreo {
//             color: #fff;
//             justify-content: center;
//             align-items: center;
//             font-size: 16px;
//             font-family: sans-serif;
//             width: 100%;
//             max-width: 400px;
//             align-self: center;
//             background-color: #ffa73b;
//             transition: all .4s;
//             padding: 5px;
//         }

//         .micorreo:hover {
//             color: #ffa73b;
//             padding: 10px;
//             background-color: #fff;
//         }
//         .nombre{
//             width: 100%;
//             display: inline-block;
//             margin-bottom: 10px;
//         }
//         hr {
//             width: 600px;
//             margin: auto;
//             margin-top: 15px;
//         }
//     </style>
// </head>

// <body>
//     <div class="contenedor-general">
//         <h1 class="titulo">Registro exitoso!</h1>
//         <div class="contenedor-bienvenida-text">
//             <p class="bienvenida-text">Bienvenido a The Hangman Game</p>
//             <p class="bienvenida-text">Ya estas listo para jugar y adivinar palabras...</p>
//         </div>
//         <div class="contenedor-button">
//             <div class="btn">
//                 <a href="https://github.com/MarcoBI24" style="text-align: center;" class="link">Jugar</a>
//             </div>
//         </div>
//         <div class="contenedor-informacion">
//             <div class="informacion-titulo">Informacion</div>
//             <table>
//                 <tr>
//                     <th>Usuario</th>
//                     <td>MarcoBerna24</td>
//                 </tr>
//                 <tr>
//                     <th>Contraseña</th>
//                     <td><input type="password" value="misgolfish"></td>
//                 </tr>
//                 <tr>
//                     <th>Número</th>
//                     <td>900866170</td>
//                 </tr>
//                 <tr>
//                     <th>Fecha de registro</th>
//                     <td>14/10/22</td>
//                 </tr>
//             </table>
//         </div>
//     </div>
//     <hr>
//     <div class="contenedor-footer">
//         <span class="nombre">Marco Berna</span>
//         <a href="https://mail.google.com/mail/u/1/#inbox" class="micorreo">mbernaildeonso@gmail.com</a>
//     </div>
// </body>

// </html>`,
     
//     })
    
//     if (!info.error) {
//         console.log(info.messageId)
//       res.send('mensaje enviado')
//     } else {
//       console.log(info.error)
//       res.send(info.error)
//     }
//   } catch (error) {
//     res.send(error.message)
//     console.log(error.message)
//   }
// })
app.listen(3000, () => console.log('funciona bebeee'))
