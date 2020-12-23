import React from "react";
import Div100vh from "react-div-100vh";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <Div100vh className="signup-page">
      <SignupForm />
    </Div100vh>
  );
};

SignupPage.propTypes = {
  
};

export default SignupPage;