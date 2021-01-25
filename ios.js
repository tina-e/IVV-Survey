

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText)
                return allText;
            }
        }
    }
    //rawFile.send(null);
}


function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}


export default class IOS{
  
  constructor(){ 
    //this.data = loadFile("file:///C:/Users/Student/Desktop/IVV/IVV-Survey/data.txt")
    //this.data = readTextFile("data.txt")
    this.data = loadFile("http://127.0.0.1:5500/data.txt")
    console.log("con done")
  }
  
  /**
   * resturns correspronding documents for given ids
   * @param {Array} index list with chosen documents
   */
  getData(index){
    //return "Test data"
    let returnData = this.data.split("\n")
    
    return returnData.splice(index*16, index*16 + 16);
  }
}