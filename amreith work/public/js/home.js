function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  
$(function(){
    $('[data-tooltip').tooltip({placement:'bottom'});
  });






// document.getElementById("user-icon").onclick = function() {displayUser()};
// function displayUser() {
//     var element = document.getElementById("user-details");
//     if(element.style.display == "none"){
//         element.style.display = "block";
//     }
//     else{
//         element.style.display = "none";
//     }
//   }

//import Http from './Http';
const linkData=new Http;
const api_url="http://localhost:3000/getLink";
linkData.get(api_url)
         .then(data=>{
           const html=showData(data);
           document.getElementById("cardDetails").innerHTML = html;
       })
       .catch(err=>{
           console.log(err);
       });
// async function getLink(url){
//     const response=await fetch(url,{
//         headers: {
//          "Content-Type": "application/json"
// }
//     });
//     return response.json();

// }

function showData(data){
    let template=` `   
    data.forEach(element => {
        template+=` 
        <div class="card-suggestion" id="${element._id}">
        <i class="save-suggestion float-left la la-bookmark" id="saved"></i>
        <i class="las la-ban save-suggestion float-right" id="report"></i>
        <i class="info-suggestion float-right las la-info-circle" id="info"></i>
            <a href="${element.Link}" target="_blank"><div class="card-info">
                ${element.Department}<br>
                ${element.SubjectName}<br>
                ${element.Topic}
            </div>
            </a>
        </div>`

    });
    return template;
}



// getLink(api_url)
//        .then(data=>{
//            const html=showData(data);
//            document.getElementById("cardDetails").innerHTML = html;
//        })
//        .catch(err=>{
//            console.log(err);
//        })

const user_api="http://localhost:3000/userDetails";
const userData=new Http;
userData.get(user_api)
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
    <a>Email: ${data.email}</a>
    <a>Others</a>
    <hr class="just-line d-none d-sm-block">
    <a href="http://localhost:3000/logout">SignOut</a> `
    }
    document.getElementById("user-login-data").innerHTML = template2;
})

// .catch(err=>{
//     console.log(err);
// })
         
// async function getUser(url){
//     const response=await fetch(url,{
//         headers: {
//          "Content-Type": "application/json"
// }
//     });
//     return response.json();

// }
// getUser(user_api)
//        .then(data=>{
//            console.log(data)
//            let template2 =` `
//            if(data.status==="Please sign-in to use"){
            
//             template2 = `<div>Want perks of Get-Linked?</div>
//             <a href="SignIn.html">Log-In</a>`
//            }
//            else{
//            template2=` <div><img class="profile-pic" src="${data.image}"></div>
//            <a>${data.displayName}</a>
//            <a>Email</a>
//            <a>Others</a>
//            <hr class="just-line d-none d-sm-block">
//            <a href="http://localhost:3000/logout">SignOut</a> `
//            }
//            document.getElementById("user-details").innerHTML = template2;
//        })
       
//        .catch(err=>{
//            console.log(err);
//        })

// $(document).ready(function () {
    
//     $("#search-box").autocomplete({
//         source: async function(request, response) {
//             $.ajax({
//                 url: "/search",
//                 dataType: "json",
//                 data: "topic=" + request.term,
//                 success: function (data) {
                    
//                     $("#cardDetails").empty();
//                     let template=``
//                     data.forEach(element =>{
//                         template+=`
//                         <div class="card-suggestion">
//                         <i class="save-suggestion float-left la la-bookmark" id="saved"></i>
//                         <i class="info-suggestion float-right las la-info-circle" id="info"></i>
//                             <a href="${element.Link}" target="_blank"><div class="card-info">
//                                 ${element.Department}<br>
//                                 ${element.SubjectName}<br>
//                                 ${element.Topic}
//                             </div>
//                             </a>
//                         </div>`   
//                     })
//                     document.getElementById("cardDetails").innerHTML = template;
//                     // response($.map(data, function (item) {
//                     //     console.log(item);
//                     //     return {
//                     //         label: item.Topic,
//                     //         value: item.Topic,
//                     //         id:item._id
//                     //     };
//                     // }));
    
//                 console.log(data);
//                 }});

//             // console.log($(request.term));
//             // let data = await fetch(`http://localhost:3000/search?topic=${request.term}`)
//             //     .then(results =>{
//             //         console.log(results);
//             //         results.json()
//             //     })
//             //     .then(results =>
//             //          results.map(result => {
//             //         return { label: result.Topic, value: result.Topic, id: result._id };
//             //     }));
//             // console.log(data);
//             // response(data);
        
// },
//         minLength: 2,
//         select: function(event, ui) 
//         {
//             $.ajax({
//                 url: `/getLink/${ui.item.id}`,
//                 dataType: "json",
//                 // data: "/" + request.term,
//                 success: function (data) {
//                     // response($.map(data, function (item) {
//                     //     console.log(item);
//                     //     return {
//                     //         label: item.Topic,
//                     //         value: item.Topic,
//                     //         id:item._id
//                     //     };
//                     // }));
    
