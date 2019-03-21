import React, { Component } from "react";

// Import Firebase
import firebase from "../config/Firebase";

// Import Bootstrap Componenets
import { Container, Row, Col, Button } from "react-bootstrap";

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

    // const shareUrl = "https://the-watchlist.herokuapp.com/";
    // const movies = this.state.watchlist.map(item => {
    //   return (item.title);
    // });

    // // let text

    // // if (movies.length > 1) {
    // //   text = ' are in my Watchlist! What\'s in yours?';
    // // } else {
    // //   text = ' is in my Watchlist! What\'s in yours?';
    // // }

    return (
      <Container>

        {/* <Row>
          <Col lg={12} sm={12} className="mx-auto">

            <div className="share text-center">
              <span className="text-center">
              <TwitterShareButton
                url={shareUrl}
                title={' ' + movies + text}
              >
                <TwitterIcon className="twitter-icon" size={48} round />
              </TwitterShareButton>
              </span>
            </div>
          </Col>
          </Row> */}

          <Row>
            <Col lg={12}>

            <div className="no-movie">
              {this.state.watchlist.length === 0 && (
                <div>
                  <h1>Uh oh, looks like there are no movies in your watchlist :(</h1>
                    <Button href="/movies" className="cta-btn">
                    Browse Movies
                </Button>
                </div>
              )}
            </div>
            </Col>
        </Row>

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
