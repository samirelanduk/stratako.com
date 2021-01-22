import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import { TOKEN } from "../queries";
import { SIGNUP } from "../mutations";
import { UserContext } from "../contexts";
import { createErrorObject } from "../forms";
import AuthForm from "./AuthForm";
import Button from "./Button";

const SignupForm = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [,setUser] = useContext(UserContext);
  const history = useHistory();
  const client = useApolloClient();

  const [signup, signupMutation] = useMutation(SIGNUP, {
    onCompleted: data => {
      setUser(data.signup.user);
      client.cache.writeQuery({
        query: TOKEN, data: {accessToken: data.signup.accessToken}
      });
      history.push("/");
    },
    onError: ({graphQLErrors}) => {
      setErrors(createErrorObject(errors, graphQLErrors))
    }
  });

  const formSubmit = e => {
    e.preventDefault();
    signup({
      variables: {password, name, email}
    });
  }

  return (
    <AuthForm className="signup-form" onSubmit={formSubmit}>

      <div className="logo">stratako</div>

      {errors.general && <div className="error">There was an error.</div>}

      <div className={errors.name ? "input error-input" : "input"}>
        <label htmlFor="name">name</label>
        <div className="error-container">
          {errors.name && <div className="error">{errors.name}</div>}
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
      </div>

      <div className={errors.email ? "input error-input" : "input"}>
        <label htmlFor="email">email</label>
        <div className="error-container">
          {errors.email && <div className="error">{errors.email}</div>}
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>

      <div className={errors.password ? "input error-input" : "input"}>
        <label htmlFor="password">password</label>
        <div className="error-container">
          {errors.password && <div className="error">{errors.password}</div>}
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
      </div>

      <div className="links">
        <Button loading={signupMutation.loading}>Sign Up</Button>
        <Link className="auth-link" to="/login/">Log In</Link>
      </div>
        
    </AuthForm>
  );
};

SignupForm.propTypes = {
  
};

export default SignupForm;