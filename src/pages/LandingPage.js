import React from "react";
import Div100vh from "react-div-100vh";
import SignupForm from "../components/SignupForm";
import "../style/LandingPage.scss";

const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <Div100vh className="landing-1">
        <div className="text">
          <h1 className="logo">stratako</h1>
          <h2>Strategic Task Command</h2>
        </div>

        <SignupForm login={props.login} />
        
      </Div100vh>
      
    </div>
  );
}

LandingPage.propTypes = {

}

export default LandingPage;