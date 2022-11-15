const $$ = (id) => {
  return document.getElementById(id);
};
let modalLink = $$("modal-link");
let btnMenu = $$("btn-menu");
let contenedorModal = $$("modal");
let btnCloseModal = $$("close-modal");
let btnInicio = $$("btn-irAInicio");
if (btnInicio) {
  btnInicio.onclick = () => {
    location.href = location.origin + "/" + "index.html";
  };
}
function cerrarModal() {
  let heigthModal = contenedorModal.clientHeight;
  contenedorModal.style.top = `-${heigthModal}px`;
  setTimeout(() => {
    modalLink.disabled = true;
  }, 300);
}
function abrirModal() {
  modalLink.disabled = false;
  console.log(contenedorModal.clientHeight);
  setTimeout(() => {
    console.log(contenedorModal.clientHeight + " --modal");
    console.log(document.body.clientHeight + " --body");
    let heigthModal = contenedorModal.clientHeight;
    window.scrollBy(0, -window.scrollY);
    // el translate Y es -50vh - la mitad del alto del modal
    contenedorModal.style.top = `calc(${heigthModal / 2}px)`;
  }, 1000);
}
btnCloseModal.onclick = cerrarModal;
btnMenu.onclick = abrirModal;
// window.onsc}roll = () => {}
