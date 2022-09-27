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
let imagenSubida = $("foto")
let urlImagen = imagenSubida.src
imagenSubida.onload = ()=>{
    console.log(imagenSubida.width)
    canvas.width = 400
    canvas.height = 400
    context.drawImage(imagenSubida, 0, 0, 400, 400, 0, 0, 400, 400); // esto que se seleccione de acuerdo al croppr en el cropInizialise
    croppr(imagenSubida)

}



function recortar(e) {
    let inicioX = e.x
    console.log(e);
    let inicioY = e.y
    let nuevoAncho = e.width
    let nuevoAlto = e.height
    canvas.width = nuevoAncho
    canvas.height = nuevoAlto
    context.clearRect(0, 0, canvas.width, canvas.height);
    let imgTemp = new Image()
    imgTemp.src = urlImagen
    context.drawImage(imgTemp, inicioX, inicioY, nuevoAncho, nuevoAlto, 0, 0, nuevoAncho, nuevoAlto);


}
btnSubirFoto.onchange = (e) => {
    urlImagen = URL.createObjectURL(e.target.files[0])
    contenedorFoto.innerHTML = ""
    let img = document.createElement("img")
    img.classList.add("foto-img")
    img.setAttribute("id", "foto")
    contenedorFoto.appendChild(img)
    img.src = urlImagen
    
    croppr(img)

    // imagenSubida.src = urlImagen
    // se limpia por si habia una imagen antes 
    // context.clearRect(0, 0, canvas.width, canvas.height);


}


function croppr(element) {
    new Croppr(element, {
        aspectRatio: 1,
        // minSize: [80, 80],
        // maxSize: [120, 120],
        startSize: [80, 80],
        // onInitialize: recortar,}
        onCropMove: recortar
    })
    // element 
    // element.onloadeddata = ()=>{
    //     console.log(element.height);

    //     context.drawImage(element, 0, 0, element.width, element.height, 0, 0, element.width, element.height);
    // }
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