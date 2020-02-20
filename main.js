let endpoint = "https://randomuser.me/api/?results=100";
let arrayOfPeople = [];

 let htmlStr = "";
const getPosts = () => {
    fetch(endpoint)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        arrayOfPeople = data;
        displayOutput(arrayOfPeople);
      });
    }

function fadePix(){
  let nodes = document.getElementById('pics').getElementsByTagName("img"); 
  for(var i=0; i<nodes.length; i++) { 
    nodes[i].style.opacity = ".5"; 
  }
}

function showPerson(divID, personID){
  let dataText = "";
  fadePix();
  document.getElementById(divID).children[0].style.opacity="1";
  let person = arrayOfPeople.results[personID];
  let dobStr = person.dob.date.split("T")[0];
  dataText += `<h1>${person.name.last}, ${person.name.first}</h1>
              <br/>${dobStr}
              <br/>${person.location.country}</div>`;
  document.getElementById("data").innerHTML = dataText;
}

function displayOutput(arrayOfPeople){
  let faces = arrayOfPeople;
  
  for (let i = 0;i<faces.results.length;i++){
  document.getElementById("pics").innerHTML+=`<div id="img-${i}" style="float:left;" onclick="showPerson('img-${i}',${i});" ><img src="${faces.results[i].picture.large}" style="opacity:.5;"/>`;
                             
  }
   
}

// this function waits for the web page to be loaded, when it does it will run the code inside of it which happen to be getPosts()
window.onload = function() {
  getPosts()
  }

  