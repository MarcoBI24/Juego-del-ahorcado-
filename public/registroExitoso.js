// Este script verifica que haya un uusario logeado y que cuando se registre el nuevo usuario lo rediriga a la pagina de registroExitoso }
//  solo acepta cuando un usuario este logeado ya que cuando no esta logeado dara un aviso de error 





const btnVolver = document.getElementById("btn-volver");
const usuarios = JSON.parse(localStorage.getItem("usuarios"));
console.log(usuarios);
let usuario = {};
let estado = false;
if (usuarios !== null) {
  // aqui podria poner una alerta que ningun usuario se ha registrado
  // y tambien podria ponerse cuando non encuentra un usuario logeado
  usuarios.forEach((user) => {
    if (user.logeado === true) {
      usuario = user;
      console.log(usuario);
      estado = true;
    }
  });
}
window.onload = () => {
  crearMensaje(estado);
};

btnVolver.onclick = () => {
  // console.log(location)
  window.location.href = location.origin;
};

function crearMensaje(estado) {
  const body = document.getElementById("body-modal");
  const titulo = document.getElementById("titulo");
  switch (estado) {
    case false:
      body.innerHTML = `<p class="mensajes">No se ha encontrado ningun usuario registrado o logeado.</p><br><strong>Registrese.</strong>`;
      titulo.innerHTML = "REGISTRO INVÁLIDO";
      break;
    case true:
      body.innerHTML = `<p class="mensajes">Se ha enviado un mensaje al número <strong>${usuario.numero}</strong> para activar
      el bot del
      juego.</p>
      <p class="mensajes">Se ha enviado un mensaje al correo <strong>${usuario.correo}</strong>.</p>`;
      titulo.innerHTML = "REGISTRO EXITOSO";
      break;
    default:
      break;
  }
}
