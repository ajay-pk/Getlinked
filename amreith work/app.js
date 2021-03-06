const express=require("express");
const mongoose=require('mongoose');
const session=require('express-session');
const passport=require('passport');
const keys=require("./.gitignore/keys");
const port=3000;
const authRoutes=require("./Routes/authRouter");
const linkRoutes=require('./Routes/linkRouter');
const userRoutes=require("./Routes/userRouter")
const connectDB= require('./config/db');
const clickDataRoutes=require('./Routes/clickDataRouter')
const savedLinkRoutes=require('./Routes/savedLinkRouter')
const cors = require('cors');
const pdfRoutes=require('./Routes/pdfRouter');

//Sessions data stored in Mongodb
const MongoStore=require('connect-mongo')(session);

//Passport Configuration
require('./Config/passport')(passport);
//DB connection
connectDB();




const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(
    cors({
      origin: "http://127.0.0.1:5500", // restrict calls to those this address
      methods: "GET" // only allow GET requests
    })
  );
const sessionStore = new MongoStore({ mongooseConnection:mongoose.connection, collection: 'sessions' });
let setCache = function (req, res, next) {

  const period = 60 * 5 


  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${period}`)
  } else {

    res.set('Cache-control', `no-store`)
  }


  next()
}
app.use(setCache)
app.use(session({
    secret: keys.secretKey,
    resave: false,
    name:"jdsnfkjsdn",
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
         httpOnly:true,
        // //secure:true,
        // sameSite:true,

        maxAge: 1000 * 60 * 60* 24 * 1// Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
//User authentication Handle
app.use(authRoutes);
//Userdetails Handle
app.use(userRoutes);
//Link details Handle
app.use(linkRoutes);
//click data handle
app.use(clickDataRoutes);
app.use(savedLinkRoutes);
app.use(pdfRoutes)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  
