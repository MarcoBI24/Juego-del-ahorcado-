// const expMayusculaYMinuscula = /^\w*[a-zA-Z]$/
// const expMayusculaYMinusculaYDigitos = /^\w\d\W$/
// const exp = /\W/
// // console.log(expMayusculaYMinusculaYDigitos.test("n2#"))

// // console.log(porcentajeDeParecido("mundoundoo", "undo"));

// function porcentajeDeParecido(palabra, palabraO) {
//     const palabraOriginal = palabraO.split("")
//     let palabraCreada = []
//     for (let i = 0; i < palabraOriginal.length; i++) {
//         palabraCreada.push("-")
//     }
//     console.log(palabraCreada);
//     // const palabra = palabra
//     let numeroDeLetrasEncontradas = 0
//     palabraOriginal.forEach(letra => {
//         let posicionLetra = palabraOriginal.indexOf(letra)
//         if (palabra.includes(letra) && palabraCreada[posicionLetra] == "-") {
//             palabraCreada[posicionLetra] = letra
//             numeroDeLetrasEncontradas++
//         }
//     });
//     return obtenerPorcentaje(numeroDeLetrasEncontradas, palabraOriginal.length)
// }

// function obtenerPorcentaje(numero, numeroBase) {
//     // let vBase = numeroBase / 100
//     let calculo = (numero / numeroBase) * 100
//     return `${Math.round(calculo)}%`
// }
// let str1 = "holaa"
// let str2 = "hola"
// console.log()
// let ar = ['a','b','c','c','c','c']
// let str = "_a_a_a"
// let str2 = ''
// ar.forEach(element => {
//     str2 += "-"
// });
// console.log(str2.split(``));
// console.log(ar.includes("a"));
// str =str.split("")
// console.log(str);
// console.log(str.join(" "));
// str = str.join(" ")
// console.log(str.split(" "));

// console.log(str2.slice(0,str2.length));

// \w -- es para cualquier letra o digito y guion bajo o tambien cualquier letra de una palabra
// \W -- es para caracteres especiales o digitos

let saludo = "hola"

function validar(input,callback) {
    switch (input.type) {
        case "numero":
            if (input.value === "numero-correcto") {
                callback(true)
            }else{
                callback(false)
            }
            break;
        case "usuario":
            if (input.value === "usuario-correcto") {
                callback(true)
            }else{
                callback(false)
            }
            break;
        default:
            break;
    }
}
const input1 = {
    type : "numero",
    value : "numero-correto"
}
const input2 = {
    type : "usuario",
    value : "usuario-correcto"
}

validar(input2,(result)=>{
    console.log(result)
    if (result) {
        console.log("usuario-correcto")
    }else{
        console.log("usuario-incorrecto")
    }
})


