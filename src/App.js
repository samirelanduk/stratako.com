import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { ApolloProvider } from "@apollo/react-hooks";
import { makeClient } from "./api";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GoalsPage from "./pages/GoalsPage";
import GoalPage from "./pages/GoalPage";
import GoalCategoryPage from "./pages/GoalCategoryPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  const client = makeClient();

  const login = (token, history) => {
    localStorage.setItem("token", token);
    history.push("/");
    setLoggedIn(true);
  }
  
  const logout = () => {
    localStorage.removeItem("token");
    //client.resetStore();
    setLoggedIn(false);
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route path="/" exact>
          {loggedIn ? <HomePage logout={logout} /> : <LandingPage login={login} />}
        </Route>
        <Route path="/login/" exact>
          <LoginPage login={login} />
        </Route>
        <Route path="/goals/" exact>
          <GoalsPage logout={logout} />
        </Route>
        <Route path="/goals/:id/" exact>
          <GoalPage logout={logout} />
        </Route>
        <Route path="/goals/categories/:id/" exact>
          <GoalCategoryPage logout={logout} />
        </Route>
      </BrowserRouter>
    </ApolloProvider>
    
  );
}