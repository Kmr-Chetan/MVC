const Post = require("../models/post");

module.exports.post = function (req, res) {
  res.send("<p>First Post</p>");
};

module.exports.create = (req, res)=> {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((user) => {
      if (user) {
       return  res.status(200).redirect("back");
      }
    })
    .catch((err) => {
        console.log("err", err);
      return;
    });
};
