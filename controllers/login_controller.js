const User = require("../models/user");

module.exports.login = (req, res) => {
  res.render("user_sign_in.ejs", {
    title: "Sign In",
  });
};

module.exports.signup = (req, res) => {
  res.render("user_sign_up.ejs", {
    title: "Sign Up",
  });
};

module.exports.create = async (req, res) => {
  console.log("aaa", req.body);
  const { username, email, password, Confirm_Password } = req.body;
  if (password !== Confirm_Password) {
    return res.redirect("back");
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.email + "already exists");
      } else {
        User.create({
          name: username,
          password: password,
          email: email,
        })
          .then((user) => {
            return res.status(201).redirect("/login");
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
};

module.exports.createSession = (req, res) => {
  const { username, password } = req.body;
  
  User.findOne({ email: username }).then((user) => {
    if (user) {
      console.log("re",  user._id);
      if (user.password !== password) {
        return res.redirect("back");
      }
       res.cookie("user_id", user.id );
       return res.redirect('/profile');
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.profile = (req, res) => {
  console.log("cookies", req.cookies);
  const { user_id }= req.cookies;
  if(!user_id){
    return res.redirect('/login');
  }
  User.findOne({ _id: user_id}).then((user) => {
    if (user) {
       res.cookie("user_id", user.id );
       return res.render('user_profile',{
        title:"user profile",
        user: user.name,
        email: user.email
       });
    } else {
      return res.redirect("/login");
    }
  }).catch((err)=>{
    return res.redirect("/login");
  });
};

module.exports.singnout = (req, res) => {
  console.log("cookies", req.cookies);
  // const { user_id }= req.cookies;

  if(!user_id){
    return res.redirect('/login');
  } else{
   return res.clearCookie("user_id").redirect('/login');
  }
};


module.exports.createSession = (req, res) => {
  return res.redirect('/');
};