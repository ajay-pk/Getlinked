$(function(){
    $('[data-tooltip').tooltip({placement:'bottom'});
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
                <div class="card-d-1"><b>${element.Department}</b></div>
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

const user_api="http://localhost:3000/userDetails";
async function getUser(url){
    const response=await fetch(url,{
        headers: {
         "Content-Type": "application/json"
}
    });
    return response.json();

}
getUser(user_api)
       .then(data=>{
           console.log(data)
           let template2 =` `
           if(data.status==="Please sign-in to use"){
            
            template2 = `<div>Want perks of Get-Linked?</div>
            <a href="SignIn.html">Log-In</a>`
           }
           else{
           template2=` <div><img class="profile-pic" src="${data.image}"></div>
           <a>${data.displayName}</a>
           <a>Email</a>
           <a>Others</a>
           <hr class="just-line d-none d-sm-block">
           <a href="http://localhost:3000/logout">SignOut</a> `
           }
           document.getElementById("user-details").innerHTML = template2;
       })
       
       .catch(err=>{
           console.log(err);
       })

