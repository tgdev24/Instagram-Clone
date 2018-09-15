// src.App.js

import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import {ApolloProvider} from 'react-apollo';
import {createHttpLink} from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

//make sure to use 2 // for the uri
const client = new ApolloClient({
  link: new createHttpLink({
    uri: "http://localhost:4000/graphql"
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  context: {
    headers: {
      accept: 'application/json' 
    }
  }
});

const App=() => {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <section className="App-main">
            <Posts/>
          </section>
        </div>
      </ApolloProvider>
    );
}

export default App;