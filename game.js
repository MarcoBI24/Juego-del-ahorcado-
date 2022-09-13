let btns = document.querySelectorAll(".tecla")
console.log(btns);
btns.forEach(btn => {
    btn.onclick = (e)=>{
        console.log(e);
        console.log(btn.value);
    } 
});