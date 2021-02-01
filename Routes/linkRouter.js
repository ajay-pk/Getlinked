const express=require('express');
const router=express.Router();
const {isAuth,Features} = require('../Middleware/isAuth');
const Link=require('../models/link');
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
    Link.find({})
        .select({_id:0,saved:0,uploadedAt:0,uploadedby:0,LinkType:0})
        .then(data=>{
          console.log(data);
          res.json(data);
        })
        .catch(err=>{
          console.log('error while getting links in Backend')
        })
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

router.get('/Your-Bookmarks',Features,(req,res,next)=>{
  Link.find({uploadedby:req.user.id})
        .select({_id:0,Link:1,LinkType:1,SubjectName:1,Topic:1})
         .then(data=>{
           console.log(data);
           res.json(data);
         })
})
router.get("/search", (req, res) => {
  try {
    MongoClient.connect(url,function(err,db){
      if(err){
        console.log("not connected");
      }
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
        }
    ]).toArray(function(err,result){
      
      if(err){
         console.log("error bha")
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
 

  module.exports=router;
