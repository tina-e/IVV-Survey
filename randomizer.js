function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
  

export default function generateRandoms(){
    let arrBaseline = [0,1,2,3,4,5,6,7];
    arrBaseline = shuffle(arrBaseline);
    arrBaseline = arrBaseline.splice(0, arrBaseline.length/2);

    let arrOrder = [0,1,2,3,4,5,6,7];
    arrOrder = shuffle(arrOrder);
    return [arrOrder, arrBaseline]
}

//export default {generateRandoms};