//                 console.log(data);
//                 }});
//         //     fetch(`http://localhost:3000/getLink/${ui.item.id}`)
//         //         .then(result =>{
//         //             console.log(result);
//         //          })
//         //         .then(result => {
//         //             $("#cardDetails").empty();
//         //             result.forEach(Topic => {
//         //                 $("#search-result").append(`<li>${Topic}</li>`);
//         //             });
//         //         });
//         }
//     });

// })

$(document).ready(function () {
    console.log($( "#searchby" ).val())

function displayVals() {
    var singleValues = $( "#searchby" ).val();
    var dep= $( "#Department1" ).val() 
   console.log(singleValues);
   console.log(dep);
    
 
    if ($( "#Department1" ).val()=="topic"){
        
    $("#search-box").autocomplete({
        
        source: async function(request, response) {
            $.ajax({
                url: "/searchbytopic",
                dataType: "json",
                data: "topic=" + request.term +"&&department="+dep,
               
                success: function (data) {
                    
                    
                    $("#cardDetails").empty();
                    let template=``
                    data.forEach(element =>{
                        template+=`
                        <div class="card-suggestion" id="${element._id}">
                        <i class="save-suggestion float-left la la-bookmark" id="saved"></i>
                        <i class="info-suggestion float-right las la-info-circle" id="info"></i>
                            <a href="${element.Link}" target="_blank"><div class="card-info">
                                ${element.Department}<br>
                                ${element.SubjectName}<br>
                                ${element.Topic}
                            </div>
                            </a>
                        </div>`   
                    })
                    document.getElementById("cardDetails").innerHTML = template;
                    // response($.map(data, function (item) {
                    //     console.log(item);
                    //     return {
                    //         label: item.Topic,
                    //         value: item.Topic,
                    //         id:item._id
                    //     };
                    // }));
    
                console.log(data);
                }});

            // console.log($(request.term));
            // let data = await fetch(`http://localhost:3000/search?topic=${request.term}`)
            //     .then(results =>{
            //         console.log(results);
            //         results.json()
            //     })
            //     .then(results =>
            //          results.map(result => {
            //         return { label: result.Topic, value: result.Topic, id: result._id };
            //     }));
            // console.log(data);
            // response(data);
        
},
        minLength: 2,
        select: function(event, ui) 
        {
            $.ajax({
                url: `/getLink/${ui.item.id}`,
                dataType: "json",
                // data: "/" + request.term,
                success: function (data) {
                    // response($.map(data, function (item) {
                    //     console.log(item);
                    //     return {
                    //         label: item.Topic,
                    //         value: item.Topic,
                    //         id:item._id
                    //     };
                    // }));
    
                console.log(data);
                }});
        //     fetch(`http://localhost:3000/getLink/${ui.item.id}`)
        //         .then(result =>{
        //             console.log(result);
        //          })
        //         .then(result => {
        //             $("#cardDetails").empty();
        //             result.forEach(Topic => {
        //                 $("#search-result").append(`<li>${Topic}</li>`);
        //             });
        //         });
        }
    });
    }
    else if($( "#Department2" ).val()=="subjectname"){
    $("#search-box").autocomplete({
        
        source: async function(request, response) {
            $.ajax({
                url: "/searchbysubjectname",
                dataType: "json",
                data: "subjectname=" + request.term,
                success: function (data) {
                    
                    
                    $("#cardDetails").empty();
                    let template=``
                    data.forEach(element =>{
                        template+=`
                        <div class="card-suggestion">
                        <i class="save-suggestion float-left la la-bookmark" id="saved"></i>
                        <i class="info-suggestion float-right las la-info-circle" id="info"></i>
                            <a href="${element.Link}" target="_blank"><div class="card-info">
                                ${element.Department}<br>
                                ${element.SubjectName}<br>
                                ${element.Topic}
                            </div>
                            </a>
                        </div>`   
                    })
                    document.getElementById("cardDetails").innerHTML = template;
                    // response($.map(data, function (item) {
                    //     console.log(item);
                    //     return {
                    //         label: item.Topic,
                    //         value: item.Topic,
                    //         id:item._id
                    //     };
                    // }));
    
                console.log(data);
                }});

            // console.log($(request.term));
            // let data = await fetch(`http://localhost:3000/search?topic=${request.term}`)
            //     .then(results =>{
            //         console.log(results);
            //         results.json()
            //     })
            //     .then(results =>
            //          results.map(result => {
            //         return { label: result.Topic, value: result.Topic, id: result._id };
            //     }));
            // console.log(data);
            // response(data);
        
},
        minLength: 2,
        select: function(event, ui) 
        {
            $.ajax({
                url: `/getLink/${ui.item.id}`,
                dataType: "json",
                // data: "/" + request.term,
                success: function (data) {
                    // response($.map(data, function (item) {
                    //     console.log(item);
                    //     return {
                    //         label: item.Topic,
                    //         value: item.Topic,
                    //         id:item._id
                    //     };
                    // }));
    
                console.log(data);
                }});
        //     fetch(`http://localhost:3000/getLink/${ui.item.id}`)
        //         .then(result =>{
        //             console.log(result);
        //          })
        //         .then(result => {
        //             $("#cardDetails").empty();
        //             result.forEach(Topic => {
        //                 $("#search-result").append(`<li>${Topic}</li>`);
        //             });
        //         });
        }
    });
}}
$( "select" ).change( displayVals );
displayVals();
})


