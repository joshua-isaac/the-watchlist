import React, { Component } from "react";

import { Row, Col, Button, Form } from "react-bootstrap";

import firebase from '../config/Firebase';

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



  removeItem() {
    const movieRef = firebase.database().ref(`watchlist/${this.props.user}`);
    movieRef
        .orderByChild("id")
        .equalTo(this.state.id)
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {

                // remove each child
                movieRef.child(childSnapshot.key).remove();
            });
        });
  }

  render() {
    return (
      <Row className="movie-card mt-4 mb-4">
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
          <h4>Rating: {this.state.rating}</h4>
          <Form>
            <Button variant="danger" onClick={this.removeItem.bind(this)}>Remove From Watchlist</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
