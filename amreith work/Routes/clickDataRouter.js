const express=require('express');
const router=express.Router();
const User=require('../models/user');
const user_data=require('../models/training')

let data={
    user_id:'',
    Type:'',
    Tag:'',
    click_object:'',
    Time:''
}

router.post('/clickData',(req,res,next)=>{
    if(req.user){ 
    User.findOne({googleId:req.user.googleId})
    .then(user=>{
           data.user_id=req.user.googleId;
           data.Type=req.body.Type,
           data.Tag=req.body.Tag,
           data.click_object=req.body.click_object,
           data.Time=req.body.Time
           user_data.create(data)
                    .then(result=>{
                        res.json(result)
                        console.log(result);
                    })
        })
    }
    else{
        data.user_id="Guest";
           data.Type=req.body.Type,
           data.Tag=req.body.Tag,
           data.click_object=req.body.click_object,
           data.Time=req.body.Time
           user_data.create(data)
                    .then(result=>{
                        res.json(result)
                        console.log(result);
                    })

    }
})


module.exports=router;