import React, { Component } from "react";

// Import Firebase
import firebase from "../config/Firebase";

// Import Bootstrap Componenets
import { Container } from "react-bootstrap";

// Import App Components
import WatchlistMovie from "./WatchlistMovie";

export default class Watchlist extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      watchlist: []
    };
  }

  componentDidMount() {
    console.log(this.props.user);

    // set up movie ref to the user's watchlist
    const movieRef = firebase.database().ref(`watchlist/${this.props.user}`);

    // recieve records from database
    movieRef.on("value", snapshot => {
      let movies = snapshot.val();

      console.log(movies);

      let newState = [];

      // Push movie data from db into state of component so we can use it
      for (let movie in movies) {
        newState.push({
          id: movies[movie].id,
          title: movies[movie].title,
          overview: movies[movie].overview,
          rating: movies[movie].rating,
          poster: movies[movie].poster
        });
      }

      this.setState({
        watchlist: newState
      });
    });
  }

  render() {
    return (
      <Container>
        {!this.state.watchlist && <p>no movies</p>}

        {this.state.watchlist.map(item => (
          <WatchlistMovie
            className="watchlist-movie"
            key={item.id}
            id={item.id}
            title={item.title}
            poster={item.poster}
            overview={item.overview}
            rating={item.rating}
            user={this.props.user}
          />
        ))}
      </Container>
    );
  }
}
