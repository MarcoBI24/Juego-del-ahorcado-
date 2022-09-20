let btns = document.querySelectorAll(".tecla")
let arrayValues = []
btns.forEach(btn => {
    arrayValues.push(btn.value)
    btn.onclick = () => {
        let teclaPulsada = btn.value
        verificarLaTecla(teclaPulsada)
    }
}
);
// canvas para dibujar el muñeco
const canvas = document.getElementById("screen-game")
let context = canvas.getContext("2d");
// algoritmo-1 => guarda en variables o objetos las posiciones 
//  las posiciones de cada dibujo
// y despues iterarlas de acuerdo a numeros de fallos


// parametros para dibujar en el
const piso = {
    inicialX: 50,
    inicialY: 350,
    finalX: 350,
    finalY: 350,
}
const tubo = {
    inicialX: 50,
    inicialY: 50,
    finalX: 50,
    finalY: 350,
}
const techo = {
    inicialX: 50,
    inicialY: 50,
    finalX: 220,
    finalY: 50,
}
const horca = {
    inicialX: 220,
    inicialY: 50,
    finalX: 220,
    finalY: 100,
}
const cuerpo = {
    inicialX: 220,
    inicialY: 180,
    finalX: 220,
    finalY: 260,
}
const brazoDerecho = {
    inicialX: 220,
    inicialY: 180,
    finalX: 260,
    finalY: 250,
}
const cabeza = {
    inicialX: 220,
    inicialY: 140,
}
const brazoIzquierdo = {
    inicialX: 220,
    inicialY: 180,
    finalX: 180,
    finalY: 250,
}
const pataDerecha = {
    inicialX: 220,
    inicialY: 260,
    finalX: 260,
    finalY: 320,
}
const pataIzquierda = {

    inicialX: 220,
    inicialY: 260,
    finalX: 180,
    finalY: 320,
}

const arrayPiezas = [tubo, techo, horca, cabeza, cuerpo, brazoDerecho, brazoIzquierdo, pataDerecha, pataIzquierda]

init()

let fallos = 0;
let palabraOrigin = "marco"
let palabra = palabraOrigin.split("");
let letrasAcertadas = []
let letrasNoAcertadas = []
let letrasPalabraEscrita = ["-", "-", "-", "-", "-"]
let arrayPalabraCorrectas = document.querySelectorAll(".letra-correcta")
let contenedorPalabraIncorrectas = document.getElementById("contenedor-palabras-incorrectas")
window.addEventListener("keyup", paint, event)
function paint(event) {
    let teclaPulsada = event.key
    if (teclaPulsada.length !== 1 || teclaPulsada == " " || event.altKey || event.ctrlkey) return
    verificarLaTecla(teclaPulsada)



    console.log(letrasAcertadas);
    console.log("acertadas");
    console.log(letrasNoAcertadas);
    console.log("no acertadas");
    // console.log(palabraEscrita);


}

function verificarLaTecla(teclaPulsada) {
    teclaPulsada = teclaPulsada.toLowerCase()
    let verificacionDeLaTecla = verificacionYProcesamientoDeLaTeclaPulsada(teclaPulsada)
    if (verificacionDeLaTecla) {
        console.log("%cGANASTE!!", "font-size: 24px;");
        window.removeEventListener("keyup", paint)
    } else if (verificacionDeLaTecla == false) {
        console.log("%cPERDISTE!!", "font-size: 24px;");
        window.removeEventListener("keyup", paint)

    }
}
function verificacionYProcesamientoDeLaTeclaPulsada(teclaPulsada) {
    console.log(arrayPalabraCorrectas);

    if (palabra.includes(teclaPulsada)) {
        agregarLetraCorrecta(teclaPulsada)
        letrasAcertadas.push(teclaPulsada)
        if (letrasAcertadas.join("") == palabra.join("")) {
            return true
        }



    } else {
        if (!letrasNoAcertadas.includes(teclaPulsada)) {
            letrasNoAcertadas.push(teclaPulsada)
            agregarLetraIncorrecta(teclaPulsada)
        }
        let pieza = arrayPiezas[fallos]
        if (pieza == undefined) {
            return false
        }
        if (fallos == 3) {
            dibujarCabeza(pieza.inicialX, pieza.inicialY)
        } else {
            dibujarLinea(pieza.inicialX, pieza.inicialY, pieza.finalX, pieza.finalY)
        }
        fallos++


    }
}















function agregarLetraCorrecta(teclaPulsada) {
    let posicionDeLaTeclaPulsada = palabra.indexOf(teclaPulsada)
    arrayPalabraCorrectas[posicionDeLaTeclaPulsada].innerHTML = teclaPulsada
}
function agregarLetraIncorrecta(teclaPulsada) {
    let div = document.createElement("div")
    div.classList.add("letra-incorrecta")
    div.innerHTML = teclaPulsada
    contenedorPalabraIncorrectas.appendChild(div)
}
function dibujarLinea(inicialX, inicialY, finalX, finalY) {
    context.beginPath();

    context.lineWidth = 6;
    context.moveTo(inicialX, inicialY);
    context.lineTo(finalX, finalY);
    context.lineCap = "round";
    context.stroke();

    context.closePath();
}


function dibujarCabeza(x, y) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 8;
    context.arc(x, y, 40, Math.PI / 180 * 0, Math.PI / 180 * 360);

    context.stroke();


    context.closePath();

}
function init() {
    dibujarLinea(piso.inicialX, piso.inicialY, piso.finalX, piso.finalY) // piso
}
























window.onkeydown = (e) => {
    if (!arrayValues.includes(e.key)) {
        return
    }
    let indiceDeLaTecla = arrayValues.indexOf(e.key)
    btns[indiceDeLaTecla].style.boxShadow = "inset 0px 0px 25px -16px rgba(0,0,0)"
};
window.onkeyup = (e) => {
    if (!arrayValues.includes(e.key)) {
        return
    }
    let indiceDeLaTecla = arrayValues.indexOf(e.key)
    btns[indiceDeLaTecla].style.boxShadow = "none"

}
window.onfocus = () => {
    btns.forEach((btn) => {
        btn.style.boxShadow = "none"
    })
}