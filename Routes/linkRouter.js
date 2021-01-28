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
      uploadedby:req.user.googleId
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
        .then(data=>{
          console.log(data);
          res.json(data);
        })
        .catch(err=>{
          console.log('error while getting links in Backend')
        })
  });

 

  module.exports=router;