const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  // handle
  if (
    !Validator.isLength(data.handle, {
      min: 2,
      max: 40
    })
  ) {
    errors.handle = "Handle needs to be between 2 and 4 characters";
  }
  // Profile handle
  if (!Validator.isLength(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  // Status
  if (!Validator.isLength(data.status)) {
    errors.status = "Status field is required";
  }

  // Skills
  if (!Validator.isLength(data.skills)) {
    errors.skills = "Status field is required";
  }

  // website
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  // Youtube
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  // Twitter
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  // Facebook
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  // LinkedIn
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  // Instagram
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
