import IOS from "./ios.js";
var id;
function init(){
    document.querySelector('.submit').addEventListener("click", endQuestionary);
    id = window.location.search.substring(4);
}

function endQuestionary() {
    if (checkFinishedAllowed()) {
        let notedDif;
        for (let i = 0; i < 2; i++) {
            if (document.getElementById("notedDifrent").children[i].children[0].checked) {
                notedDif = i + 1;
            }
        }
        notedDif += ": " + document.getElementById("difrenceNoted").value;

        let notedDot;
        for (let i = 0; i < 3; i++) {
            if (document.getElementById("notedDot").children[i].children[0].checked) {
                notedDot = i + 1;
            }
        }

        let influenzed;
        for (let i = 0; i < 6; i++) {
            if (document.getElementById("influenzed").children[i].children[0].checked) {
                influenzed = i + 1;
            }
        }

        let credibleChangeGeneral;
        for (let i = 0; i < 7; i++) {
            if (document.getElementById("credibleChangeGeneral").children[i].children[0].checked) {
                credibleChangeGeneral = i + 1;
            }
        }

        let harderToRead;
        for (let i = 0; i < 5; i++) {
            if (document.getElementById("harderToRead").children[i].children[0].checked) {
                harderToRead = i + 1;
            }
        }

        let gender;
        for (let i = 0; i < 3; i++) {
            if (document.getElementById("gender").children[i].children[0].checked) {
                gender = i + 1;
            }
        }

        let age = document.getElementById("age").value;

        let profession = document.getElementById("prof").value;

        let langLevel;
        for (let i = 0; i < 5; i++) {
            if (document.getElementById("language").children[i].children[0].checked) {
                langLevel = i + 1;
            }
        }

        let matNummer = document.getElementById("matNummer").value;

        let matNummer = document.getElementById("matNummer").value;
        let course = document.getElementById("course").value; 
        let email = document.getElementById("mail").value;

        let jsonText = '{ "notedGramDiffrenze":"' + notedDif + '", "participantsNotedDots":"' + notedDot + '", "itInfluenzedPartizipants":"' + influenzed + '", "credibleChangeGeneral":"' + credibleChangeGeneral + '", "harderToRead":"' + harderToRead + '", "gender":"' + gender + '", "age":"' + age + '",  "profession":"' + profession + '","langLevel":"' + langLevel + '","matNummer":"' + matNummer + '","course":"' + course + '","email":"' + email + '"}';
        let jsonObjekt = JSON.parse(jsonText);
        //let jsonObjekt = jsonText;
        addToServer(jsonObjekt);
    }
    else {
        alert("Please fill in all required parts.");
    }
}

function addToServer(jsonObjekt) {
    let ios = new IOS(id);
    ios.writeData(jsonObjekt);
    alert("Thank you! If you want to, you can now close the page.");
}

function checkFinishedAllowed() {
    let requiredsDirect = document.querySelectorAll(".requiredDirect");
    let requireds = document.querySelectorAll(".required");

    for (let i = 0; i < requiredsDirect.length; i++) {
        if (requiredsDirect[i].value === "") {
            return false;
        }
    }

    for (let i = 0; i < requireds.length; i++) {
        let answerPossibilities = requireds[i].childNodes[1];
        let isQuestionAnswered = false;
        for (let j = 0; j < answerPossibilities.length; j++) {
            if (answerPossibilities[i].firstChild.checked) {
                isQuestionAnswered = true;
            }
        }
        if (!isQuestionAnswered) {
            return false;
        }
    }
}

init();