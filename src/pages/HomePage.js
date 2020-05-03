import React from "react";
import Base from "../components/Base";
import "../style/HomePage.scss";

const HomePage = (props) => {

  return (
    <Base className="home-page" logout={props.logout} >
      
    </Base>
  )
}

HomePage.propTypes = {
  
}

export default HomePage;