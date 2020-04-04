import React from "react";
import Base from "../components/Base";
import "../style/HomePage.scss";

export default function Home(props) {

  return (
    <Base className="home-page" logout={props.logout} >
      stratako
    </Base>
  )
}