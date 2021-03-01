function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
const bookmark_api="http://localhost:3000/Bookmarks";
const bookmarks=new Http;
const uploaded_api="http://localhost:3000/Your-Bookmarks";
const uploaded=new Http;
bookmarks.get(bookmark_api)
    .then(Data=>{
        console.log(Data)
        let template=``
        Data.forEach(element => {
        if(element.LinkType==="website"){
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
        uploadArray=Data.uploadLinks
        console.log(uploadArray);
        let template=``
        uploadArray.forEach(element=>{
        if(element.LinkType==="website"){
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
        $("#see-all-saved").text(" ");
        $("#saved-body-saved").css({
            "height":"500px",
            "overflow":"auto"
        });
        }
    }); 
});
$(document).ready(function(){
    $("#see-all-your").click(function(){
        if($("#see-all-your").text()==="See all")
        {
        $("#see-all-your").text(" ");
        $("#saved-body-your").css({
            "height":"500px",
            "overflow":"auto"
        });
        }
    }); 
});

function getPDF() {
    return axios.get(`http://localhost:3000/mock`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    })
}

function savePDF(){
    console.log('save')
   return getPDF() // API call
     .then((response) => {
       const blob = new Blob([response.data], {type: 'application/pdf'})
       const link = document.createElement('a')
       link.href = window.URL.createObjectURL(blob)
       link.download = `SavedLinks.pdf`
       link.click()
     })
   .catch(err => {
       console.log('error while Handling')
 })
}