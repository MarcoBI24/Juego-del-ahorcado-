let btns = document.querySelectorAll(".tecla")
let arrayValues =[]
btns.forEach(btn => {
    arrayValues.push(btn.value)
});
// guardar todos los valores en un array y cuando quiero verficar el index de la letra el array lo convierto en una palabra y obtengo el charAt y lo pase al array de los elmeento y le pongo un style y con keyUp igual
window.onkeydown = (e) => {
    if (!arrayValues.includes(e.key)) {
        return
    }
    let indiceDeLaTecla = arrayValues.indexOf(e.key)
    btns[indiceDeLaTecla].style.backgroundColor = "orange"
};
window.onkeyup = (e)=>{
    if (!arrayValues.includes(e.key)) {
        return
    }
    let indiceDeLaTecla = arrayValues.indexOf(e.key)
    btns[indiceDeLaTecla].style.backgroundColor = "yellow"

}
window.onfocus = ()=>{
    btns.forEach((btn)=>{
        btn.style.backgroundColor = "yellow"
    })
}