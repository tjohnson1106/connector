const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// Load profile model
const Profile = require("../../models/Profile");

// Load user model
const User = require("../../models/User");

// @route GET api/profile/test
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile route"
  })
);

// @route GET api/profile
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route api/profile/all
// @access public

// TODO returning no no profile error though profiles exist
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!noprofiles) {
        errors.noprofile = "There are no existing profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(
      err => res.status(404).json(err)
      // res.status(404).json({
      //   profile: "There are no profiles"
      // })
    );
});

// @route api/profile/handle/:handle
// @access public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({
    handle: req.params.handle
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route api/profile/user/:user_id
// @access public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })

    .catch(err =>
      res.status(404).json({
        profile: "There is no profile for this user"
      })
    );
});

// @route POST api/profile
// @access private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }

    // skills - array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social -> initialize
    profileFields.social = {};

    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }

    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }

    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }

    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }

    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "Handle already exists";
            res.status(400).json(errors);
          }
          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route POST api/profile/experience
// @access Private

router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to experience array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route POST api/profile/education
// @access Private

router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to experience array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

module.exports = router;
