import React, { useContext } from "react";
import { useHistory } from "react-router";
import userIcon from "../../images/user-icon.svg";
import TokenContext from "../context";

const Nav = () => {
  /**
   * The navbar at the top of every logged in page.
   */

  const setToken = useContext(TokenContext);

  const history = useHistory();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    history.push("/");
  }

  return (
    <nav>
      <img onClick={logout} src={userIcon} alt="user-icon" />
    </nav>
  )
}

export default Nav;