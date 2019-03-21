import React, { Component } from "react";

// Import Firebase
import firebase from "../config/Firebase";

// Import Bootstrap Componenets
import { Container } from "react-bootstrap";

// Import App Components
import WatchlistMovie from "./WatchlistMovie";

// Import Styles
import "./Watchlist.css";

// Import Twitter Share
import { TwitterShareButton, TwitterIcon } from "react-share";

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
    const shareUrl = "https://the-watchlist.herokuapp.com/";
    const movies = this.state.watchlist.map(item => {
      return (item.title);
    });

let text

    if(movies.length > 1){
       text = ' are in my Watchlist! What\'s in yours?';
    } else {
       text = ' is in my Watchlist! What\'s in yours?';
    }

    return (
      <Container>
        <div className="no-movie">
          {this.state.watchlist.length === 0 && (
            <h1>Uh oh, looks like there are no movies in your watchlist :(</h1>
          )}
        </div>

        <div className="share">

          <TwitterShareButton
            url={shareUrl}
            title={' ' + movies + text }
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

        </div>

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
