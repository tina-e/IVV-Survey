function init(){
    document.querySelector('.submit').addEventListener("click", endQuestionary);
}

function endQuestionary(){

    let gender;
    for (let i = 0; i < 3; i++) {
        if(document.getElementById("gender").children[0].children[0].checked){
            gender = i;
        }  
    }

    let age = document.getElementById("age").value;

    console.log(gen);
}









init();