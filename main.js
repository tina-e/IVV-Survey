import IOS from "./ios.js";
import {generateRandoms, shuffle, generateSessionId} from "./randomizer.js";

var topicId = 0;
var remainingTopics= [0,1,2,3,4,5];
var resultDOMS = document.querySelectorAll('.result');
var likertScaleDOMS = document.querySelectorAll('.likert');
document.querySelector('.submit').addEventListener("click", next);
var ios;
var id;


var questions = ["Can convalescent plasma cure COVID-19?","Can exposure to UV light prevent COVID-19?", "Can high temperatures and humidity prevent COVID-19?",
"Can ACE and ARBs worsen COVID-19?","Can Homemade Vodka Sanitizer prevent COVID-19?","Can Echinacea prevent COVID-19?"];

function init(){
    id = generateSessionId()
    ios = new IOS(id);
    remainingTopics = shuffle(remainingTopics);
    
    //save topic order in filename sessionId
    ios.writeData(remainingTopics);
    refreshPage();
    
}

function goToEndQuestionary(){
    location.href = "http://127.0.0.1:5500/quest.html"+"?id="+id;
    
}

function buildSerp(){
    window.scroll(0,0);
    topicId = remainingTopics[0];
    remainingTopics = remainingTopics.splice(1,remainingTopics.length);

    let randoms = generateRandoms();
    let text = ios.getData(topicId);
    ios.writeData(topicId);
    ios.writeData(randoms[0]);
    ios.writeData(randoms[1]);

    //Save randoms
    let serpTexts = []
    for(let i = 0; i < randoms[0].length;i++){
        let index = randoms[0][i];
        if(randoms[1].includes(index)){ //if the current picked object is in the baseline array
            serpTexts[i] = text[index+8].substring(0, text[index+8].length-1);
        }else{
            serpTexts[i] = text[index].substring(0, text[index].length-1);
        }
    }
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
        if(remainingTopics.length == 0){
            goToEndQuestionary();
        }else{
            refreshPage();
        }

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
    
    document.querySelector('.progress').innerHTML = 6- remainingTopics.length + " / 6";
    document.querySelector('.gLFyf').value = questions[topicId];
    //todo: fill searchbar with new content
}



init();
