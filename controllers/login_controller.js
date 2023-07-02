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
  const { username,  email, password, Confirm_Password } = req.body;
  if (password !== Confirm_Password) {
    return res.redirect("back");
  }
  User.findOne({ email: email })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.email + 'already exists');
    } else {
      User
        .create({
          name: username,
          password: password,
          email: email,
        })
        .then((user) =>{
            return res.status(201).redirect('/login');
         })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });

};
