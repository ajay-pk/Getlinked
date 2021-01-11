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