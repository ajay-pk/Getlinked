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
const cors = require('cors');



const MongoStore=require('connect-mongo')(session);

require('./Config/passport')(passport);

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

        maxAge: 1000 * 60 * 60 * 24 * 1 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
app.use(authRoutes);
app.use(userRoutes);
app.use(linkRoutes);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })