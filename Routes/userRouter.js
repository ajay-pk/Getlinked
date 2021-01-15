const express=require('express');
const router=express.Router();
const {isAuth,Features}=require('../Middleware/isAuth');
const mongoose=require('mongoose');
const User=require('../models/user');

router.get('/userDetails',Features,(req,res,next)=>{
      User.find({googleId:req.user.googleId})
          .then(userDetail=>{
              res.json(userDetail);

          })
          .catch(err=>{
              console.log("error while getting user")
          })
});

module.exports=router