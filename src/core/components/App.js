import React, { useState } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import TokenContext from "../context";
import { makeClient } from "../api";
import LoginPage from "../pages/LoginPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";

export default () => {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const client = makeClient();

  if (token) {
    return (
      <TokenContext.Provider value={setToken}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/policy/" exact>
                <PrivacyPolicyPage />
              </Route>
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </TokenContext.Provider>
    );
  }
  
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LandingPage setToken={setToken} />
          </Route>
          <Route path="/login/" exact>
            <LoginPage setToken={setToken} />
          </Route>
          <Route path="/policy/" exact>
            <PrivacyPolicyPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}