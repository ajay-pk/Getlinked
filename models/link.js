const mongoose=require("mongoose");

//Creating a model for how the Link data should be
const LinkdetailsSchema=new mongoose.Schema({
    Link:{
     type:String,
     required:[true,'Link is Required!!'],
     trim:true
    },
    LinkType:{
      type:String,
      required:[true,'Link type is Required!!'],
      trim:true

    },
    Department:{
        type:String,
        required:[true,'Department is Required!!'],
        enum:{
          values:['ECE','CSE','EEE','Mech','Biotech','Civil'],
          message:'Department name should be either ECE,CSE,Mech,Biotech or Civil'
        }
    },
    SubjectName:{
        type:String,
        required:[true,'Subject Name is Required!!'],

    },
    Topic:{
        type:String,
        required:[true,'Topic is Required!!']
    },
    Description:{
        type:String

    },
    uploadedAt:{
        type:Date,
        default:Date.now
    },
    uploadedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    saved:[String]
});

/*const LinkSchema=new mongoose.Schema({
    uploadedAt:{
        type:Date,
        default:Date.now
    },
    LinkDetails:[LinkdetailsSchema]
});*/

LinkdetailsSchema.index({Department:1,Link:1});
LinkdetailsSchema.index({saved:1})
module.exports=mongoose.model('Link',LinkdetailsSchema);