// INVESTIGAR COMO HACER EL INICIO DE SESION CON FACEBOOK Y QUE GUARDE SU PROGRESO.

const $ = id => {
  return document.getElementById(id)
}
const ByName = name => {
  return document.getElementsByName(name)[0]
}

// import intlTelInput from "./intl-tel-input/build/js/intlTelInput.js"
// intlTelInput
const btnStart = $('start-game')
const btnAddWord = $('add-word')
const btnLogros = $('clasification')
const btnComoSeJuega = $('como-se-juega')
const contenedorIdentificacion = $('contenedor-identificacion')
const contenedorIdentificacionSlider = $('contenedor-identificacion-slider')
const contenedorGeneral = $('contenedor-general')
const loginEnElHeader = $('login')
const btnAbrirGaleria = $('btn-abrir-galeria')
const contenedorGaleria = $('contenedor-galeria')
const btnsCerrarContenedorIdentificacion = document.querySelectorAll(
  '.contenedor-icono'
)
const btnRegistrarseModal = $('btn-registro')
const btnLogearModal = $('btn-login')

const labelDelInputLogin = document.querySelectorAll('.label-text')
let imgTemp = new Image()
const btnSubirFoto = $('input-subirFoto')
const contenedorFoto = $('contenedor-foto')
const canvas = $('canvas')
const btnPerfil = $('btn-perfil')
const context = canvas.getContext('2d')
let imagenPorDefecto = $('foto')
let urlImagen = imagenPorDefecto.src
let crop
let USUARIO
let USUARIOS = JSON.parse(localStorage.getItem('usuarios'))
const inputNombreUsuarioRegister = $('nombre-usuario')
const inputContraseñaUsuarioRegister = $('contraseña-usuario')
const inputContraseña2Usuario = $('contraseña2-usuario')
const inputCorreoUsuario = $('correo-usuario')
const inputNumeroUsuario = $('numero-usuario')

const btnRegistrarUsuario = $('registrarse-form')
const btnIniciarSesionUsuario = $('login-form')

