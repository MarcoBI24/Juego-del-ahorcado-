const users = JSON.parse(localStorage.getItem("usuarios"));
let USER = {
  nombre: null,
};
if (users !== null) {
  users.forEach((user) => {
    if (user.logeado === true) {
      USER = user;
    }
  });
}
console.log(USER);
 export default { USER };
