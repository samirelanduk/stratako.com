import React from "react";
import Div100vh from "react-div-100vh";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Div100vh className="login-page">
      <LoginForm />
    </Div100vh>
  );
};

LoginPage.propTypes = {
  
};

export default LoginPage;