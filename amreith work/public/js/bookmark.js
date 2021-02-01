const bookmark_api="http://localhost:3000/Bookmarks";
const bookmarks=new Http;
const uploaded_api="http://localhost:3000/Your-Bookmarks";
const uploaded=new Http;
bookmarks.get(bookmark_api)
    .then(Data=>{
        console.log(Data)
        let template=``
        Data.forEach(element => {
        if(element.LinkType==="video"){
        template+=`
        <div class="saved-cards" href="${element.Link}" target="_blank">
            <div class="saved-image">
            <img src="../images/bookmarks/video.svg">
            </div>
            <a href="${element.Link}"><b>${element.Topic}</b></a><br>
            <a href="${element.Link}">${element.SubjectName}</a>
        </div>
        `
        }
        })
        document.getElementById("saved-body-saved").innerHTML = template;
    })
    .catch(err=>{
        console.log(err)
    })

uploaded.get(uploaded_api)
    .then(Data=>{
        console.log(Data)
        let template=``
        Data.forEach(element=>{
        if(element.LinkType==="video"){
            template+=`
            <div class="saved-cards" href="${element.Link}" target="_blank">
                <div class="saved-image">
                <img src="../images/bookmarks/video.svg">
                </div>
                <a href="${element.Link}"><b>${element.Topic}</b></a><br>
                <a href="${element.Link}">${element.SubjectName}</a>
            </div>
            `
            }
        })
            document.getElementById("saved-body-your").innerHTML = template;
        })
        .catch(err=>{
            console.log(err)
    })


$(document).ready(function(){
    $("#see-all-saved").click(function(){
        if($("#see-all-saved").text()==="See all")
        {
        $("#see-all-saved").text("See less");
        $("#saved-body-saved").css({
            "height":"500px",
            "overflow":"auto"
        });
        }
        else if($("#see-all-saved").text()==="See less")
        {
        $("#see-all-saved").text("See all");
        $("#saved-body-saved").css({
            "height":"250px",
            "overflow":"hidden"
        });
        }
    }); 
});

