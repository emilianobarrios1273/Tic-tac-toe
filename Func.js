const cell = document.querySelectorAll(".cell");
const stattxt = document.getElementById("stattxt");
const reset = document.getElementById("reset"); 
const gifs = ["Donqi","Faust", "greg", "Heathcliff", "Hong-lu", "Ishmael", "meursault", "outis", "Rodya", "Ryoshu", "Sink-Layer",
              "YiSang", "LOLANG", "Gaygela", "angela21","binah","malkuth","hod","squid-game-oh-my-hod","Tiphereth","netzach","agnes",
              "kjh1", "kjh-cinema","BongBong","BongBong2","kjh-throbber","kjh-limit","Boogiegela","Boogiegela2","hodpet","ring","zena",
              "zena2","umazing","tamamo-cross","boom" ]
const wincon = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
 ];
 let options = ["","","","","","","","",""]
 let activeplayer = "1";
 let activeplayerimg1 = ""
let activeplayerimg2 = ""
let playerchooser = 0
let on = false
let name1 = "1"
let name2 = "2"
let Currentname = ""
let save = document.getElementById("save")
save.addEventListener("click",saver)

function saver(){
restart()
 name1 = document.getElementById("p1N").value
 name2 = document.getElementById("p2N").value
 console.log(name1,name2)
}


 const Imgs = [];

 function generateRandomNumber(min, max) {
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    return number;
}

 function gifpick(){
    let gifnum = generateRandomNumber(0, gifs.length-1)  
    let gifnum2 = 0  
    activeplayerimg1 = "ImageAssets/"+gifs[gifnum] + ".gif"
    
    while (true){
    gifnum2 = generateRandomNumber(0, gifs.length-1) 
    if (gifnum != gifnum2){
        activeplayerimg2 = "ImageAssets/"+gifs[gifnum2] + ".gif"
        break;}
    }    
    
    console.log(activeplayerimg1)
    console.log(activeplayerimg2)


 }

 function startgame(){
    gifpick()
    playerchangename()
    
    cell.forEach(cell => cell.addEventListener("click",cellclick));
    reset.addEventListener("click",restart);
    stattxt.textContent = `Player ${Currentname}'s turn`;
    on = true
 }
 function cellclick(){

    const cellindex = this.getAttribute("cellindex");
    if(options[cellindex] !="" || !on){
        return;
    }
     
    cellchange(this, cellindex)
    checkwin()
    

 }
function cellchange(cell, index){
    options[index] = activeplayer
    console.log(cell.children[0])
    

    if (activeplayer=="1"){
        cell.children[0].src=activeplayerimg1
    }
    else{
        cell.children[0].src=activeplayerimg2
    }
}

 function playerchange(){
    activeplayer = (activeplayer == "1") ? "2" : "1";
        
 }
function playerchangename(){
    Currentname = (Currentname == name1) ? name2 : name1;
    stattxt.textContent = `Player ${Currentname}'s turn`
}
 function checkwin(){
let roundWon = false;

    for(let i = 0; i < wincon.length; i++){
        const condition = wincon[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        console.log(cellA)

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        stattxt.textContent = `Player ${Currentname} wins!`
        on = false;
    }
    else if(!options.includes("")){
        stattxt.textContent = `Draw!`
        on = false;
    }
    else{
        playerchange();
        playerchangename()
    }
 }
 function restart(){
    gifpick()
    playerchangename()
    activeplayer="1";
    options = ["","","","","","","","",""];
    stattxt.textContent = `Player ${Currentname}'s turn`
    cell.forEach(cell => cell.children[0].src = "")
    on = true
 }

startgame()
