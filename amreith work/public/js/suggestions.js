let card=document.getElementById('cardDetails');
const data_api="http://localhost:3000/clickData"

let data={
    Type:'click',
    Tag: 'suggestion card',
    click_object: '',
    Time: ''
}
// function post(data,url){
//    $.ajax({
//    type:'POST',
//    url:url,
//    data:JSON.stringify(data),
//    dataType:'json',
//    contentType : "application/json",
//    success:function(res,status){
//       console.log('post no')
//    },
//    error:function(err){
//       console.log(err)
//    }
//    });
// }
// function Savepost(data,url){
//    $.ajax({
//    type:'POST',
//    url:url,
//    data:JSON.stringify(data),
//    dataType:'json',
//    contentType : "application/json",
//    success:function(res,status){
//       console.log(res)
//       console.log('sent save')
//    },
//    error:function(err){
//       console.log(err)
//    }
//    });
// }
card.addEventListener('click',(e)=>{
   let saved={
      button:'',
      Department:'',
      Link:' '
   }
   let report={Department:'',Link:'',no:1
   }
   const save_api="http://localhost:3000/save"
   const report_api='http://localhost:3000/report'
   if(e.target.className==="card-info"){
      let d = new Date(); // for now
    //   console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
    //   console.log(`${d.toLocaleString()}`)
      data.click_object=e.target.parentNode.attributes[0].nodeValue;
      data.Time=d.toLocaleString();
      const clickPost=new Http;
      clickPost.ajaxPost(data_api,data)
                .then(data=>{
                   console.log(data);
                })
                .catch(err=>{
                   console.log("error occured!!")
                })
      //post(data,data_api);
      //console.log(data);
      // DO POST
   }
   else if(e.target.attributes[1].nodeValue==="saved" && (Array.from(e.target.classList).indexOf('click')==-1)){
      //e.target.className="save-suggestion float-left click"
      // let string=e.path[1].lastElementChild.innerText
      // let theArray = string.trim().split("\n"); 
        e.target.classList.add('click');
        saved.button='save';
        saved.Department=e.path[1].lastElementChild.innerText.trim().split("\n")[0]
        saved.Link=e.target.parentElement.lastElementChild.attributes[0].nodeValue;
        const savePost=new Http;
        savePost.ajaxPost(save_api,saved)
                .then(data=>{
                   console.log(data);
                })
                .catch(err=>{
                   console.log(err)
                })
      //   Savepost(saved,save_api)
     console.log(saved);
   }
   else if(e.target.attributes[1].nodeValue==="saved" && e.target.classList.contains('click')){
        e.target.classList.remove('click')
        saved.button='unsave';
        saved.Department=e.path[1].lastElementChild.innerText.trim().split("\n")[0]
        saved.Link=e.target.parentElement.lastElementChild.attributes[0].nodeValue;
        const unsavePost=new Http;
        unsavePost.ajaxPost(save_api,saved)
                   .then(data=>{
                      console.log(data);
                   })
                   .catch(err=>{
                      console.log(err)
                   })
      //   Savepost(saved,save_api)
        console.log(saved)

   }
   // else if(e.target.attributes[1].nodeValue==="info"){
      
   // }
   else if(e.target.attributes[1].nodeValue==="report"){
      report.Department=e.path[1].lastElementChild.innerText.trim().split("\n")[0]
      report.Link=e.target.parentElement.lastElementChild.attributes[0].nodeValue;
      console.log(report)
      let id =e.target.parentElement.attributes[1].nodeValue
      $(`#${id}`).click(function(){
         return false;
      });
      $(`#${id}`).css({
         "opacity":"0.3",
         "cursor":"not-allowed"
      });
      const Reportlink=new Http
      // Reportlink.ajaxPost(report_api,report)
      //           .then(data=>{
      //              console.log(data)
      //           })
      //           .catch(err=>{
      //              console.log(err)
      //           })
   }
   // else if(e.target.className==="save-suggestion"){
   //    console.log('saved ehy!!')
   // }
   // else {
   //    console.log("Info pa!!");
   // }
})