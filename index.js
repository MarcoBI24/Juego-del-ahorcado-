
const $ = (id) => { return document.getElementById(id) };
const btnStart = $("start-game")
const btnAddWord = $("add-word")
const btnLogros = $("clasification")
const btnComoSeJuega = $("como-se-juega")
const contenedorIdentificacion = $("contenedor-identificacion")
const contenedorIdentificacionSlider = $("contenedor-identificacion-slider")
const contenedorGeneral = $("contenedor-general")
const loginEnElHeader = $("login")
const btnAbrirGaleria = $("btn-abrir-galeria")
const contenedorGaleria = $("contenedor-galeria")
const btnsCerrarContenedorIdentificacion = document.querySelectorAll(".contenedor-icono")
const btnRegistrarseModal = $("btn-registro")
const btnLogearModal = $("btn-login")
// LOS 2 SIGUIENTES CONSTANTES SIRVEN PARA HACER LA ANIMACION DE LOS INPUTS AL ESCRIBIR
const inputLogins = document.querySelectorAll('.input');
const labelDelInputLogin = document.querySelectorAll('.label-text');
let imgTemp = new Image()
const btnSubirFoto = $('input-subirFoto')
const contenedorFoto = $('contenedor-foto')
const canvas = $('canvas')
const btnPerfil = $("btn-perfil")
const context = canvas.getContext('2d')
let imagenPorDefecto = $("foto")
let urlImagen = imagenPorDefecto.src
let crop
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
        inicioDeSesionAutomatico: on, 'cuando este en on deja el LS como esta y cuando este en off ejecutar la funcion cerrarSesion() cuando cierre la página' y la funcion cerrarSesion() va a hacer cambiar la propiedad logeada a false para que cuando vuelva a cargar la pagina itere los usuarios y no encontrara un usuario logeado || crear un usuario logeado en el LS y ponerle el usuaurio que tiene la propiedad logeado en true y cuando cierre sesion ese usuario vaciarlo el problema estaria cuando quiera hacer un cambio tendria que hacerlo en el usuario logeado y cuando cierre la pagina actualizar el usuario logeado con sus nuevas configuraciones || o sino solo tener un usuario con la propiedad logeado y a la carga de cada pagina crear una variabla con los datos del usuario y cuando haya un cambio actualizarlo al instante ***
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

