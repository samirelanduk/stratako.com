import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import classnames from "classnames";
import ClipLoader from "react-spinners/ClipLoader";
import { SIGNUP } from "../mutations";

const SignupForm = props => {
  /**
   * A form for taking user information and sending them to server in return for
   * the JWT token of a new user.
   */

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "", lastName: "", email: "", password: "", general: ""
  });

  const [signup, signupMutation] = useMutation(SIGNUP, {
    onError: ({graphQLErrors}) => {
      const errorObj = {firstName: "", lastName: "", email: "", password: ""};
      try {
        const message = JSON.parse(graphQLErrors[0].message);
        for (let field of Object.keys(message)) {
          errorObj[field] = message[field][0];
        }
        
      } catch {
        errorObj.general = "An error occured."; 
      }
      setErrors(errorObj);
      
    },
    onCompleted: ({signup: {token}}) => {
      localStorage.setItem("token", token);
      props.setToken(token);
    }
  });

  const submitForm = e => {
    e.preventDefault();
    signup({variables: {firstName, lastName, email, password}});
  }

  const className = classnames({
    "signup-form": true, "loading": signupMutation.loading
  })

  return (
    <form className={className} onSubmit={submitForm}>
      <ClipLoader
        size={150}
        color={"#484848"}
        css="position: absolute; opacity: 1; left: 50%; margin-left: -75px;"
        loading={signupMutation.loading}
      />
      {errors.general && <div className="general-error error">{errors.general}</div>}
      <div className="input">
          <label htmlFor="firstName">First Name</label>
          {errors.firstName && <div className="error">{errors.firstName}</div>}
          <input
            type="text"
            id="firstName"
            required={true}
            autoComplete="given-name"
            value={firstName} 
            onChange={e => setFirstName(e.target.value)}
          />
      </div>
      <div className="input">
          <label htmlFor="lastName">Last Name</label>
          {errors.lastName && <div className="error">{errors.lastName}</div>}
          <input
            type="text"
            id="lastName"
            required={true}
            autoComplete="family-name"
            value={lastName} 
            onChange={e => setLastName(e.target.value)}
          />
      </div>
      <div className="input">
          <label htmlFor="email">Email</label>
          {errors.email && <div className="error">{errors.email}</div>}
          <input
            type="email"
            id="email"
            required={true}
            autoComplete="email"
            value={email} 
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
            autoComplete="new-password"
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
      </div>

      <input type="submit" value="Sign Up" />

      <div className="links">
        <Link to="/login/">Log In</Link>
        <Link to="/policy/">Privacy Policy</Link>
      </div>
    </form>
  )
}

SignupForm.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default SignupForm;