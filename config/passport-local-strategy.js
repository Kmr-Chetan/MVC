const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log("Error in finding user --> Passport");
        return done(err);
      }
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      return done(null, user);
    })
    .catch(function (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("here check auth");
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
      res.locals.user= req.user;
    }
    next();
}

module.exports = passport;
