const expMayusculaYMinuscula = /^\w*[a-zA-Z]$/
const expMayusculaYMinusculaYDigitos = /^(\w\d\W)$/
const exp = /\W/
console.log(expMayusculaYMinusculaYDigitos.test("3#mjdbhb"))



// \w -- es para cualquier letra o digito
// \W -- es para caracteres especiales o digitos