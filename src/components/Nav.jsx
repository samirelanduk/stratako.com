import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import classNames from "classnames";
import settingsIcon from "../images/cog.svg";
import { UserContext } from "../contexts";
import { TOKEN } from "../queries";
import { LOGOUT } from "../mutations";
import { ClipLoader } from "react-spinners";

const Nav = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [,setUser] = useContext(UserContext);
  const dropdownElement = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const client = useApolloClient();

  const iconClicked = e => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  }

  const clickOutside = e => {
    if (dropdownElement.current && !dropdownElement.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }

  const [logout, logoutMutation] = useMutation(LOGOUT, {
    onCompleted: () => {
      setUser(false);
      client.cache.writeQuery({query: TOKEN, data: {accessToken: null}});
      for (let path of [/\/settings\//]) {
        if (path.test(location.pathname)) {
          history.push("/");
          break;
        }
      }
    }
  });

  useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  })

  const className = classNames({
    "show-dropdown": showDropdown,
    "logging-out": logoutMutation.loading
  });

  return (
    <nav className={className}>
       <div ref={dropdownElement} className="nav-dropdown-container">
          <img src={settingsIcon} alt="settings" className="settings-icon"  onClick={iconClicked} />
          <div className="dropdown">
            {logoutMutation.loading && <ClipLoader size="40px" color="#6353C6" />}
            <Link className="option" to="/settings/">
              User Settings
            </Link>
            <div className="option" onClick={logout}>
              Log Out
            </div>
          </div>
        </div>
    </nav>
  );
};

Nav.propTypes = {
  
};

export default Nav;