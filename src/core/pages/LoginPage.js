import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Div100vh from "react-div-100vh";
import LoginForm from "../components/LoginForm";

const LoginPage = props => {
  /**
   * The page which contains the login form.
   */

  useEffect(() => {
    document.title = "Log In - stratako";
  });

  return (
    <Div100vh className="login-page">
      <LoginForm setToken={props.setToken} />
    </Div100vh>
  )
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginPage;