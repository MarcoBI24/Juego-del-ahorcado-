const $ = (id)=>{return document.getElementById(id)};
const btnRetro = $("btn-retroceder")
btnRetro.onclick = ()=> {
    window.location = window.origin + "/"   + "index.html"
    
};
const btnMasModos = $("mas-modos")
const contenedorMasModos = $("contenedor-mas-modos");
btnMasModos.onclick = ()=> { 
     if (btnMasModos.dataset.open == "false") {
         contenedorMasModos.style.maxHeight = "400px"
         btnMasModos.dataset.open = "true"
         btnMasModos.childNodes[0].style.transform = "rotate(180deg)"
     }else { 
        contenedorMasModos.style.maxHeight = "0px"
        btnMasModos.dataset.open = "false"
        btnMasModos.childNodes[0].style.transform = "rotate(0deg)"
    
    }

    console.log(btnMasModos.childNodes[0]);    
}

