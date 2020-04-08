import React from "react";
import { Link } from "react-router-dom";
import Base from "../components/Base";
import "../style/HomePage.scss";

const HomePage = (props) => {

  return (
    <Base className="home-page" logout={props.logout} >
      <Link to="/goals/">Goals</Link>
    </Base>
  )
}

HomePage.propTypes = {
  
}

export default HomePage;