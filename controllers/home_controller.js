// module.exports.home = function (req, res) {
//   console.log("jdjdj", req.cookies);
//   // res.cookie('user_id', 25);
//   return res.render("home", {
//     title: "Home",
//   });
// };

const Post = require("../models/post");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id', 25);

    try {
      const result = await Post.find({
        user: req.user._id,
      }).populate('user').exec();
      console.log(result);
    
      return res.render("home", {
              title: "Home",
              posts: result
            });
    } catch (error) {
      return res.redirect('users/sign-in')

    }
    // .then((posts) => {
    //   if (posts) {
    //     return res.render("home", {
    //       title: "Home",
    //       posts
    //     });
    //     //  return  res.status(200).send(user);
    //   }
    // })
    // .catch((err) => {
    //   console.log("err", err);
    //   return;
    // });
};

// module.exports.actionName = function(req, res){}
