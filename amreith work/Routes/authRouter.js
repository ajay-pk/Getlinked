const express=require('express');
const router=express.Router();
const passport=require('passport');
const {isAuth,Features}=require('../Middleware/isAuth');
const mongoose=require('mongoose');
const Link=require('../models/link');


// router.get('/home',(req,res,next)=>{
//   res.send('<h1>Home<h1><br><div>Welcome to Getlinked</div><br><a href="http://localhost:3000/login">Sign In with Google</a><br><a href="http://localhost:3000/logout">Log out</a><div><h3>Suggested Links</h3><p id="getLink"></p></div><div><form action="http://localhost:3000/uploadLink" method="POST">Paste the Links Here:<input type="url" name="Link"><br>Link Type:<input type="text" name="LinkType"><br>Department:<input type="text" name="Department"><br>SubjectName:<input type="text" name="SubjectName"><br> Topic:<input type="text" name="Topic"><br>    Description:<input type="text" name="Description"><br>      <input type="submit" value="Upload">    </form></div>  <script>async function getLink(url){const response= await fetch(url,{ method:"GET" });return response.json(); } getLink("http://localhost:3000/getLink").then(data=>{console.log(data);}).catch(err=>{         console.log("Failed to get links in Front end")      })</script>');
// });


router.get('/login',passport.authenticate('google',{scope:['profile','email'],prompt:'select_account'}));

router.get('/login/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/home.html');
  });
router.get('/home.html',isAuth,(req,res,next)=>{
  res.status(200);
  //res.send('<h1>Home<h1><br><div>Welcome to Getlinked Authenticated User</div><br><a href="http://localhost:3000/logout">Logout</a><h3>Suggested Links</h3><p id="getLink"></p></div><div><form action="http://localhost:3000/uploadLink" method="POST">Paste the Links Here:<input type="url" name="Link"><br>Link Type:<input type="text" name="LinkType"><br>Department:<input type="text" name="Department"><br>SubjectName:<input type="text" name="SubjectName"><br> Topic:<input type="text" name="Topic"><br>    Description:<input type="text" name="Description"><br>      <input type="submit" value="Upload">    </form></div>');
});

router.get('/logout',(req,res,next)=>{
  req.logout()
  res.redirect("/SignIn.html");
});

/*router.post('/uploadLink',isAuth,(req,res,next)=>{
  const link={
    Link:req.body.Link,
    LinkType:req.body.LinkType,
    Department:req.body.Department,
    SubjectName:req.body.SubjectName,
    Topic:req.body.Topic,
    Description:req.body.Description
};
  Link.insertMany(link)
      .then(result=>{
        console.log(result);
        console.log("Succesfully Inserted");
        res.send(result);
      })
      .catch(err=>{
        console.log(err);
        res.redirect('/UserHome');
      })

});
router.get('/getLink',(req,res,next)=>{
  Link.find()
      .then(data=>{
        console.log(data);
        res.send(data);
      })
      .catch(err=>{
        console.log('error will getting links in Backend')
      })
});*/
module.exports=router;