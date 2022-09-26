const $ = (id)=>{return document.getElementById(id)};
const btnStart = $("start-game")
const btnAddWord = $("add-word")

// Logear el usuario
// obtener datos del usuario (nombre de usuario,contraseña, foto )
//  de ahi guarda en un objeto llamado usuario que tenga NOMBRE, CONTRASEÑA, URL DE LA FOTO, RECORD, MELLADA Y SI ESTA LOGEADO 
// Guardar datos del usuario en el localStorage












const contenedorIdentificacion = $("contenedor-identificacion")
const contenedorGeneral = $("contenedor-general")
// btnMenu.onclick = ()=>{
//     modalLink.disabled = false
//     setTimeout(() => {
//         let heigthModal = contenedorModal.clientHeight;
//         window.scrollBy(0,-window.scrollY)
//         // el translate Y es -50vh - la mitad del alto del modal
//         contenedorModal.style.top = `calc(50vh - ${heigthModal / 2}px)`

//     }, 200);
    
// }

btnStart.onclick = ()=>{
    contenedorGeneral.style.filter = "blur(4px)"
    let heigthContenedor = contenedorIdentificacion.clientHeight;
    window.scrollBy(0,-window.scrollY)
    contenedorIdentificacion.style.top = `calc(50vh - ${heigthContenedor / 2}px)`
    
    // location.href = "./elegirModo.html"
}






























btnAddWord.onclick = ()=>{
    location.href = "./addWord.html"
}
