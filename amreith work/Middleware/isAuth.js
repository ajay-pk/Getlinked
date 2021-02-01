//It is used to protect our resoures and can be viewed only by Registered Users
//Features is exclusive function to restrict non-registered for Upload,saved and other Features in our app

module.exports = {
    isAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/SignIn.html')
      }
    },
    Features: function (req, res, next) {
      if (!req.isAuthenticated()) {
        res.send({
            status:"Please sign-in to use"
        });
      } else {
        next();
        console.log('Signed in')
      }
    }
  }