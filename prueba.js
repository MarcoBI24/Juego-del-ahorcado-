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
let ar = ['a','b','c']
let str = "_a_a_a"
console.log(ar.includes("a"));
str =str.split("")
console.log(str);
console.log(str.join(" "));
str = str.join(" ")
console.log(str.split(" "));
// console.log(str2.slice(0,str2.length));

// \w -- es para cualquier letra o digito y guion bajo o tambien cualquier letra de una palabra
// \W -- es para caracteres especiales o digitos