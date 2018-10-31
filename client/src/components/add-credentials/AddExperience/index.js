import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { TextFieldGroup } from "../../common/TextFieldGroup";
import { TextAreaFieldGroup } from "../../common/TextAreaFieldGroup";
import { from } from "rxjs";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      to: "",
      current: "",
      description: "",
      errors: {},
      disabled: false
    };
  }

  state = {};
  render() {
    return <div>{}</div>;
  }
}

export default AddExperience;
