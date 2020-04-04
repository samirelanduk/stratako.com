import React from "react";
import "../style/LandingPage.scss";
import Div100vh from "react-div-100vh";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Div100vh className="landing-1">
        <h1 className="logo">stratako</h1>
        <h2>Strategic Task Command</h2>
      </Div100vh>
      
    </div>
  );
}

LandingPage.propTypes = {

}

export default LandingPage;