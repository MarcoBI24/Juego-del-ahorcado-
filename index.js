const $ = (id)=>{return document.getElementById(id)};
const btnStart = $("start-game")
const btnAddWord = $("add-word")
btnStart.onclick = ()=>{
    location.href = "./elegirModo.html"
}
btnAddWord.onclick = ()=>{
    location.href = "./addWord.html"
}
