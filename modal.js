const $ = (id) => {
    return document.getElementById(id)
}
let modalLink = $("modal-link")
let btnMenu = $("btn-menu")
let contenedorModal = $("modal")
let btnCloseModal = $("close-modal")

btnCloseModal.onclick = ()=>{

    contenedorModal.style.transform = "translateY(0%)"
    setTimeout(() => {
        modalLink.disabled = true
        
    }, 400);
}
btnMenu.onclick = ()=>{

    modalLink.disabled = false
    setTimeout(() => {
        // el translate Y es -50vh - la mitad del alto del modal
        contenedorModal.style.transform = "translateY(calc(-50vh - 227px))"
    }, 400);
    
}
