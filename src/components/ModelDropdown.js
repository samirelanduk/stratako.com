import React from "react";
import classnames from "classnames";
import Down from "../images/down.svg";
import Up from "../images/up.svg";
import "../style/ModelDropdown.scss";

const ModelDropdown = (props) => {

  const dropdownClass = classnames({
    "model-dropdown": true,
    "visible": props.showDropdown
  })

  return (
    <div className={dropdownClass}>
      <img
        src={props.showDropdown ? Up : Down}
        onClick={() => props.setShowDropdown(!props.showDropdown)}
      />
      <button onClick={props.delete}>Delete</button>
    </div>
  )
}

ModelDropdown.propTypes = {

}

export default ModelDropdown;