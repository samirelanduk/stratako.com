import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import down from "../images/down.svg";

const DropdownList = props => {

  const [listVisible, setListVisible] = useState(false);

  const dropdownElement = useRef(null);

  const clickOutside = e => {
    if (dropdownElement.current && !dropdownElement.current.contains(e.target)) {
      setListVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  })

  const className = classNames({list: true, visible: listVisible});

  return (
    <div className="dropdown-list" ref={dropdownElement}>
      <div className="down-button" onClick={() => setListVisible(!listVisible)}>
        <img src={down} alt="open" />
      </div>
      <div className={className}>
        {props.children}
      </div>
    </div>
  );
};

DropdownList.propTypes = {
  
};

export default DropdownList;