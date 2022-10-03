const $ = (id) => { return document.getElementById(id) }
const btnRetroceder = $("btn-retroceder")
btnRetroceder.onclick = ()=>{
    window.location = location.origin + "/" + "index.html"
}
const btnAbrirContenedorPalabras = $("contenedor-abrir-palabras")
const contenedorPalabras = $("contenedor-palabras")
btnAbrirContenedorPalabras.onclick = ()=>{
    if (contenedorPalabras.dataset.abierto == "false") {
        
        contenedorPalabras.style.maxHeight = "150px"
        contenedorPalabras.dataset.abierto = "true"
    }else{
        contenedorPalabras.style.maxHeight = "0px"
        contenedorPalabras.dataset.abierto = "false"
    }
}
