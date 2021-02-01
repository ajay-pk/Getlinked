const express=require('express');
const router=express.Router();
const {isAuth,Features} = require('../Middleware/isAuth');
const Link=require('../models/link');

//Api for Uploading links and creating in Database
router.post('/uploadLink',Features,(req,res,next)=>{
    const link={
      Link:req.body.Link,
      LinkType:req.body.LinkType,
      Department:req.body.Department,
      SubjectName:req.body.SubjectName,
      Topic:req.body.Topic,
      Description:req.body.Description,
      uploadedby:req.user.id
  };
    console.log(link);
    Link.create(link)
        .then(result=>{
          res.send({
            status:"Successfully inserted"
          });
          // res.send(result);
        })
        .catch(err=>{
          console.log(err);
          res.redirect('/home.html');
        })
  
  });

//Api for getting links to Suggestions
  router.get('/getLink',(req,res,next)=>{
    Link.find({})
        .select({_id:0,saved:0,uploadedAt:0,uploadedby:0,LinkType:0})
        .then(data=>{
          console.log(data);
          res.json(data);
        })
        .catch(err=>{
          console.log('error while getting links in Backend')
        })
  });
//Api for Bookmarks
router.get('/Bookmarks',Features,(req,res,next)=>{
   Link.find({saved:req.user.id})
       .select({Link:1,LinkType:1,SubjectName:1,Topic:1,_id:0})
        .then(data=>{
          console.log(data);
          res.json(data);
        })
})

router.get('/Your-Bookmarks',Features,(req,res,next)=>{
  Link.find({uploadedby:req.user.id})
        .select({_id:0,Link:1,LinkType:1,SubjectName:1,Topic:1})
         .then(data=>{
           console.log(data);
           res.json(data);
         })
})
 

  module.exports=router;