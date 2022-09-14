let btns = document.querySelectorAll(".tecla")
btns[0].onmouseover = () => {   console.log("mouseover") }
console.log(btns);
window.onkeydown = (e) => {
    let teclaPulsada = e.key
    console.log(teclaPulsada);
    btns.forEach(btn => {
        if (btn.value == teclaPulsada) {
            console.log("pulsaste la tecla " + btn)
            console.log(btn);

                const eventHover = new Event("click");
            console.log(eventHover);
            btn.dispatchEvent(eventHover);
        }
    });
};