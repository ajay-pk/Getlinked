const express=require('express');
const router=express.Router();
const {isAuth,Features} = require('../Middleware/isAuth');
const mongoose=require('mongoose');
const Link=require('../models/link');

router.post('/uploadLink',Features,(req,res,next)=>{
    const link={
      Link:req.body.Link,
      LinkType:req.body.LinkType,
      Department:req.body.Department,
      SubjectName:req.body.SubjectName,
      Topic:req.body.Topic,
      Description:req.body.Description
  };
    Link.insertMany(link)
        .then(result=>{
          console.log(result);
          console.log("Succesfully Inserted");
          res.send(result);
        })
        .catch(err=>{
          console.log(err);
          res.redirect('/UserHome');
        })
  
  });
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