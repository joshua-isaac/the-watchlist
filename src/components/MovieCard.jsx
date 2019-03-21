import React, { Component } from "react";

// Import Firebase
import firebase from "../config/Firebase";

// Import Bootstrap Components
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

// Import Styles
import "./MovieCard.css";

export default class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      overview: props.overview,
      poster: props.poster,
      rating: props.rating,
      release: props.release,
      show: false
    };
  }

  addMovie() {
    const movieRef = firebase.database().ref(`watchlist/${this.props.user}`);
    const movie = {
      id: this.state.id,
      title: this.state.title,
      poster: this.state.poster,
      overview: this.state.overview,
      rating: this.state.rating,
      release: this.state.release
    };
    this.setState({ show: true });
    movieRef.push(movie);
  }

  handleClick = () => {
    let currentId = this.state.id;
    const movieRef = firebase.database().ref(`watchlist/${this.props.user}`);
    movieRef
      .orderByChild("id")
      .equalTo(currentId)
      .once("value")
      .then(snapshot => {
        // PROMISES ARE WEIRD AF
        if (snapshot.numChildren() > 0) {
          //USE BLOCK TO TELL THE USERS THEY ALREADY ADDED THAT MOVIE TO THEIR WATCHLIST
        } else {
          this.addMovie();
        }
      });
  };

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <Container>
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Woohoo, {this.state.title} has been added to your watchlist!</p>
            <p>It'll hit the theatres on {this.state.release}.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="cta-btn" onClick={this.handleClose.bind(this)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className="movie-card">
          <Col lg={3} sm={12} className="text-center">
            <img
              className="img-fluid"
              src={this.state.poster}
              alt={this.state.title}
            />
          </Col>
          <Col lg={9} sm={12}>
            <h1>{this.state.title}</h1>
            <p>{this.state.overview}</p>
            <p>Release: {this.state.release}</p>
            <h4>
              Rating: <span className="rating">{this.state.rating}</span>
            </h4>
            <Form>
              <Button className="cta-btn add-btn" onClick={this.handleClick}>
                Add to Watchlist
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
