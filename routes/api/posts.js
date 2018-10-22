const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");

// GET api/posts/test
// @access public

router.get("/test", (req, res) =>
  res.json({
    msg: "Posts route"
  })
);

// POST api/posts
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
