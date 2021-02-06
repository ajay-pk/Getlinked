const express=require('express');
const router=express.Router();
const {isAuth,Features} = require('../Middleware/isAuth');
const Link=require('../models/link');
const User=require('../models/user')
const  MongoClient= require("mongodb").MongoClient;
const url ="mongodb+srv://test:ajaysanjay1@cluster0.lvyjc.mongodb.net/getlinked?retryWrites=true&w=majority"

//Api for Uploading links and creating in Database
router.post('/uploadLink',Features,(req,res,next)=>{
    const link={
      Link:req.body.Link,
      LinkType:req.body.LinkType,
      Department:req.body.Department,
      SubjectName:req.body.SubjectName,
      Topic:req.body.Topic,
      Description:req.body.Description,
      uploadedby:req.user.id
  };
    console.log(link);
    Link.create(link)
        .then(result=>{
          User.updateOne({_id:req.user.id},{$push:{uploadLinks:result._id}})
          .then(res=>{
            console.log(res);
          })
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
    if(req.user){
    Link.find({saved:{$nin:req.user.id}})
        .select({_id:0,saved:0,uploadedAt:0,uploadedby:0,LinkType:0})
        .then(data=>{
          console.log(data);
          res.json(data);
        })
        .catch(err=>{
          console.log('error while getting links in Backend')
        })
    }
  });
//Api for Bookmarks
router.get('/Bookmarks',Features,(req,res,next)=>{
   Link.find({saved:req.user.id})
       .select({Link:1,LinkType:1,SubjectName:1,Topic:1,_id:0})
        .then(data=>{
          console.log(data);
          res.json(data);
        })
})
//Api for Uploaded links
router.get('/Your-Bookmarks',Features,(req,res,next)=>{
  User.findOne({_id:req.user.id})
  .select({uploadLinks:1})
  .populate('uploadLinks')
  .then(result=>{
    res.json(result);
  })

})
router.get("/searchbytopic", (req, res) => {
  try {
    MongoClient.connect(url,function(err,db){
      if(err){
        console.log(err);
      }
      
    console.log("mongoclient connected")
    
    console.log(req.connection.remoteAddress)  
    let dbo= db.db("Get-Linked")
      dbo.collection("links").aggregate([
        {
            "$search": {
                "autocomplete": {
                    "query": `${req.query.topic}`,
                    "path": "Topic",
                    "fuzzy": {
                        "maxEdits": 2,
                        "prefixLength": 1
                    }
                }
            }
            // "$project": {
            //   "_id": 1,
            //   // "Topic": 1,
            //   // "Link": 1,
            //   // "uploadedAt": 0,
            //   // "Description": 0,
            //   "saved": 0
            //   // "Department": 1
          
            // }
        },

        { 
          "$project":{
         "uploadedAt": 0,
         "Description": 0,
         "saved": 0,
         "uploadedby":0,
         "__v":0
         }
       },
      
       {
         "$match":{
           "Department": `${req.query.department}`
 
         }
       },
       
       { $limit: 50 }

    ]).toArray(function(err,result){
      
      if(err){
         console.log(err)
      }
      res.send(result)
    });

    })


  } catch (e) {
      res.status(500).send({ message: e.message });
  }
});

// router.get("/get/:id", async (request, response) => {
//   try {
//     let result = await collection.findOne({ "_id": ObjectID(request.params.id) });
//     response.send(result);
// } catch (e) {
//     response.status(500).send({ message: e.message });
// }
// });


router.get('/getLink/:id',(req,res,next)=>{
  console.log('Request Id:', req.params.id);
  Link.find({_id:req.params.id})
      .select({_id:0,saved:0,uploadedAt:0,uploadedby:0,LinkType:0})
      .then(data=>{
        console.log(data);
        res.json(data);
      })
      .catch(err=>{
        console.log('error while getting links in Backend')
      })
});
router.get("/searchbysubjectname", (req, res) => {
  try {
    MongoClient.connect(url,function(err,db){
      if(err){
        console.log(err);
      }
      
      console.log(url)
      let dbo= db.db("Get-Linked")
      dbo.collection("links").aggregate([
        {
            "$search": {
                "index": "subjectname",
                "autocomplete": {
                    "query": `${req.query.subjectname}`,
                    "path": "SubjectName",
                    "fuzzy": {
                        "maxEdits": 2,
                        "prefixLength": 1
                    }
                },
                
               
            }
           
            
             
          
             
        },
       
        { 
         "$project":{
        "uploadedAt": 0,
        "Description": 0,
        "saved": 0,
        "uploadedby":0,
        "__v":0
        }
      },
      {
        "$match":{
          "Department": `${req.query.department}`

        }
      },

      { $limit: 50 }

    ]).toArray(function(err,result){
      
      if(err){
         console.log(err)
      }
      res.send(result)
    });

    })


  } catch (e) {
      res.status(500).send({ message: e.message });
  }
});






  module.exports=router;
