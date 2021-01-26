var topicId = 0;
var resultDOMS = document.querySelectorAll('.result');
var likertScaleDOMS = document.querySelectorAll('.likert');
document.querySelector('.submit').addEventListener("click", next);

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
        if(likertLevel.checked){
            return numClickedLikert;
        }
        numClickedLikert++;
    }
    return -1;
}

/** returns array of all chosen likert-levels */
function next(){
    let likerts = [];
    for(let i = 0; i < 8; i++){
        likerts[i] = getLikertToResult(i);
    }

    if(!likerts.includes(-1)){
        topicId++;
        saveData(likerts);
        refreshPage();
    } else {
        alert("Please complete all questions.");
    }
}

/**
 * saves data (in json)
 * @param {array} data array of likert-scale levels 
 */
function saveData(data){
    console.log("data saved:" + data);
}

/**
 * clear likerts
 * update progress
 * update snippets depending on topicId
 */
function refreshPage(){
    likertScaleDOMS.forEach(element => {
        for(let i = 1; i < 10; i+=2){
            let likertLevel = element.childNodes[i].childNodes[1];
            likertLevel.checked = false;
        }
    });

    document.querySelector('.progress').innerHTML = topicId + " / 8"; //todo: topicId startet bei 0? -> +1 draufrechnen
    
    //todo: fill searchbar with new content
    //todo: fill snipptes with new content
}
