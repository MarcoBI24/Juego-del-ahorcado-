const $ = (id) => {
    return document.getElementById(id)
}
let modalLink = $("modal-link")
let btnMenu = $("btn-menu")
let contenedorModal = $("modal")
let btnCloseModal = $("close-modal")
let btnInicio = $("btn-irAInicio")
if (btnInicio) {
    btnInicio.onclick = ()=>{
        location.href = location.origin + "/" + "index.html"
    }
      
}
btnCloseModal.onclick = ()=>{

    contenedorModal.style.transform = "translateY(0%)"
    setTimeout(() => {
        modalLink.disabled = true
        
    }, 200);
}
btnMenu.onclick = ()=>{

    modalLink.disabled = false
    setTimeout(() => {
        // el translate Y es -50vh - la mitad del alto del modal
        let heigthModal = contenedorModal.clientHeight
        contenedorModal.style.transform = 'translateY(calc(-50vh - ${heigthModal / 2 }))'
    }, 200);    
    
}
