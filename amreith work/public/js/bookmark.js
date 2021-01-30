const bookmark_api="http://localhost:3000/Bookmarks";
const bookmarks=new Http;
bookmarks.get(bookmark_api)
    .then(Data=>{
        console.log(Data)
        let template=``
        Data.forEach(element => {
        if(element.LinkType==="video"){
        template+=`
        <div class="saved-cards" href="${element.Link}">
            <div class="saved-image">
            <img src="../images/bookmarks/pdf.svg">
            </div>
            <a href="${element.Link}"><b>${element.Topic}</b></a><br>
            <a href="${element.Link}">${element.SubjectName}</a>
        </div>
        `
        }
        })
        document.getElementById("saved-body").innerHTML = template;
    })
    .catch(err=>{
        console.log(err)
    })

