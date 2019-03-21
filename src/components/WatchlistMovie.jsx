import React, { Component } from "react";

// Import Bootstrap Componenets
import { Row, Col, Button, Form, Container } from "react-bootstrap";

// Import Firebase
import firebase from "../config/Firebase";

// Import Styles
import "./WatchlistMovie.css";

// Import Twitter Share
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from "react-share";

export default class WatchlistMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      id: props.id,
      poster: props.poster,
      rating: props.rating,
      overview: props.overview
    };
  }

  // Remove movie from watchlist function
  removeItem() {
    const movieRef = firebase.database().ref(`watchlist/${this.props.user}`);
    movieRef
      .orderByChild("id")
      .equalTo(this.state.id)
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          // remove each child
          movieRef.child(childSnapshot.key).remove();
        });
      });
  }

  render() {
    const shareUrl = "https://the-watchlist.herokuapp.com/";

    return (
      <Container>
        <Row className="movie-card">
          <Col lg={3} sm={12} className="text-center">
            <img
              className="img-fluid"
              src={this.state.poster}
              alt={this.state.title}
            />
          </Col>
          <Col lg={6} sm={12}>
            <h1>{this.state.title}</h1>
            <p>{this.state.overview}</p>
            <h4>
              Rating: <span className="rating">{this.state.rating}</span>
            </h4>
            <Form>
              <Button
                variant="danger"
                className="remove-btn"
                onClick={this.removeItem.bind(this)}
              >
                Remove
              </Button>

              <div className="share">
              
              <TwitterShareButton
                className="twitter"
                url={shareUrl}
                title={
                  this.state.title + " is in my watchlist! What's in yours?"
                }
                className="inline"
              >
                <TwitterIcon className="twitter-icon" size={28} round />
              </TwitterShareButton>

              <FacebookShareButton
                url={shareUrl}
                quote={this.state.title + " is in my watchlist! what's in yours?"}
                className="inline"
              >
                <FacebookIcon size={28} round />
              </FacebookShareButton>
              
              </div>

            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
