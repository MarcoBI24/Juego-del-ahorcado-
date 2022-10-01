const $ = (id) => { return document.getElementById(id) };
const btnStart = $("start-game")
const btnAddWord = $("add-word")
const contenedorIdentificacion = $("contenedor-identificacion")
const contenedorIdentificacionSlider = $("contenedor-identificacion-slider")
const contenedorGeneral = $("contenedor-general")
const btnLoginModal = $("login")
// Logear el usuario
// obtener datos del usuario (nombre de usuario,contraseña, foto )
//  de ahi guarda en un objeto llamado usuario que tenga NOMBRE, CONTRASEÑA, URL DE LA FOTO, RECORD, MELLADA Y SI ESTA LOGEADO 
// Guardar datos del usuario en el localStorage


const btnRegistrarseModal = $("btn-registro")
const btnLogearModal = $("btn-login")

btnRegistrarseModal.onclick = () => {
    contenedorIdentificacionSlider.style.marginLeft = "-100%"
}
btnLogearModal.onclick = () => {
    contenedorIdentificacionSlider.style.marginLeft = "0%"
}





// SCOPE PARA HACER LA ANIMACION DE LOS INPUTS AL ESCRIBIR
const inputLogins = document.querySelectorAll('.input-login');
const labelDelInputLogin = document.querySelectorAll('.label-text');
inputLogins.forEach(input => {
    input.onfocus = () => {
        input.nextElementSibling.style.top = "-53%"
    };
    input.onblur = () => {
        if (input.value == "") {
            input.nextElementSibling.style.top = "0%"

        }
    }
});
btnLoginModal.onclick = () => {
    mostrarLogin()
}

btnStart.onclick = () => {
    mostrarLogin()
    // location.href = "./elegirModo.html"
}







const btnSubirFoto = $('input-subirFoto')
const contenedorFoto = $('contenedor-foto')
const canvas = $('canvas')
const context = canvas.getContext('2d')
let imagenPorDefecto = $("foto")
let urlImagen = imagenPorDefecto.src
let crop
window.onload = () => {
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

btnSubirFoto.onchange = (e) => {
    let urlImagen = URL.createObjectURL(e.target.files[0])
    imagenPorDefecto.src = urlImagen
    crop.setImage(urlImagen)
    imagenPorDefecto.onload = () => {
        recortarImg(imagenPorDefecto)
    }



}



let imgTemp = new Image()


function recortarImg(element) {

    let parametros = crop.getValue()
    canvas.width = parametros.width
    canvas.height = parametros.height
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(element, parametros.x, parametros.y, parametros.width, parametros.height, 0, 0, parametros.width, parametros.height);

}






































btnAddWord.onclick = () => {
    location.href = "./addWord.html"
}

function mostrarLogin() {
    contenedorGeneral.style.filter = "blur(4px)"
    let heigthContenedor = contenedorIdentificacion.clientHeight;
    window.scrollBy(0, -window.scrollY)
    contenedorIdentificacion.style.top = `calc(50vh - ${heigthContenedor / 2}px)`

}