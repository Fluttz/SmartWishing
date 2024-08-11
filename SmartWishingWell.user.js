// ==UserScript==
// @name         Smart Wishing Well Autofill
// @version      1.0
// @description  Wish for the most popular wish
// @author       Flutterz
// @match        https://www.neopets.com/wishing.phtml*
// @grant        none
// ==/UserScript==

let begin = false;
let countCells = document.querySelectorAll('td:nth-child(3)');
let prizeTrack = [[],[]];
let donateBox = document.getElementsByName("donation")[0];
let wishBox = document.getElementsByName("wish")[0];
for (let i = 0; i<countCells.length;i++){
    if (!begin){
        if (countCells[i].innerText=="Got a...") begin = true;
    } else {
        if (!countCells[i].outerHTML.includes("align=\"center")){
            break;
        }
        else {
            if (!prizeTrack[0].includes(countCells[i].innerText)){
                prizeTrack[0].push(countCells[i].innerText);
                prizeTrack[1].push(1);
            } else {
                prizeTrack[1][prizeTrack[0].indexOf(countCells[i].innerText)]++;
            }
        }
    }
}
let maxWishes = 0;
let maxId = 0;
for (let i = 0; i<prizeTrack[0].length; i++){
    if (maxWishes < prizeTrack[1][i]){
        maxWishes = prizeTrack[1][i];
        maxId = i;
    }
}

donateBox.value = 21;
wishBox.value = prizeTrack[0][maxId];
