const express=require('express');
const router=express.Router();
const passport=require('passport');
const {isAuth,Features}=require('../Middleware/isAuth');




// router.get('/home',(req,res,next)=>{
//   res.send('<h1>Home<h1><br><div>Welcome to Getlinked</div><br><a href="http://localhost:3000/login">Sign In with Google</a><br><a href="http://localhost:3000/logout">Log out</a><div><h3>Suggested Links</h3><p id="getLink"></p></div><div><form action="http://localhost:3000/uploadLink" method="POST">Paste the Links Here:<input type="url" name="Link"><br>Link Type:<input type="text" name="LinkType"><br>Department:<input type="text" name="Department"><br>SubjectName:<input type="text" name="SubjectName"><br> Topic:<input type="text" name="Topic"><br>    Description:<input type="text" name="Description"><br>      <input type="submit" value="Upload">    </form></div>  <script>async function getLink(url){const response= await fetch(url,{ method:"GET" });return response.json(); } getLink("http://localhost:3000/getLink").then(data=>{console.log(data);}).catch(err=>{         console.log("Failed to get links in Front end")      })</script>');
// });

//Api for Login using Google
router.get('/login',passport.authenticate('google',{scope:['profile','email'],prompt:'select_account'}));

router.get('/login/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/home.html');
  });

//Api for Home page after login
router.get('/home.html',isAuth,(req,res,next)=>{
  res.status(200);
  //res.send('<h1>Home<h1><br><div>Welcome to Getlinked Authenticated User</div><br><a href="http://localhost:3000/logout">Logout</a><h3>Suggested Links</h3><p id="getLink"></p></div><div><form action="http://localhost:3000/uploadLink" method="POST">Paste the Links Here:<input type="url" name="Link"><br>Link Type:<input type="text" name="LinkType"><br>Department:<input type="text" name="Department"><br>SubjectName:<input type="text" name="SubjectName"><br> Topic:<input type="text" name="Topic"><br>    Description:<input type="text" name="Description"><br>      <input type="submit" value="Upload">    </form></div>');
});
//Api for logout
router.get('/logout',(req,res,next)=>{
  req.logout()
  res.redirect("/SignIn.html");
});


module.exports=router;