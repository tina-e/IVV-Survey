import IOS from "./ios.js";
import {generateRandoms, shuffle, generateSessionId} from "./randomizer.js";

var sessionId;
var topicId = 0;
var remainingTopics= [0,1,2,3,4,5];
var resultDOMS = document.querySelectorAll('.result');
var likertScaleDOMS = document.querySelectorAll('.likert');
document.querySelector('.submit').addEventListener("click", next);
var ios;



function init(){
    ios = new IOS(generateSessionId());
    remainingTopics = shuffle(remainingTopics);
    
    //save topic order in filename sessionId
    ios.writeData(remainingTopics);
    refreshPage();
    
}

function buildSerp(){
    topicId = remainingTopics[0];
    topicId = 0; //Temporary

    remainingTopics = remainingTopics.splice(1,remainingTopics.length);

    let randoms = generateRandoms();
    let text = ios.getData(topicId);
    ios.writeData(topicId);
    ios.writeData(randoms[0]);
    ios.writeData(randoms[1]);

    //Save randoms
    let serpTexts = []
    for(let i = 0; i < randoms[0].length;i++){
        if(randoms[1].includes(randoms[0][i])){ //if the current picked object is in the baseline array
            serpTexts[i] = text[randoms[0][i]+8].substring(0, text[randoms[0][i]+8].length-2);
        }else{
            serpTexts[i] = "-----";
            serpTexts[i] = serpTexts[i]+ text[randoms[0][i]].substring(0, text[randoms[0][i]].length-2);
        }
    }
    console.log(serpTexts);
    return serpTexts;
}


/**
 * writes content for snippet
 * @param {int} num index of result
 * @param {String} content 
 */
function writeElem (num, content) {
    resultDOMS[num].innerHTML = content;
}

/**
 * returns number of clicked likert-scale-element
 * @param {int} num index of result
 */
function getLikertToResult (num) {
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
    ios.writeData(data);
    //console.log("data saved:" + data);
}

/**
 * clear likerts
 * update progress
 * update snippets depending on topicId
 */
function refreshPage(){
    let texts = buildSerp();
    for(let i = 0; i < texts.length;i++){
        writeElem(i, texts[i]);
    }
    likertScaleDOMS.forEach(element => {
        for(let i = 1; i < 10; i+=2){
            let likertLevel = element.childNodes[i].childNodes[1];
            likertLevel.checked = false;
        }
    });
    
    document.querySelector('.progress').innerHTML = 6- remainingTopics.length + " / 6"; //todo: topicId startet bei 0? -> +1 draufrechnen
    
    //todo: fill searchbar with new content
    //todo: fill snipptes with new content
}



init();
