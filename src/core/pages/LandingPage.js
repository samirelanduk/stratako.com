import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Div100vh from "react-div-100vh";
import SignupForm from "../components/SignupForm";

const LandingPage = props => {
  /**
   * The landing page for logged out users.
   */
  
  useEffect(() => {
    document.title = "stratako";
  });

  return (
    <Div100vh className="landing-page">
      <SignupForm setToken={props.setToken} />
    </Div100vh>
  )
}

LandingPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LandingPage;