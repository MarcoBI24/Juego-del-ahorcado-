const btnVolver = document.getElementById("btn-volver");
const usuarios = JSON.parse(localStorage.getItem("usuarios"));
let usuario = {};
console.log(usuarios);
if (usuarios == null) {
  // aqui podria poner una alerta que ningun usuario se ha registrado
  // y tambien podria ponerse cuando non encuentra un usuario logeado
}
usuarios.forEach((user) => {
  if (user.logeado === true) {
    usuario = user;
    console.log(usuario);
  }
});
const spanNumero = document.getElementById("numero");
const spanCorreo = document.getElementById("correo");
spanNumero.innerHTML = usuario.numero;
spanCorreo.innerHTML = usuario.correo;

btnVolver.onclick = () => {
  // console.log(location)
  window.location.href = location.origin + "/public/";
};
