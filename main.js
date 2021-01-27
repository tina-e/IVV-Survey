var resultDOMS = document.querySelectorAll('.result');
var likertScaleDOMS = document.querySelectorAll('.likert');
document.querySelector('.submit').addEventListener("click", getAllLikerts);

/**
 * writes content for snippet
 * @param {int} num index of result
 * @param {String} content 
 */
function writeElem(num, content){
    resultDOMS[num].innerHTML = content;
}

/**
 * returns number of clicked likert-scale-element
 * @param {int} num index of result
 */
function getLikertToResult(num){
    let scaleElem = likertScaleDOMS[num];
    let numClickedLikert = 0;

    for(let i = 1; i < 10; i+=2){
        let likertLevel = scaleElem.childNodes[i].childNodes[1];
        console.log(scaleElem.childNodes[i].childNodes[1]);
        if(likertLevel.checked){
            return numClickedLikert;
        }
        numClickedLikert++;
    }
    return -1;
}

/** returns array of all chosen likert-levels */
function getAllLikerts(){
    let likerts = [];
    for(let i = 0; i < 8; i++){
        likerts[i] = getLikertToResult(i);
    }
    if(!likerts.includes(-1)){
        console.log(likerts);
        return likerts;
    } else {
        alert("Please complete all questions.");
    }
}