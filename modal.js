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
        
    }, 1000);
}
btnMenu.onclick = ()=>{

    modalLink.disabled = false
    setTimeout(() => {
        
        contenedorModal.style.transform = "translateY(calc(-50vh - 227px))"
    }, 500);
    
}
