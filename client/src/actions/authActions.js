import axios from "axios";

import { GET_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login get user token

export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      // Save to local storage

      const { token } = res.data;

      // Set token to local storage

      localStorage.setItem("jwtToken", token);

      // Set token to auth header

      setAuthToken(token);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
