






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
const itemsDeLaGaleria = document.getElementsByClassName("item-galery")
const btnsCerrarContenedorIdentificacion = document.querySelectorAll(".contenedor-icono")
const btnRegistrarseModal = $("btn-registro")
const btnLogearModal = $("btn-login")
// LOS 2 SIGUIENTES CONSTANTES SIRVEN PARA HACER LA ANIMACION DE LOS INPUTS AL ESCRIBIR
const inputLogins = document.querySelectorAll('.input-login');
const labelDelInputLogin = document.querySelectorAll('.label-text');
let imgTemp = new Image()
const btnSubirFoto = $('input-subirFoto')
const contenedorFoto = $('contenedor-foto')
const canvas = $('canvas')
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
btnIniciarSesionUsuario.onclick = () => {
    // VALIDAR CADA INPUT AQUI SOLO SE VALIDA QUE NINGUN CAMPO ESTE VACIO
    let inputs = [inputNombreUsuarioLogin, inputContraseñaLogin]
    if (!verificarYAlertarInputsVacios(inputs)) {
        return
    }

    let nombre = inputNombreUsuarioLogin.value
    let contraseña = inputContraseñaLogin.value
    iniciarSesión(nombre, contraseña)
}
function verificarYAlertarInputsVacios(inputs) {
    inputs = inputs.filter(input => input.value === "")
    if (inputs.length === 0) {
        return true
    }
    inputs.forEach(input => {
        if (input.nextElementSibling.nextElementSibling == undefined) {
            alertarInputVacio(input)
            
        }
    })
}
btnRegistrarUsuario.onclick = () => {
    // VALIDAR CADA INPUT AQUI SOLO SE VALIDA QUE NINGUN CAMPO ESTE VACIO
    let inputs = [inputNombreUsuarioRegister, inputContraseñaUsuarioRegister, inputContraseña2Usuario, inputCorreoUsuario]
    if (!verificarYAlertarInputsVacios(inputs)) {
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
        logeado: true,
    }
    USUARIOS.push(usuarioTemp)
    localStorage.setItem("usuarios", JSON.stringify(USUARIOS))
}




function iniciarSesión(nombreDeUsuario, contraseña) {
    // esta funcion debe buscar el usuario en el array de USUARIOS y verificar la contraseña y el nombre de usuario
    USUARIOS.forEach(usuario => {
        if (nombreDeUsuario === usuario.nombre && contraseña === usuario.contraseña) {
            USUARIO = usuario
        }
    })
}



function alertarInputVacio(input) {
    let spanAlert = document.createElement('span')
    spanAlert.innerHTML = "Esta campo esta vacio"
    spanAlert.className = "alerta-input-vacio"
    input.parentElement.appendChild(spanAlert)
    input.style.borderColor = "#c91c2a"
    input.style.borderWidth = "1px"
}


// window.document.onload = () => {
// init()
// }
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
        startSize: [120, 120],
        // onInitialize: recortar,}
        onCropMove: () => {
            recortarImg(imagenPorDefecto)
        }
    })
    recortarImg(imagenPorDefecto)



}








function init() {

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

    btnAbrirGaleria.parentElement.onclick = () => {
        console.log(contenedorGaleria.dataset.cerrado);
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
    hacerAnimacionACadaInputAlEscribir()
    queSeMuestrenConUnClickLosItemDeLaGaleria()


}





function hacerAnimacionACadaInputAlEscribir() {
    inputLogins.forEach(input => {
        input.onfocus = () => {
            input.nextElementSibling.style.top = "-40%"
            input.nextElementSibling.style.fontSize = "15px"
        };
        input.onblur = () => {
            if (input.value == "") {
                input.nextElementSibling.style.top = "0%"
                input.nextElementSibling.style.fontSize = "20px"
                return
            }
            input.nextElementSibling.style.fontSize = "15px"
        }
    });
}

function recortarImg(element) {

    let parametros = crop.getValue()
    // console.log(parametros);
    canvas.width = parametros.width
    canvas.height = parametros.height
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(element, parametros.x, parametros.y, parametros.width, parametros.height, 0, 0, parametros.width, parametros.height);

}

function queSeMuestrenConUnClickLosItemDeLaGaleria() {
    for (let i = 0; i < itemsDeLaGaleria.length; i++) {
        const item = itemsDeLaGaleria[i];
        item.onclick = () => {
            imagenPorDefecto.src = item.src

            crop.setImage(item.src)
            setTimeout(() => {

                recortarImg(imagenPorDefecto)
            }, 200);
            for (let j = 0; j < itemsDeLaGaleria.length; j++) {
                itemsDeLaGaleria[j].style.filter = "grayscale(0%)"

            }
            item.style.filter = "grayscale(100%)"
        }
    }

}
function cargarImagenesDeLaGaleria() {
    for (let i = 1; i <= 31; i++) {
        let img = document.createElement("img")
        img.src = `./galeria/user-${i}.jpg`
        img.classList.add("item-galery")
        contenedorGaleria.appendChild(img)
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













