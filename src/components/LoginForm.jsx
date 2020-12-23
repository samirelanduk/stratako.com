import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import AuthForm from "./AuthForm";
import Button from "./Button";
import { LOGIN } from "../mutations";
import { UserContext } from "../contexts";
import { TOKEN } from "../queries";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [,setUser] = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState(false);
  const client = useApolloClient();

  const [login, loginMutation] = useMutation(LOGIN, {
    onCompleted: data => {
      setUser(data.login.user);
      client.cache.writeQuery({
        query: TOKEN, data: {accessToken: data.login.accessToken}
      });
      history.push("/");
    },
    onError: () => setError(true)
  });

  const formSubmit = e => {
    e.preventDefault();
    setError(false);
    login({
      variables: {email, password}
    });
  }

  return (
    <AuthForm className="login-form" onSubmit={formSubmit}>
      {error && <div className="error">Those credentials aren't valid.</div>}
      <div className="input">
        <label htmlFor="email">email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          autoCapitalize="none"
          required
        />
      </div>

      <div className="input">
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
      </div>
      <div className="links">
        <Button loading={loginMutation.loading}>Log In</Button>
        <Link className="auth-link" to="/">Sign Up</Link>
      </div>
    </AuthForm>
  );
};

LoginForm.propTypes = {
  
};

export default LoginForm;