const inputNombreUsuarioLogin = $('nombre-usuario-login')
const inputContraseñaLogin = $('contraseña-login')
const porcentajeText = $('porcentaje')
let expContraseñaValida = /(?=.*[a-z]+)?(?=.*[A-Z]+)?(?=.*\d+)?(?=.*[$@$!%*?&#.$($)$-$_])?.*[a-zA-Z\d@!%*?&#.$($)$-$_]+/
let expContraseñaMuySegura = /(?=.*[a-z]+)?(?=.*[A-Z]+)(?=.*\d+)(?=.*[$@$!%*?&#.$($)$-$_]).*[a-zA-Z\d@!%*?&#.$($)$-$_]+/
let expRegMinuscula = /^[a-z]+$/
let expRegMayuscula = /^[A-Z]+$/
let expRegMinusYMayus = /^(?=[a-zA-Z])(?=.*[a-z][A-Z]+|.*[A-Z][a-z]+)[a-zA-Z]+$/
let expRegNombreUsuario = /^[a-zA-Z0-9ü][a-zA-Z0-9ü_]{3,16}$/
let expRegCorreo = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
let letrasIncorrectas = 0
let letrasCorrectas = 0
let formato = ''
let expRegNumeros = '0123456789'

const inputsRegister = [
  inputNombreUsuarioRegister,
  inputContraseñaUsuarioRegister,
  inputContraseña2Usuario,
  inputCorreoUsuario,
  inputNumeroUsuario
]
const numeroInstance = intlTelInput(inputNumeroUsuario, {
  initialCountry: 'PE',
  utilsScript: './utils.js',
  customPlaceholder: function (
    selectedCountryPlaceholder,
    selectedCountryData
  ) {
    formato = '' // se vuelve a iniciaralizar el formato
    // console.log(selectedCountryPlaceholder)
    for (let i = 0; i < selectedCountryPlaceholder.length; i++) {
      if (expRegNumeros.includes(selectedCountryPlaceholder[i])) {
        formato += '0'
      } else {
        formato += selectedCountryPlaceholder[i]
      }
    }
    // console.log(formato)
    // formato = "(000) 000 0000"
    return selectedCountryPlaceholder
  },
  separateDialCode: true,
  nationalMode: true,
  autoHideDialCode: true
})
inputNumeroUsuario.addEventListener('countrychange', function (e) {
  // cuando se cambia de pais con el numero puesto
  let numero = inputNumeroUsuario.value
  console.log(formato + '   HA CAMBIA DE PAIS')
  inputNumeroUsuario.value = formatearNumero(numero, formato)
  if (numeroInstance.isValidNumber()) {
    alertarInputValid(INPUT)
  } else {
    alertarError(inputNumeroUsuario, 'Digite un número válido')
    console.log(numeroInstance.getNumber())
  }
})
// Logear el usuario
// obtener datos del usuario (nombre de usuario,contraseña, foto )
//  de ahi guarda en un objeto llamado usuario que tenga NOMBRE, CONTRASEÑA, URL DE LA FOTO(guardar todas las que usó anterior mente y mostrarla en la galeria), RECORD, MELLADA, configuracion, palabras Y SI ESTA LOGEADO
// Guardar datos del usuario en el localStorage

// REGISTRAR AL NUEVO USUARIO
/* obtener datos del usuario {
    nombre: Marco,
    contraseña: ******,
    correo: mbernaildeonso@gmail.com,
    foto: fotobase64,
    fotos: [], solo fotos subidas por el mismo usuario
    record: 5000,
    medalla: aguila, foto de la medalla o nombre
    palabras: [], solo palabras agregadas
    configuracion: {
        tema: oscuro,
        efectosDeSonido: off,
        musica: off,
        efectosDeSonidoDelTeclado: off,
        inicioDeSesionAutomatico: on, 'cuando este en true deja el LS como esta y cuando este en off ejecutar la funcion cerrarSesion() cuando cierre la página' y la funcion cerrarSesion() va a hacer cambiar la propiedad logeada a false para que cuando vuelva a cargar la pagina itere los usuarios y no encontrara un usuario logeado || crear un usuario logeado en el LS y ponerle el usuaurio que tiene la propiedad logeado en true y cuando cierre sesion ese usuario vaciarlo el problema estaria cuando quiera hacer un cambio tendria que hacerlo en el usuario logeado y cuando cierre la pagina actualizar el usuario logeado con sus nuevas configuraciones || o sino solo tener un usuario con la propiedad logeado y a la carga de cada pagina crear una variabla con los datos del usuario y cuando haya un cambio actualizarlo al instante ***
        ...
    },
    logeado: true,
    ...

}*/

//cuando carga el js en LS crear un array de Usuarios y en caso ya exista obtener el array de Usuarios
// En caso exista el array se tiene que iterar  y buscar un Usuario que tenga la propiedad Logeado en true
// en caso exista :: Iniciar sesión y asignarlo a la Constante USUARIO (hacer para cada página) para despues de ese usuario ya usarlos en las diferentes partes de la aplicación
// en caso no exista :: no habra nada que asignar a la Constante USUARIO entonces quedara en undefined y hacer lo que conviene en cada parte de la aplicacion
// En caso no exista el array se tiene que crear un array vacio llamado Usuarios y se hará lo mismo que se hace cuando no existe un usuario logeado

function validarInput (e) {
  //esta funcion valida el input cada vez que se pulsa o salde del input
  const INPUT = e.target // aqui se obtiene el input pulsado
  if (
    e.key !== 'Backspace' &&
    e.type === 'keyup' &&
    (INPUT.value == '' || INPUT.value.length === 0)
  ) {
    alertarError(INPUT, '')
    return
  }
  if (e.type == 'keyup' && e.key.length !== 1 && e.key !== 'Backspace') {
    return
  }
  if (e.key === ' ') {
    // INPUT.value = INPUT.value.slice(0, INPUT.value.length - 1);
    alertarError(INPUT, 'No puede contener espacios.')
    return
  }

  switch (INPUT.name) {
    case 'usuario': // agregar validacion  : que tenga letras y numero o guion bajo
      validarUsuario(INPUT, (valido, siExiste) => {
        if (INPUT.value[0] == '_') {
          alertarError(INPUT, 'El usuario no puede empezar por el guion bajo')
          return
        }
        if (valido) {
          if (siExiste) {
            alertarError(INPUT, 'Este usuario ya existe.')
          } else {
            alertarInputValid(INPUT)
          }
        } else {
          alertarError(
            INPUT,
            'El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo'
          )
        }
      })
      break
    case 'contraseña':
      let contraseña = INPUT.value
      // console.log(contraseña.length)
      verificarSiLasContraseñaCoincide(
        contraseña,
        inputContraseña2Usuario.value,
        result => {
          // console.log(result)
          if (inputContraseña2Usuario.value !== '') {
            if (result) {
              alertarInputValid(inputContraseña2Usuario)
            } else {
              alertarError(
                inputContraseña2Usuario,
                'La contraseña no coincide.'
              )
            }
            insertarPorcentajeDeCoincidenciaDeContraseña(
              contraseña,
              inputContraseña2Usuario.value
            )
          }
        }
      )
      validarContraseña(INPUT, result => {
        if (result) {
          validarElLargoYSeguridadDeLaContraseña(INPUT.value, INPUT)
        } else {
          alertarError(
            INPUT,
            'Debe tener 5-20 caracteres(digitos, minúsculas, mayúsculas y para mas seguridad usa signos'
          )
        }
      })

      break
    case 'contraseña2':
      let contraseña1 = inputContraseñaUsuarioRegister.value
      let contraseña2 = INPUT.value

      verificarSiLasContraseñaCoincide(contraseña1, contraseña2, result => {
        if (result) {
          alertarInputValid(INPUT)
        } else {
          alertarError(INPUT, 'La contraseña no coincide.')
        }
        insertarPorcentajeDeCoincidenciaDeContraseña(contraseña1, contraseña2)
      })
      break
    case 'correo':
      validarCorreo(INPUT.value, result => {
        if (result) {
          alertarInputValid(INPUT)
        } else {
          alertarError(
            INPUT,
            'No tiene el formato --> <b>ejemplo@dominio.com</b>'
          )
        }
      })
      break
    case 'numero':
      if (
        e.type == 'keyup' &&
        !expRegNumeros.includes(e.key) &&
        e.key.length == 1
      ) {
        alertarError(INPUT, `¡Hey! "${e.key}" no es un número. `)
        INPUT.value = INPUT.value.slice(0, INPUT.value.length - 1)
      }
      let numero = INPUT.value
      INPUT.value = formatearNumero(numero, formato)
      // console.log(INPUT.value)
      // console.log(numeroInstance.isValidNumber())
      validarNumero(INPUT.value, result => {
        if (result) {
          alertarInputValid(INPUT)
        } else {
          alertarError(INPUT, 'Digite un número válido')
        }
      })
      break
    default:
      break
  }
}
function formatearNumero (numero, formato) {
  let posicion = 0
  let contador = 0
  let numeroFormateado = ''
  let numeroSinSignos = ''
  for (let i = 0; i < numero.length; i++) {
    // se itera para quitarle los signos y que quede solo numero plano
    if (expRegNumeros.includes(numero[i])) {
      numeroSinSignos += numero[i]
    }
  }
  numero = numeroSinSignos
  while (posicion < formato.length && contador < numero.length) {
    if (formato[posicion] === '0') {
      numeroFormateado += numero[contador]
      contador++
    } else {
      numeroFormateado += formato[posicion]
    }
    posicion++
  }
  return numeroFormateado
}

function validarUsuario (INPUT, callback) {
  if (expRegNombreUsuario.test(INPUT.value)) {
    if (verificarNombreSiExite(INPUT.value)) {
      callback(true, true) // si es usuario valido pero ya existe
    } else {
      callback(true, false) // si es usuario valido y no existe
    }
  } else {
    callback(false)
  }
}
function validarContraseña (INPUT, callback) {
  if (expContraseñaValida.test(INPUT.value) && INPUT.value.length >= 5) {
    callback(true)
  } else {
    callback(false)
  }
}
function validarCorreo (correo, callback) {
  if (expRegCorreo.test(correo)) {
    callback(true)
  } else {
    callback(false)
  }
}
function validarNumero (numero, callback) {
  if (numeroInstance.isValidNumber()) {
    callback(true)
  } else {
    callback(false)
  }
}
// console.log(ByName(""));
function init () {
  inputsRegister.forEach(input => {
    input.onkeyup = validarInput
    input.onblur = validarInput
  })
  btnRegistrarUsuario.onclick = () => {
    // VALIDAR CADA INPUT AQUI SOLO SE VALIDA QUE NINGUN CAMPO ESTE VACIO
    // Validar que haya aceptado términos y condiciones

    /*
    lo que quiero : 
        cuando el usuario se registre independientemente de que active inicioDeSesionAutomatico o no, la pagina que se mantenga iniciada la sesion hasta que salga 
        ya que cuando quiera moverse entre las paginas del juego ya sea en jugar o agregar palabras se mantenga el usuario registrado 


    - cuando se registra el inicioDeSesionAutomatico

    
    
    
*/

    if (verificarYAlertarInputs(inputsRegister)) {
      let usuarioRegistro = {
        nombre: inputNombreUsuarioRegister.value,
        contraseña: inputContraseñaUsuarioRegister.value,
        correo: inputCorreoUsuario.value,
        numero: inputNumeroUsuario,
        foto: canvas.toDataURL(),
        fotos: [],
        record: '0',
        medalla: 'huevo',
        palabras: [],
        configuracion: {
          tema: 'light',
          efectosDeSonido: 'off',
          musica: 'off',
          efectosDeSonidoDelTeclado: 'off',
          inicioDeSesionAutomatico: $('input-inicio-sesion-automatico-register').checked
        },
        logeado: $('input-inicio-sesion-automatico-register').checked
      }
      USUARIOS.push(usuarioRegistro)
      localStorage.setItem('usuarios', JSON.stringify(USUARIOS))
      console.log(`${usuarioRegistro.nombre} registrado con exito!`)
      document.form_register.submit()
    }
  }

  btnIniciarSesionUsuario.onclick = () => {
    // let inputs = [inputNombreUsuarioLogin, inputContraseñaLogin]
    // if (!verificarYAlertarInputs(inputs)) {
    //   return
    // }

    let nombre = inputNombreUsuarioLogin.value
    let contraseña = inputContraseñaLogin.value
    // la funcion iniciarSesion() valida cada input y devuelva un cb con el estado del proceso, el cual es iniciar sesión.
    iniciarSesion(nombre, contraseña, res => {
      if (!res.status.nombre) {
        alertarError(
          inputNombreUsuarioLogin,
          'No existe el nombre de usuario ' +
            inputNombreUsuarioLogin.value +
            '.'
        )
      } else {
        alertarInputValid(inputNombreUsuarioLogin)
      }
      if (!res.status.contraseña) {
        alertarError(inputContraseñaLogin, 'Contraseña incorrecta. ')
      } else {
        alertarInputValid(inputContraseñaLogin)
      }
      if (res.status.nombre && res.status.contraseña) {
        // hacer un modal de que inicio sesión.
      }
    })
  }
  function iniciarSesion (nombreDeUsuario, contraseña, callback) {
    // esta funcion debe buscar el usuario en el array de USUARIOS y verificar la contraseña y el nombre de usuario
    let response = {
      status: {
        nombre: false,
        contraseña: false
      }
    }
    USUARIOS.forEach(usuario => {
      // se itera en el  array de USUARIOS
      if (nombreDeUsuario === usuario.nombre) {
        // se busca por el nombre y se verifica la contraseña
        response.status.nombre = true
        if (contraseña === usuario.contraseña) {
          // se configura el usuario como logeado y se modifica el inicio de sesión y posteriormente se setea al localStorage (se actualiza).
          // tambien se pasa como parametro al cb el status del proceso para que despues se pueda alertar dependiendo del status.
          usuario.logeado = true
          usuario.configuracion.inicioDeSesionAutomatico = $(
            'input-inicio-sesion-automatico'
          ).checked
          response.status.contraseña = true
          USUARIO = usuario
          localStorage.setItem('usuarios', JSON.stringify(USUARIOS))
        }
      }
    })

    callback(response)
  }
  btnStart.onclick = () => {
    if (USUARIO == undefined) {
      mostrarLogin()
      return
    }
    location.href = './elegirModo.html'
  }
  btnAddWord.onclick = () => {
    if (USUARIO == undefined) {
      mostrarLogin()
      return
    }
    location.href = './addWord.html'
  }
  btnLogros.onclick = () => {
    if (USUARIO == undefined) {
      mostrarLogin()
      return
    }
    // ....
  }

  btnComoSeJuega.onclick = () => {
    if (USUARIO == undefined) {
      mostrarLogin()
      return
    }
    // ......
  }
  btnPerfil.onclick = () => {
    location.href = './perfil.html'
  }
  btnSubirFoto.onchange = e => {
    let urlImagen = URL.createObjectURL(e.target.files[0])
    imagenPorDefecto.src = urlImagen
    crop.setImage(urlImagen)
    imagenPorDefecto.onload = () => {
      recortarImg(imagenPorDefecto)
    }
  }
  btnRegistrarseModal.onclick = () => {
    contenedorIdentificacionSlider.style.marginLeft = '-100%'
  }
  btnLogearModal.onclick = () => {
    contenedorIdentificacionSlider.style.marginLeft = '0%'
  }
  loginEnElHeader.onclick = () => {
    mostrarLogin()
  }

  btnsCerrarContenedorIdentificacion.forEach(btn => {
    btn.onclick = () => {
      cerrarLogin()
    }
  })

  btnAbrirGaleria.onclick = () => {
    if (contenedorGaleria.dataset.cerrado == 'true') {
      contenedorGaleria.style.maxHeight = '150px'
      contenedorGaleria.dataset.cerrado = 'false'
      contenedorGaleria.style.padding = '10px 0px 10px 5px'
      btnAbrirGaleria.style.transform = 'rotate(180deg)'
    } else {
      contenedorGaleria.style.maxHeight = '0'
      contenedorGaleria.style.padding = '0px'
      contenedorGaleria.dataset.cerrado = 'true'
      btnAbrirGaleria.style.transform = 'rotate(0deg)'
    }
  }
  cargarImagenesDeLaGaleria()
  mostrarContraseña()
}

window.onload = () => {
  console.log(USUARIOS)
  if (USUARIOS === null || USUARIOS.length === 0) {
    USUARIOS = []
    localStorage.setItem('usuarios', JSON.stringify(USUARIOS))
  } else {
    // Inicio de sesion automatico
    USUARIOS.forEach(usuario => {
      if (
        usuario.logeado === true &&
        usuario.configuracion.inicioDeSesionAutomatico === true
      ) {
        USUARIO = usuario
      }
    })
  }
  init()
  crop = new Croppr(imagenPorDefecto, {
    aspectRatio: 1,
    // minSize: [80, 80],
    // maxSize: [120, 120],
    startSize: [80, 80],
    // onInitialize: recortar,}
    onCropMove: () => {
      recortarImg(imagenPorDefecto)
    }
  })
  recortarImg(imagenPorDefecto)
}

// hacer el porcentaje que cuando esta desordenado
function verificarSiLasContraseñaCoincide (contraseña1, contraseña2, callback) {
  // console.log(contraseña1);
  // console.log(contraseña2);
  if (contraseña2 == '' || contraseña2.length == 0) {
    callback(false)
    return
  }
  if (contraseña2 === contraseña1) {
    callback(true)
  } else {
    callback(false)
  }
}
function insertarPorcentajeDeCoincidenciaDeContraseña (
  contraseña1,
  contraseña2
) {
  if (contraseña1.length == 0) {
    porcentajeText.innerHTML = '0%'
    return
  }
  if (
    contraseña2.slice(0, contraseña2.length) ==
    contraseña1.slice(0, contraseña2.length)
  ) {
    letrasCorrectas = contraseña2.length
    // letrasIncorrectas = 0
  } else {
    letrasCorrectas = letrasCorrectas - 1
    // letrasIncorrectas = contraseña1.length - contraseña2.length
  }
  if (letrasCorrectas >= 0) {
    porcentajeText.innerHTML = obtenerPorcentaje(
      letrasCorrectas,
      contraseña1.length
    )
  }
}
function obtenerPorcentaje (numero, numeroBase) {
  // let vBase = numeroBase / 100
  let calculo = (numero / numeroBase) * 100
  return `${Math.round(calculo)}%`
}
function verificarSiEsMinusculaOMayuscula (contraseña) {
  if (
    expRegMayuscula.test(contraseña) ||
    expRegMinusYMayus.test(contraseña) ||
    expRegMinuscula.test(contraseña)
  ) {
    return true
  }
  return false
}
function siLaContraseñaCoincide (usuarioNombre, contraseña) {
  USUARIOS.forEach(user => {
    if (user.nombre == usuarioNombre) {
      if (user.contraseña == contraseña) {
        return true
      }
    }
  })
  return false
}
function validarElLargoYSeguridadDeLaContraseña (contraseña, INPUT) {
  const length = contraseña.length

  if (length <= 20 && length >= 15) {
    // hacer las condificiones para muyseguro y seguro
    if (verificarSiEsMinusculaOMayuscula(contraseña)) {
      alertarInputValid(INPUT, '#F2B705', 'Seguro')
      return true
    }
    alertarInputValid(INPUT, '#0BD904', 'Muy seguro')
    return true
  }
  if (length <= 15 && length >= 10) {
    // hacer las condificiones para seguro y noTanSeguro
    if (verificarSiEsMinusculaOMayuscula(contraseña)) {
      alertarInputValid(INPUT, '#BBBF45', 'No tan seguro')
      return true
    }
    alertarInputValid(INPUT, '#F2B705', 'Seguro')
    return true
  }

  if (length <= 10 && length >= 5) {
    // hacer las condificiones para seguroCorto, noTanSeguro e inseguro
    if (expContraseñaMuySegura.test(contraseña)) {
      alertarInputValid(INPUT, '#D97904', 'Tu contraseña es seguro pero corto')
      return true
    }
    // prueba
    if (verificarSiEsMinusculaOMayuscula(contraseña)) {
      alertarInputValid(
        INPUT,
        '#D93B92',
        'Tu contraseña es valida pero no es seguro, ingresa digitos, letras mayusculas o caracteres especiales'
      )
      return true
    }
    alertarInputValid(INPUT, '#BBBF45', 'No tan seguro')
    return true
  } else {
  }
  return false
  /*
                    20-24: {
                            MUYSEGUROS
                            minusculas-mayusculas-digitos-caracteresEspeciales
                            minusculas-mayusculas-digitos
                            minusculas-mayusculas-caracteresEspeciales
                            SEGUROS
                            minusculas-mayusculas
                            minusculas
                            mayusculas
                        }
                    13-20: {
                            SEGUROS
                            minusculas-mayusculas-digitos
                            minusculas-mayusculas-digitos-caracteresEspeciales
                            minusculas-mayusculas-caracteresEspeciales
                            NOTANSEGUROS
                            minusculas-mayusculas
                            minusculas
                            mayusculas
                        }
                    5-13: {
                            SEGURO PERO CORTO
                            minusculas-mayusculas-digitos-caracteresEspeciales
                            NO TAN SEGUR0
                            minusculas-mayusculas-digitos
                            minusculas-mayusculas-caracteresEspeciales
                            INSEGURO
                            minusculas-mayusculas
                            minusculas
                            mayusculas
                    }
                    muySeguro : {
                        minusculas-mayusculas-digitos-caracteresEspeciales  (20-24)
                        minusculas-mayusculas-digitos                       (20-24)
                        minusculas-mayusculas-caracteresEspeciales          (20-24)

                    }
                    seguro: {
                        minusculas-mayusculas-digitos                       (13-20)
                        minusculas-mayusculas-digitos-caracteresEspeciales  (13-20)
                        minusculas-mayusculas-caracteresEspeciales          (13-20)
                        minusculas-mayusculas                               (20-24)
                        minusculas                                          (20-24)
                        mayusculas                                          (20-24)
                    }

                    seguroCorto: {
                        minusculas-mayusculas-digitos-caracteresEspeciales   (5-13)

                    }
                    noTanSeguro: {
                        minusculas-mayusculas-digitos                       (5-13)
                        minusculas-mayusculas-caracteresEspeciales          (5-13)
                        minusculas-mayusculas                               (13-20)
                        minusculas                                          (13-20)
                        mayusculas                                          (13-20)
                    }
                    inseguro: {
                        minusculas-mayusculas                               (5-13)
                        minusculas                                          (5-13)
                        mayusculas                                          (5-13)
                    }
                */
}
function verificarYAlertarInputs (inputs) {
  let inputsVacios = inputs.filter(input => input.value === '')
  let inputsInvalidos = []
  inputs.forEach(input => {
    switch (input.name) {
      case 'usuario-login':
        if (verificarNombreSiExite(input.value)) {
          // mostrar un modal cuando inicia sesion
          alertarInputValid(input)
        } else {
          alertarError(input, 'No existe el usuario ' + input.value + '.')
        }
        // validar si existe el usuario
        // validar si la contraseña es correcta con la del usuario
        break
      case 'contraseña-login':
        if (verificarNombreSiExite(inputNombreUsuarioLogin.value)) {
          if (
            siLaContraseñaCoincide(inputNombreUsuarioLogin.value, input.value)
          ) {
            alertarInputValid(input)
            break
          }
        }
        alertarError(input, 'Contraseña incorrecta.')

        break
      case 'usuario':
        validarUsuario(input, (valido, siExiste) => {
          if (input.value[0] == '_') {
            inputsInvalidos.push(input)
            return
          }
          if (valido && siExiste) {
            inputsInvalidos.push(input)
          } else if (!valido) {
            inputsInvalidos.push(input)
          }
        })
        break
      case 'contraseña':
        validarContraseña(input, valido => {
          if (!valido) {
            inputsInvalidos.push(input)
          }
        })

        break
      case 'contraseña2':
        let contraseña1 = inputContraseñaUsuarioRegister.value
        let contraseña2 = input.value

        verificarSiLasContraseñaCoincide(contraseña1, contraseña2, valido => {
          if (!valido) {
            inputsInvalidos.push(input)
          }
        })
        break
      case 'correo':
        validarCorreo(input.value, valido => {
          if (!valido) {
            inputsInvalidos.push(input)
          }
        })
        break
      case 'numero':
        validarNumero(input.value, valido => {
          if (!valido) {
            inputsInvalidos.push(input)
          }
        })
        break
      default:
        break
    }
  })

  if (inputsVacios.length === 0 && inputsInvalidos.length === 0) {
    return true
  }

  inputsInvalidos.forEach(inputInvalido => {
    alertarError(inputInvalido, 'Este campo es invalido')
  })
  inputsVacios.forEach(inputVacio => {
    alertarError(inputVacio, 'Este campo esta vacio')
  })
  return false
}

function alertarError (input, errorMessage) {
  const nameSpanIcon = `${input.name}-icon-alert`
  const nameSpanAlert = `${input.name}-alert`
  const namePadre = `${input.name}-contenedor`
  const spanIcon = ByName(nameSpanIcon)
  const spanAlert = ByName(nameSpanAlert)
  const contenedorPadre = ByName(namePadre)
  spanIcon.className = 'icon-cross'
  spanIcon.id = 'icono-input-invalid'
  contenedorPadre.style.border = '3px solid #F20530'
  spanIcon.style.background = '#F20530'
  spanAlert.className = 'span-alert'
  spanAlert.innerHTML = errorMessage
  spanIcon.onclick = e => {
    input.value = ''
  }
}

function alertarInputValid (input, color = '#0BD904', mensaje = '') {
  console.log('validado')
  const nameSpanIcon = `${input.name}-icon-alert`
  const nameSpanAlert = `${input.name}-alert`
  const namePadre = `${input.name}-contenedor`
  const spanIcon = ByName(nameSpanIcon)
  const spanAlert = ByName(nameSpanAlert)
  const contenedorPadre = ByName(namePadre)
  spanIcon.setAttribute('id', 'icono-input-valid')
  spanIcon.className = 'icon-checkmark'
  spanIcon.style.background = color
  contenedorPadre.style.border = `3px solid ${color}`
  spanAlert.innerHTML = mensaje
  spanIcon.onclick = () => {}
}

function recortarImg (element) {
  let parametros = crop.getValue()
  // console.log(parametros);
  canvas.width = parametros.width
  canvas.height = parametros.height
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(
    element,
    parametros.x,
    parametros.y,
    parametros.width,
    parametros.height,
    0,
    0,
    parametros.width,
    parametros.height
  )
}

function queSeMuestrenConUnClickLosItemDeLaGaleria (e) {
  let img = e.target
  imagenPorDefecto.src = img.src

  crop.setImage(img.src)
  setTimeout(() => {
    recortarImg(imagenPorDefecto)
  }, 200)
  const itemsDeLaGaleria = document.querySelectorAll('.item-galery')
  itemsDeLaGaleria.forEach(item => {
    item.style.filter = 'grayscale(0%)'
  })
  img.style.filter = 'grayscale(100%)'
}

function cargarImagenesDeLaGaleria () {
  for (let i = 1; i <= 31; i++) {
    let img = document.createElement('img')
    img.src = `./galeria/user-${i}.jpg`
    img.classList.add('item-galery')
    contenedorGaleria.appendChild(img)
    img.onclick = queSeMuestrenConUnClickLosItemDeLaGaleria
  }
}
function mostrarLogin () {
  contenedorGeneral.style.filter = 'blur(4px)'
  let heigthContenedor = contenedorIdentificacion.clientHeight
  window.scrollBy(0, -window.scrollY)
  contenedorIdentificacion.style.top = `calc(50vh - ${heigthContenedor / 2}px)`
}
function cerrarLogin () {
  contenedorGeneral.style.filter = 'blur(0px)'
  contenedorIdentificacion.style.top = `-100%`
}

function mostrarContraseña () {
  const btnsChecks = document.querySelectorAll('.btn-checkbox')
  // console.log(btnsChecks)
  btnsChecks.forEach(btn => {
    btn.onclick = () => {
      const input =
        btn.parentElement.parentElement.nextElementSibling.children[0]
      // console.log(input)
      if (btn.value == 'off') {
        input.setAttribute('type', 'text')
        btn.value = 'on'
      } else {
        input.setAttribute('type', 'password')
        btn.value = 'off'
      }
      // console.log(btn.value)
    }
  })
}
function verificarNombreSiExite (nombre) {
  let existe = false
  USUARIOS.forEach(usuario => {
    if (usuario.nombre === nombre) {
      existe = true
    }
  })

  return existe
}
