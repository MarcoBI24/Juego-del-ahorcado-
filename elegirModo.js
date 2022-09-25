const $ = (id)=>{return document.getElementById(id)};
const btnRetro = $("btn-retroceder")
btnRetro.onclick = ()=> {
    window.location = window.origin + "/"   + "index.html"
    
};