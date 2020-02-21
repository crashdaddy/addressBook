///////////////////////////////
//
// Setup global variables
//

// default url with no parameters selected
let endpoint = "https://randomuser.me/api/?results=105";
// the array where we're going to store the results
let arrayOfPeople = [];

//////////////////////////////
//
// Code to retrieve data
//
const getPosts = (endpoint) => {
  // clear out any present data
  arrayOfPeople=[];
    // call the API, get a response
    fetch(endpoint)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        // store the results in our local array
        arrayOfPeople = data;
        // erase any previous data from the HTML interface
        document.getElementById("data").innerHTML = "";
        // show the goods
        displayOutput(arrayOfPeople);
      });
    }

    
/////////////////////////
//
//  Helper Functions
//

// this goes through and resets all the pictures' original
// opacity when the user clicks a different picture
function fadePix(){
  let nodes = document.getElementById('pics').getElementsByTagName("img"); 
  for(var i=0; i<nodes.length; i++) { 
    nodes[i].style.opacity = ".5"; 
  }
}

// this function highlights the clicked image by setting its opacity to 100%
// then prints that person's information to the data div
function showPerson(divID, personID){
  let dataText = "";
  // fade all the other pics
  fadePix();
  // highlight the one that the user clicked on
  document.getElementById(divID).children[0].style.opacity="1";
  // find that person in our array
  let person = arrayOfPeople.results[personID];
  // convert their DOB into a prettier format
  let dobStr = person.dob.date.split("T")[0];
  // generate what the data will look like when output
  dataText += `<h1>${person.name.last}, ${person.name.first}</h1>
              <br/><span id="blueText">DOB: </span>${dobStr}
              <p><span id="blueText">Contact: </span>
              <br/>${person.location.street.number}&nbsp;${person.location.street.name}
              <br/>${person.location.city},&nbsp;${person.location.state}&nbsp${person.location.country}
              <p><span id="blueText">Phone: </span>${person.phone}
              <br/><span id="blueText">Cell: </span>${person.cell}
              <br><span id="blueText">email: </span>${person.email}
              </div>`;
  // show the data in the data div
  document.getElementById("data").innerHTML = dataText;
 }


 // This function prints all the images to the screen and sets them up
 // so that when they're clicked they will respond by highlighting
 // the clicked image and printing that person's data

function displayOutput(arrayOfPeople){
  let faces = arrayOfPeople;
  // first clear them all out (which we could just append more to the end if we wanted to)
  document.getElementById("pics").innerHTML="";
  // print the new batch of faces
  for (let i = 0;i<faces.results.length;i++){
  document.getElementById("pics").innerHTML+=`<div id="img-${i}" style="float:left;border: 1px solid black;" onclick="showPerson('img-${i}',${i});" ><img src="${faces.results[i].picture.large}" style="opacity:.5;"/>`;
 }   
}

// called when the user changes the "gender" pulldown
function handleGenderChange(e) {
  // add the new search parameter to the API url
  endpoint = endpoint + "&gender=" + e.target.value;
  // refresh the data with the new parameter
  getPosts(endpoint)
}

// called when the user changes the "country" pulldown
function handleCountryChange(e) {
  // add the new country parameter to the API url
  endpoint = endpoint + "&nat=" + e.target.value;
  // refresh the data with the new parameter
  getPosts(endpoint);
}

////////////////////////////////
//
//   Startup
//


// this function waits for the web page to be loaded, when it does it will run the code inside of it which 
// happen to be getPosts()
window.onload = function() {
  
  // attach an event handler to the gender and country pulldowns
  let genderSelector = document.querySelector('select');
  genderSelector.onchange = handleGenderChange;
  let countrySelector = document.querySelector(".nat");
  countrySelector.onchange = handleCountryChange;

  // load dat data!
  getPosts(endpoint);
  }

  