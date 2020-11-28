const express=require('express');
const router=express.Router();
const passport=require('passport');
const isAuth = require('../Middleware/isAuth').isAuth;


router.get('/home',(req,res,next)=>{
  res.send('<h1>Home<h1><br><div>Welcome to Getlinked</div><br><a href="http://localhost:3000/login">Sign In with Google</a><br><a href="http://localhost:3000/logout">Log out</a>');
});

router.get('/login',passport.authenticate('google',{scope:['profile']}));

router.get('/login/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/Userhome');
  });

router.get('/UserHome',isAuth,(req,res,next)=>{
  res.send('<h1>Home<h1><br><div>Welcome to Getlinked Authenticated User</div><br><a href="http://localhost:3000/logout">Logout</a>');
});

router.get('/logout',(req,res,next)=>{
  req.logout()
  res.redirect("/home");
})

module.exports=router;