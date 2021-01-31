function init(){
    document.querySelector('.submit').addEventListener("click", endQuestionary);
}

function endQuestionary(){

    let gender;
    for (let i = 0; i < 3; i++) {
        if(document.getElementById("gender").children[i].children[0].checked){
            gender = i+1;
        }  
    }

    let age = document.getElementById("age").value;

    let profession = document.getElementById("prof").value;

    let langLevel;
    for (let i = 0; i < 5; i++) {
        if(document.getElementById("language").children[i].children[0].checked){
            langLevel = i+1;
        }  
    }

    let matNummer = document.getElementById("matNummer").value;
    
    let email = document.getElementById("mail").value; 

    let jsonText = '{ "gender":"' + gender + '", "age":"' + age + '",  "profession":"' + profession + '","langLevel":"' + langLevel + '","matNummer":"' + matNummer + '","email":"' + email + '"}';
    let jsonObjekt = JSON.parse(jsonText);
    addToServer(jsonObjekt);
}

function addToServer(jsonObjekt){
    console.log(jsonObjekt);
}

init();