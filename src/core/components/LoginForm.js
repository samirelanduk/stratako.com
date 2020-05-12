import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import classnames from "classnames";
import ClipLoader from "react-spinners/ClipLoader";
import { LOGIN } from "../mutations";

const LoginForm = props => {
  /**
   * A form for sending user credentials and getting a JWT token back.
   */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "", password: "", general: ""
  });

  const history = useHistory();

  const [login, loginMutation] = useMutation(LOGIN, {
    onError: ({graphQLErrors}) => {
      const errorObj = {email: "", password: ""};
      try {
        const message = JSON.parse(graphQLErrors[0].message); 
        for (let field of Object.keys(message)) {
          errorObj[field] = message[field][0]
        }
        setErrors(errorObj);
      } catch {
        errorObj.general = "An error occured."; 
      }
      setErrors(errorObj);
    },
    onCompleted: ({login: {token}}) => {
      history.push("/");
      localStorage.setItem("token", token);
      props.setToken(token);
    }
  });

  const submitForm = e => {
    e.preventDefault();
    login({variables: {email, password}});
  }

  const className = classnames({
    "login-form": true, "loading": loginMutation.loading
  })

  return (
    <form className={className} onSubmit={submitForm}>
      <ClipLoader
        size={150}
        color={"#484848"}
        css="position: absolute; opacity: 1; left: 50%; margin-left: -75px;"
        loading={loginMutation.loading}
      />
      <Link className="logo" to="/">stratako</Link>
      {errors.general && <div className="general-error error">{errors.general}</div>}
      <div className="input">
          <label htmlFor="email">Email</label>
          {errors.email && <div className="error">{errors.email}</div>}
          <input
            type="email"
            id="email"
            required={true}
            value={email} 
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          />
      </div>

      <div className="input">
          <label htmlFor="password">Password</label>
          {errors.password && <div className="error">{errors.password}</div>}
          <input
            type="password"
            id="password"
            required={true}
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
      </div>

      <input type="submit" value="Log In" />
    </form>
  )
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginForm;