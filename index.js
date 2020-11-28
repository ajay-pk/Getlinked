const express=require("express");
const mongoose=require('mongoose');
const session=require('express-session');
const passport=require('passport');
const keys=require("./.gitignore/keys");
const port=3000;
const authRoutes=require("./Routes/authRouter")
const connectDB= require('./config/db')



const MongoStore=require('connect-mongo')(session);

require('./Config/passport')(passport);

connectDB();


const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));

const sessionStore = new MongoStore({ mongooseConnection:mongoose.connection, collection: 'sessions' });

app.use(session({
    secret: keys.secretKey,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 4 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
