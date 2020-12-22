import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import { UserContext } from "../contexts";
import { TOKEN } from "../queries";
import { LOGOUT } from "../mutations";

const Nav = props => {

  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const client = useApolloClient();

  const [logout, logoutMutation] = useMutation(LOGOUT, {
    onCompleted: () => {
      setUser(false);
      client.cache.writeQuery({query: TOKEN, data: {accessToken: null}});
      for (let path of [/\/settings\//, /\/@(.+?)\/edit\//]) {
        if (path.test(location.pathname)) {
          history.push("/");
          break;
        }
      }
    }
  });

  return (
    <nav>
      <div onClick={logout}>Log out</div>
      <Link to="/">Home</Link>
      <Link to="/settings/">Settings</Link>
    </nav>
  );
};

Nav.propTypes = {
  
};

export default Nav;