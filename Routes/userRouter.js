const express=require('express');
const router=express.Router();
const {isAuth,Features}=require('../Middleware/isAuth');
const User=require('../models/user');

router.get('/userDetails',Features,(req,res,next)=>{
      User.findOne({googleId:req.user.googleId})
          .select({_id:0,googleId:0,firstName:0,lastName:0,createdAt:0})
          .then(userDetail=>{
              res.json(userDetail);

          })
          .catch(err=>{
              console.log("error while getting user")
          })
});

module.exports=router