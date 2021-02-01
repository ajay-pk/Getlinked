const mongoose=require('mongoose');
 
const userDataSchema=new mongoose.Schema({
    user_id:{
        type:String
    },
    Type:{
        type:String
    },
    Tag:{
        type:String
    },
    click_object:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('user_data',userDataSchema);