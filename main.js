let endpoint = "https://randomuser.me/api/";
let arrayOfPosts = [];
 let htmlStr = "";
const getPosts = () => {
    fetch(endpoint)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.results[0].picture.large);
        document.getElementById("pics").innerHTML=`<div><img src="${data.results[0].picture.large}"/><br/>
                                    ${data.results[0].name.last}, ${data.results[0].name.first}
                                    <br/>${data.results[0].dob.date}
                                    <br/>${data.results[0].location.country}</div>`;
      });
    }


// this function waits for the web page to be loaded, when it does it will run the code inside of it which happen to be getPosts()
window.onload = function() {
    getPosts()
    document.getElementById("pics").innerHTML=htmlStr;
  }