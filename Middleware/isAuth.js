module.exports = {
    isAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/home')
      }
    },
    Features: function (req, res, next) {
      if (!req.isAuthenticated()) {
        res.send({
            status:"Please sign-in to use"
        });
      } else {
        console.log('Signed in')
      }
    }
  }