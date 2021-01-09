module.exports.isAuthFeatures = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({
            status:'Please Sign in.'
        })
    }
}

module.exports.isAuth=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect('/home');
    }
}