// ==UserScript==
// @name         Smart Wishing Well Autofill
// @version      1.1
// @description  Wish for the most popular wish
// @author       Flutterz
// @match        https://www.neopets.com/wishing.phtml*
// @grant        none
// ==/UserScript==


//If instead of using the most popular wish you want to wish for a specific item, change this variable to the item's name
const OVERRIDE = "";

let wishesText = $('.content center>b');
let wishesMade = 0;

if (wishesText[wishesText.length-1].innerText.includes("Wish Count")){
    wishesMade = Number(wishesText[wishesText.length-1].innerText.substring(12));
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
    if (OVERRIDE == ""){
        wishBox.value = prizeTrack[0][maxId];
    } else {
        wishBox.value = OVERRIDE;
    }
    let button = $('td>input[type=submit]');
    button[0].onclick = function(){
        wishesMade++;
        wishesText[wishesText.length-1].innerText = "Wish Count: "+wishesMade;
    };
}
