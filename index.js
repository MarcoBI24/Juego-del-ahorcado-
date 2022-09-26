const $ = (id)=>{return document.getElementById(id)};
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

btnRegistrarseModal.onclick = ()=>{
    contenedorIdentificacionSlider.style.marginLeft = "-100%"
}
btnLogearModal.onclick = ()=>{
    contenedorIdentificacionSlider.style.marginLeft = "0%"
}








btnLoginModal.onclick = ()=>{
    mostrarLogin()
}

btnStart.onclick = ()=>{
    mostrarLogin()
    // location.href = "./elegirModo.html"
}






























btnAddWord.onclick = ()=>{
    location.href = "./addWord.html"
}

function mostrarLogin() {
    contenedorGeneral.style.filter = "blur(4px)"
    let heigthContenedor = contenedorIdentificacion.clientHeight;
    window.scrollBy(0,-window.scrollY)
    contenedorIdentificacion.style.top = `calc(50vh - ${heigthContenedor / 2}px)`
    
}