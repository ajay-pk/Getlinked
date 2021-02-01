const mongoose=require('mongoose');

const savedLinksSchema=new mongoose.Schema({
    userId:{
       type:String,
       required:true,
       unique:true
    },
    saved:[String]
})

module.exports=mongoose.model('savedLink',savedLinksSchema)