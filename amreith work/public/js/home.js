$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({animation: true});   
  });

document.getElementById("user-icon").onclick = function() {displayUser()};
function displayUser() {
    var element = document.getElementById("user-details");
    if(element.style.display == "none"){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
  }


const api_url="http://localhost:3000/getLink";
async function getLink(url){
    const response=await fetch(url,{
        headers: {
         "Content-Type": "application/json"
}
    });
    return response.json();

}

function showData(data){
    let template=` `
    data.forEach(element => {
        template+=` 
        <div class="card-suggestion">
        <img class="save-suggestion float-left" src="images/icons/home page/bookmark for card suggestion.svg">
        <img class="info-suggestion float-right" src="images/icons/home page/info.svg">
            <div class="card-info">
                <div class="card-d-1">${element.Department}</div>
                <div class="card-d-2 ">${element.SubjectName}</div>
                <div class="card-d-3 ">${element.Topic}</div>
            </div>
        </div>`

    });
    return template;
}

getLink(api_url)
       .then(data=>{
           const html=showData(data);
           document.getElementById("cardDetails").innerHTML = html;
       })
       .catch(err=>{
           console.log(err);
       })



