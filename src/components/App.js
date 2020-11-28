import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import HomePage from "../pages/HomePage";
import { makeClient } from "../api";
import OperationsPage from "../pages/OperationsPage";

const client = makeClient();

const App = () => {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/operations/" exact>
            <OperationsPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

App.propTypes = {
    
};

export default App;