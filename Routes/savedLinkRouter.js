const express=require('express');
const router=express.Router();
const savedLink=require('../models/savedLinks');
const {isAuth,Features}=require('../Middleware/isAuth');

router.post('/save',Features,(req,res,next)=>{
    console.log(req.body.button)
    if(req.body.button==="unsave"){
        console.log(req.body)
        savedLink.updateOne({userId:req.user.id},{$pull:{saved:req.body.link}})
                 .then(data=>{
                     res.json(data)
                 })
                 .catch(err=>{
                     console.log(err)
                 })
    }
    else if(req.body.button==="save"){
        savedLink.findOneAndUpdate({userId:req.user.id},{$addToSet:{saved:req.body.link}},{new:true,upsert:true})
                 .then(data=>{
                     console.log(data)
                     res.json(data);
                 })
                 .catch(err=>{
                     console.log(err)
                 })
    }
})

module.exports=router