import React, { Component } from "react";
import "./App.css";

// Libraries
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './config/Firebase';

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Movies from './components/Movies';
import Watchlist from './components/Watchlist';
import Register from './components/Register';


class App extends Component {

  constructor(){
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount(){

    // set up reference to our firebase db
    const ref = firebase.database().ref('user');

    // whenever we get a value from the reference recieve snapshot
    ref.on('value', snapshot => {

      // set snapshot to FBUser
      let FBUser = snapshot.val();

      // set the state of the user to FBUser
      this.setState({
        user: FBUser
      })

      // log state
      console.log(this.state.user);
    });
  }

  render() {
    return (
      <Router>
      <div>
        <Navigation user={this.state.user} />
        <Switch>
          <Route exact path="/" component={Home} user={this.state.user}/>
          <Route path="/movies" component={Movies} user={this.state.user} />
          <Route path="/watchlist" component={Watchlist} user={this.state.user} />
          <Route path="/register" component={Register} user={this.state.user} />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
