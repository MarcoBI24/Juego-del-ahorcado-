const $ = (id) => { return document.getElementById(id) }
let crop
let imagenPorDefecto = $("foto")
const canvas = $('canvas')
const context = canvas.getContext("2d")
const btnSubirFoto = $("input-subirFoto")
const btnAbrirGaleria = $("btn-abrir-galeria")
const contenedorGaleria = $("contenedor-galeria")
const itemsDeLaGaleria = document.getElementsByClassName("item-galery")

function recortarImg(element) {

    let parametros = crop.getValue()
    // console.log(parametros);
    canvas.width = parametros.width
    canvas.height = parametros.height
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(element, parametros.x, parametros.y, parametros.width, parametros.height, 0, 0, parametros.width, parametros.height);

}
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
    cargarImagenesDeLaGaleria()
    queSeMuestrenConUnClickLosItemDeLaGaleria()



}
btnSubirFoto.onchange = (e) => {
    let urlImagen = URL.createObjectURL(e.target.files[0])
    imagenPorDefecto.src = urlImagen
    crop.setImage(urlImagen)
    imagenPorDefecto.onload = () => {
        recortarImg(imagenPorDefecto)
    }



}

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
