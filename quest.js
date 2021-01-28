function init(){
    document.querySelector('.submit').addEventListener("click", endQuestionary);
}

function endQuestionary(){

    let gender;
    for (let i = 0; i < 3; i++) {
        if(document.getElementById("gender").children[i].children[0].checked){
            gender = i;
        }  
    }

    let age = document.getElementById("age").value;

    let jsonText = '{ "gender":"' + gender + '", "age":"' + age + '"  }';
    let jsonObjekt = JSON.parse(jsonText);
    addToServer(jsonObjekt);
}

function addToServer(jsonObjekt){
    console.log(jsonObjekt);
}









init();