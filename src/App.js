import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")));

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
    <BrowserRouter>
      <Route path="/" exact>
        {loggedIn ? <div /> : <LandingPage login={login} />}
      </Route>
      <Route path="/login/" exact>
        <LoginPage login={login} />
      </Route>
    </BrowserRouter>
  );
}