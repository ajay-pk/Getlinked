const mongoose=require("mongoose");

//Creating a model for how the Link data should be
const UserSchema = new mongoose.Schema({
    googleId:{
      type:String,
      unique:true,
      required:true
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required:true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    uploadLinks:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Link'
    }]
  })

  module.exports=mongoose.model('User',UserSchema)