let USUARIO;
let USUARIOS = JSON.parse(localStorage.getItem('usuarios'));
const inputNombreUsuarioRegister = $('nombre-usuario')
const inputContraseñaUsuarioRegister = $('contraseña-usuario')
const inputContraseña2Usuario = $('contraseña2-usuario')
const inputCorreoUsuario = $('correo-usuario')
const btnRegistrarUsuario = $('registrarse-form')
const btnIniciarSesionUsuario = $('login-form')
const inputNombreUsuarioLogin = $('nombre-usuario-login')
const inputContraseñaLogin = $('contraseña-login')
const porcentajeText = $("porcentaje")
let expContraseñaValida = /(?=.*[a-z]+)?(?=.*[A-Z]+)?(?=.*\d+)?(?=.*[$@$!%*?&#.$($)$-$_])?.*[a-zA-Z\d@!%*?&#.$($)$-$_]+/
let expContraseñaMuySegura = /(?=.*[a-z]+)?(?=.*[A-Z]+)(?=.*\d+)(?=.*[$@$!%*?&#.$($)$-$_]).*[a-zA-Z\d@!%*?&#.$($)$-$_]+/
let expRegMinuscula = /^[a-z]+$/
let expRegMayuscula = /^[A-Z]+$/
let expRegMinusYMayus = /^(?=[a-zA-Z])(?=.*[a-z][A-Z]+|.*[A-Z][a-z]+)[a-zA-Z]+$/
let expRegNombreUsuario = /^[a-zA-Z0-9ü][a-zA-Z0-9ü_]{3,16}$/

function verificarYAlertarInputs(inputs) {
    let inputsVacios = inputs.filter(input => input.value === "")
    let inputsInvalidos = inputs.filter(input => input.dataset.valid === "false")
    if (inputsVacios.length === 0 && inputsInvalidos.length === 0) {

        return true
    }
    inputsInvalidos.forEach(inputInvalido => {
        alertarError(inputInvalido, "Este campo es invalido")
    })
    inputsVacios.forEach(inputVacio => {
        alertarError(inputVacio, "Este campo esta vacio")
    })
}


function iniciarSesión(nombreDeUsuario, contraseña) {
    // esta funcion debe buscar el usuario en el array de USUARIOS y verificar la contraseña y el nombre de usuario
    USUARIOS.forEach(usuario => {
        if (nombreDeUsuario === usuario.nombre && contraseña === usuario.contraseña) {
            USUARIO = usuario
        }
    })
}



function alertarError(input, errorMessage) {


    input.nextElementSibling.className = "icon-cross"
    input.nextElementSibling.id = "icono-input-invalid"
    input.parentElement.style.border = "3px solid #F20530"
    input.nextElementSibling.style.background = "#F20530"
    // input.parentElement.nextElementSibling.className = "span-alert"
    input.parentElement.nextElementSibling.innerHTML = errorMessage

}




function alertarInputValid(input, color = "#0BD904", mensaje = "") {

    input.nextElementSibling.setAttribute("id", "icono-input-valid")
    input.nextElementSibling.className = "icon-checkmark"
    input.nextElementSibling.style.background = color
    input.parentElement.nextElementSibling.innerHTML = mensaje
    input.parentElement.style.border = `3px solid ${color}`
    // aqui crear un span con un icono de check y darle color verde al border del contenedor
}
function verificarNombre(nombre) {
    let existe = false
    USUARIOS.forEach(usuario => {
        if (usuario.nombre === nombre) {
            existe = true
        }
    })
    if (existe) {
        console.log("Ese nombre ya existe");
        inputNombreUsuarioRegister.dataset.valid = "false"
        alertarError(inputNombreUsuarioRegister, "Este usuario ya existe")

    } else {
        inputNombreUsuarioRegister.dataset.valid = "true"
        alertarInputValid(inputNombreUsuarioRegister)

    }

}

function validarInput(e) {
    const INPUT = e.target
    if (INPUT.value == "" || INPUT.value.length === 0) {
        alertarError(INPUT, "")
        return
    }
    switch (INPUT.name) {
        case "usuario":
            if (INPUT.value[0] == "_") {
                alertarError(INPUT, "El usuario no puede empezar por el guion bajo")
                return
            }
            if (e.key == " ") {
                alertarError(INPUT, "El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo")

            }
            if ((e.type == "keydown" || e.type == "keyup") && !((e.key.length == 1 && e.key !== " ") || e.key == "Backspace")) {
                return
            }
            if (INPUT.value.includes(" ") || expRegNombreUsuario.test(INPUT.value) == false || INPUT.value.length == 0) {
                alertarError(INPUT, "El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo")
            } else {
                alertarInputValid(INPUT)
                verificarNombre(INPUT.value)
            }

            break;
        case "contraseña":

            let contraseña = INPUT.value
            console.log(contraseña.length);

            verificarSiLasContraseñaCoincide()
            if (!(expContraseñaValida.test(contraseña) && contraseña.length >= 5 && validarContraseña(contraseña, INPUT))) {
                alertarError(INPUT, "Debe tener 5-20 caracteres(digitos, minúsculas, mayúsculas y para mas seguridad usa signos")
                // )
                // <b>Muy seguro >>> </b> az-AZ-09-#?!<br><b>Seguro >>></b> az-AZ-09<br><b>Inseguro >>></b> az-AZ<br>
                break
            }
            
            break
        case "contraseña2":
            let contraseña1 = inputContraseñaUsuarioRegister.value
            let contraseña2 = INPUT.value
            if (e.type == "blur" && contraseña1 !== contraseña2) {
                alertarError(INPUT, "La contraseña no coincide")
                verificarSiLasContraseñaCoincide()

                break

            }

            if ((e.key.length == 1 && e.key !== " ") || e.key == "Backspace") {

                verificarSiLasContraseñaCoincide()
            }

            console.log(contraseña1);
            console.log(contraseña2);
            break

        case "correo" : 
            let expRegCorreo = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
            if (expRegCorreo.test(INPUT.value) && !INPUT.value.includes(" ")) {
                alertarInputValid(INPUT)
            }else{
                alertarError(INPUT, "No tiene el formato --> <b>ejemplo@dominio.dominio</b>")
            }
        default:
            break;
    }

}
let letrasIncorrectas = 0
let letrasCorrectas = 0

// hacer el porcentaje que cuando esta desordenado
function verificarSiLasContraseñaCoincide() {

    const contraseña1 = inputContraseñaUsuarioRegister.value
    const contraseña2 = inputContraseña2Usuario.value
    if (contraseña2 == "") {
        return "0%"
    }
    if (contraseña2 === contraseña1) {
        alertarInputValid(inputContraseña2Usuario)
    } else {

        alertarError(inputContraseña2Usuario, "La contraseña no coincide")
    }
    if (contraseña2.slice(0, contraseña2.length) == contraseña1.slice(0, contraseña2.length)) {
        letrasCorrectas = contraseña2.length
        // letrasIncorrectas = 0
    } else {
        letrasCorrectas = letrasCorrectas - 1
        // letrasIncorrectas = contraseña1.length - contraseña2.length
    }
    if (letrasCorrectas >= 0) {
        porcentajeText.innerHTML = obtenerPorcentaje(letrasCorrectas, contraseña1.length)
    }
}

function obtenerPorcentaje(numero, numeroBase) {
    // let vBase = numeroBase / 100
    let calculo = (numero / numeroBase) * 100
    return `${Math.round(calculo)}%`
}
function verificarSiEsMinusculaOMayuscula(contraseña) {
    if (expRegMayuscula.test(contraseña) || expRegMinusYMayus.test(contraseña) || expRegMinuscula.test(contraseña)) {
        return true
    }
    return false

}
function validarContraseña(contraseña, INPUT) {
    const length = contraseña.length

    if (length <= 20 && length >= 15) {
        // hacer las condificiones para muyseguro y seguro
        if (verificarSiEsMinusculaOMayuscula(contraseña)) {

            alertarInputValid(INPUT, "#F2B705", "Seguro")
            return true
        }
        alertarInputValid(INPUT, "#0BD904", "Muy seguro")
        return true
    }
    if (length <= 15 && length >= 10) {
        // hacer las condificiones para seguro y noTanSeguro
        if (verificarSiEsMinusculaOMayuscula(contraseña)) {
            alertarInputValid(INPUT, "#BBBF45", "No tan seguro")
            return true
        }
        alertarInputValid(INPUT, "#F2B705", "Seguro")
        return true
    }

    if (length <= 10 && length >= 5) {
        // hacer las condificiones para seguroCorto, noTanSeguro e inseguro
        if (expContraseñaMuySegura.test(contraseña)) {
            alertarInputValid(INPUT, "#D97904", "Tu contraseña es seguro pero corto")
            return true

        }
        // prueba
        if (verificarSiEsMinusculaOMayuscula(contraseña)) {
            alertarInputValid(INPUT, "#D93B92", "Tu contraseña es valida pero no es seguro, ingresa digitos, letras mayusculas o caracteres especiales")
            return true
        }
        alertarInputValid(INPUT, "#BBBF45", "No tan seguro")
        return true

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
function init() {
    inputLogins.forEach(input => {
        input.onkeydown = validarInput
        input.onkeyup = validarInput
        input.onblur = validarInput
    });
    btnRegistrarUsuario.onclick = () => {
        // VALIDAR CADA INPUT AQUI SOLO SE VALIDA QUE NINGUN CAMPO ESTE VACIO
        let inputs = [inputNombreUsuarioRegister, inputContraseñaUsuarioRegister, inputContraseña2Usuario, inputCorreoUsuario]
        if (!verificarYAlertarInputs(inputs)) {
            return
        }

        let usuarioTemp = {
            nombre: inputNombreUsuarioRegister.value,
            contraseña: inputContraseñaUsuarioRegister.value,
            correo: inputCorreoUsuario.value,
            foto: canvas.toDataURL(),
            fotos: [],
            record: "0",
            medalla: "huevo",
            palabras: [],
            configuracion: {
                tema: "light",
                efectosDeSonido: "off",
                musica: "off",
                efectosDeSonidoDelTeclado: "off",
                inicioDeSesionAutomatico: "on",
            },
            logeado: false,
        }
        USUARIOS.push(usuarioTemp)
        localStorage.setItem("usuarios", JSON.stringify(USUARIOS))
        console.log(`${usuarioTemp.nombre} registrado con exito!`);
    }

    btnIniciarSesionUsuario.onclick = () => {
        // VALIDAR CADA INPUT AQUI SOLO SE VALIDA QUE NINGUN CAMPO ESTE VACIO
        let inputs = [inputNombreUsuarioLogin, inputContraseñaLogin]
        if (!verificarYAlertarInputs(inputs)) {
            return
        }

        let nombre = inputNombreUsuarioLogin.value
        let contraseña = inputContraseñaLogin.value
        iniciarSesión(nombre, contraseña)
    }

    btnStart.onclick = () => {
        if (USUARIO == undefined) {
            mostrarLogin();
            return
        }
        location.href = "./elegirModo.html"
    }
    btnAddWord.onclick = () => {
        if (USUARIO == undefined) {
            mostrarLogin();
            return
        }
        location.href = "./addWord.html"

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
            mostrarLogin();
            return
        }
        // ......
    }
    btnPerfil.onclick = () => {
        location.href = "./perfil.html"
    }
    btnSubirFoto.onchange = (e) => {
        let urlImagen = URL.createObjectURL(e.target.files[0])
        imagenPorDefecto.src = urlImagen
        crop.setImage(urlImagen)
        imagenPorDefecto.onload = () => {
            recortarImg(imagenPorDefecto)
        }



    }
    btnRegistrarseModal.onclick = () => {
        contenedorIdentificacionSlider.style.marginLeft = "-100%"
    }
    btnLogearModal.onclick = () => {
        contenedorIdentificacionSlider.style.marginLeft = "0%"
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
        if (contenedorGaleria.dataset.cerrado == "true") {
            contenedorGaleria.style.maxHeight = "150px"
            contenedorGaleria.dataset.cerrado = "false"
            contenedorGaleria.style.padding = "10px 0px 10px 5px"
            btnAbrirGaleria.style.transform = "rotate(180deg)"
        } else {
            contenedorGaleria.style.maxHeight = "0"
            contenedorGaleria.style.padding = "0px"
            contenedorGaleria.dataset.cerrado = "true"
            btnAbrirGaleria.style.transform = "rotate(0deg)"

        }

    }
    cargarImagenesDeLaGaleria()
    mostrarContraseña()
}



window.onload = () => {
    if (USUARIOS === null || USUARIOS.length === 0) {
        USUARIOS = []
        localStorage.setItem('usuarios', JSON.stringify(USUARIOS));
    } else {
        // Inicio de sesion automatico
        USUARIOS.forEach(usuario => {
            if (usuario.logeado === true) {
                USUARIO = usuario

            }
        });
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



function recortarImg(element) {

    let parametros = crop.getValue()
    // console.log(parametros);
    canvas.width = parametros.width
    canvas.height = parametros.height
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(element, parametros.x, parametros.y, parametros.width, parametros.height, 0, 0, parametros.width, parametros.height);

}

function queSeMuestrenConUnClickLosItemDeLaGaleria(e) {
    let img = e.target
    imagenPorDefecto.src = img.src

    crop.setImage(img.src)
    setTimeout(() => {

        recortarImg(imagenPorDefecto)
    }, 200);
    const itemsDeLaGaleria = document.querySelectorAll(".item-galery")
    itemsDeLaGaleria.forEach(item => {
        item.style.filter = "grayscale(0%)"
    });
    img.style.filter = "grayscale(100%)"
}


function cargarImagenesDeLaGaleria() {
    for (let i = 1; i <= 31; i++) {

        let img = document.createElement("img")
        img.src = `./galeria/user-${i}.jpg`
        img.classList.add("item-galery")
        contenedorGaleria.appendChild(img)
        img.onclick = queSeMuestrenConUnClickLosItemDeLaGaleria
    }




}
function mostrarLogin() {
    contenedorGeneral.style.filter = "blur(4px)"
    let heigthContenedor = contenedorIdentificacion.clientHeight;
    window.scrollBy(0, -window.scrollY)
    contenedorIdentificacion.style.top = `calc(50vh - ${heigthContenedor / 2}px)`

}
function cerrarLogin() {
    contenedorGeneral.style.filter = "blur(0px)"
    contenedorIdentificacion.style.top = `-100%`

}



function mostrarContraseña() {
    const btnsChecks = document.querySelectorAll(".btn-checkbox")
    console.log(btnsChecks);
    btnsChecks.forEach(btn => {
        btn.onclick = () => {
            const input = btn.parentElement.parentElement.nextElementSibling.children[0];
            console.log(input);
            if (btn.value == "off") {
                input.setAttribute("type", "text")
                btn.value = "on"

            } else {
                input.setAttribute("type", "password")
                btn.value = "off"
            }
            console.log(btn.value);

        }
    })
}


