import React from "react";
import PropTypes from "prop-types";
import Div100vh from "react-div-100vh";
import Nav from "./Nav";

const Base = props => {
  /**
   * Provides the basic logged in layout.
   */

  return (

    <Div100vh className="base">
      <Nav />
      <main className={props.className}>
        {props.children}
      </main>
    </Div100vh>
  )
}

Base.propTypes = {
  children: PropTypes.node.isRequired
}

export default Base;