let btns = document.querySelectorAll(".tecla")
let arrayValues = []
btns.forEach(btn => {
    arrayValues.push(btn.value)
    btn.addEventListener("click", paint, event)
}
);















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
// HACER UNA FUNCION QUE PARA QUE CUANDO EXISTA 2 O MAS VECES UNA LETRA EN LA PALABRA SE MUESTRE LA LETRA 
let fallos = 0;
let palabraOrigin = "banana0"
let palabra = palabraOrigin.split("");
let letrasAcertadas = []
let letrasNoAcertadas = []
let letrasPalabraEscrita = ["-", "-", "-", "-", "-"]
let arrayPalabraCorrectas = document.querySelectorAll(".letra-correcta")
let contenedorPalabraIncorrectas = document.getElementById("contenedor-palabras-incorrectas")
window.addEventListener("keyup", paint, event)

function paint(event) {
    let teclaPulsada
    if (event.key) {

        teclaPulsada = event.key
    } else {
        teclaPulsada = event.target.value
    }
    console.log(teclaPulsada);
    if (teclaPulsada.length !== 1 || teclaPulsada == " " || event.altKey || event.ctrlkey) return
    verificarLaTecla(teclaPulsada)



    console.log(letrasAcertadas);
    console.log("acertadas");
    console.log(letrasNoAcertadas);
    console.log("no acertadas");
    // console.log(palabraEscrita);


}

function verificarLaTecla(teclaPulsada) {
    // teclaPulsada = teclaPulsada.toLowerCase()
    let verificacionDeLaTecla = verificacionYProcesamientoDeLaTeclaPulsada(teclaPulsada)
    if (verificacionDeLaTecla) {
        console.log("%cGANASTE!!", "font-size: 24px;");
        eliminarFuncionesDeLosEventos()


    } else if (verificacionDeLaTecla == false) {
        console.log("%cPERDISTE!!", "font-size: 24px;");
        eliminarFuncionesDeLosEventos()
    }
}
function eliminarFuncionesDeLosEventos() {
    window.removeEventListener("keyup", paint)
    btns.forEach(btn => {
        btn.removeEventListener("click", paint)
    });

}
function verificacionYProcesamientoDeLaTeclaPulsada(teclaPulsada) {
    console.log(arrayPalabraCorrectas);

    if (palabra.includes(teclaPulsada)) {
        let posicionDeLaTeclaPulsada = palabra.indexOf(teclaPulsada)
        arrayPalabraCorrectas[posicionDeLaTeclaPulsada].innerHTML = teclaPulsada
        
            // hacer un array d eltras vacias e iterar cada array y colocar un letra por la posicion de la tecla pulsada de acuerda a la palabra original y despues verificar con un join el array completo, solo se puede pushear si la posicion de la tecla de acuerdo a la palabra sea diferente de un string vacio o "-" en caso contrario significa que ya contiene la tecla
            // TIENE QUE RETORNAR TRUE PARA QUE INDIQUE QUE HA GANADO EL JUEGO    
        if (letrasPalabraEscrita[posicionDeLaTeclaPulsada] == "-") {
            letrasPalabraEscrita[posicionDeLaTeclaPulsada] = teclaPulsada
            palabra[posicionDeLaTeclaPulsada] = "-"
            letrasAcertadas.push(teclaPulsada)
        }
        if (letrasPalabraEscrita.join("") == palabraOrigin) {
            return true
        }



    } else { //TIENE QUE RETORNAR FALSE PARA QUE INDIQUE QUE HA PERDIDO EL JUEGO
        if (!letrasNoAcertadas.includes(teclaPulsada) && !palabraOrigin.includes(teclaPulsada)) {
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
    btns[indiceDeLaTecla].style = "background-color: #46484a;color: #fff;transform: scale(1.08)"
};
window.onkeyup = (e) => {
    if (!arrayValues.includes(e.key)) {
        return
    }
    let indiceDeLaTecla = arrayValues.indexOf(e.key)
    btns[indiceDeLaTecla].style = "background-color:e2e6ea;margin:0;"

}
window.onfocus = () => {
    btns.forEach((btn) => {
        btn.style = "background-color:e2e6ea;"
    })
}