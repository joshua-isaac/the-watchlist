import React, { Component } from "react";
import "./App.css";

// Libraries
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Router, navigate } from "@reach/router";
import firebase from "./config/Firebase";

// Components
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Register from "./components/Register";
import Login from "./components/Login";

// API Call
const API_KEY = "7b9e2473f094d438dd1ce87d0bcb97af";
const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
      url: url
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate("/movies");
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });
    firebase
      .auth()
      .signOut()
      .then(() => {
      navigate('/');
    });
  };


  render() {
    return (

      <div>
        <Navigation user={this.state.user}
                    logOutUser={this.logOutUser}
         />
        <Router>
          <Home exact path="/"
                user={this.state.user}
           />
          <Movies path="/movies" 
                  user={this.state.userID} 
                  url={this.state.url}
           />
          <Watchlist path="/watchlist"
                     user={this.state.user}
           />
          <Register path="/register"
                    registerUser={this.registerUser}
           />
          <Login path="/login" />
        </Router>
      </div>
    );
  }
}

export default App;
