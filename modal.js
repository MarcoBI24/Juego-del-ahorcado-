const $$ = (id) => {
    return document.getElementById(id)
}
let modalLink = $$("modal-link")
let btnMenu = $$("btn-menu")
let contenedorModal = $$("modal")
let btnCloseModal = $$("close-modal")
let btnInicio = $$("btn-irAInicio")
if (btnInicio) {
    btnInicio.onclick = ()=>{
        location.href = location.origin + "/" + "index.html"
    }
      
}
btnCloseModal.onclick = ()=>{

    let heigthModal = contenedorModal.clientHeight;
    contenedorModal.style.top = `-${heigthModal}px`
    setTimeout(() => {
        modalLink.disabled = true
        
    }, 300);
}
btnMenu.onclick = ()=>{
    modalLink.disabled = false
    setTimeout(() => {
        let heigthModal = contenedorModal.clientHeight;
        window.scrollBy(0,-window.scrollY)
        // el translate Y es -50vh - la mitad del alto del modal
        contenedorModal.style.top = `calc(50vh - ${heigthModal / 2}px)`

    }, 200);
    
}
window.onscroll = ()=>{

}