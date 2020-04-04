import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  return (
    <BrowserRouter>
      <Route path="/" exact>
        {loggedIn ? <div /> : <LandingPage />}
      </Route>
    </BrowserRouter>
  );
}