

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
  
  constructor(sessionId){
    this.sessionId = sessionId;
    this.data = loadFile("http://127.0.0.1:5500/data.txt").split("\n");
  }
  
  /**
   * resturns correspronding documents for given ids
   * @param {Array} index list with chosen documents
   */
  getData(index){
    let returnData = this.data.slice(index*16, index*16 + 16);
    //console.log(returnData);
    return returnData;
  }

  writeData(data){
    console.log(this.sessionId + " sent to server: " + data)

    //var s = CreateTextFile("http://127.0.0.1:5500/logs/"+filename, true);
  }
}

