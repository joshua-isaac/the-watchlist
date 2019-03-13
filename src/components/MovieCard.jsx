import React, { Component } from "react";
import firebase from "../config/Firebase";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

import "./MovieCard.css";
import ModalAlert from "./ModalAlert";

export default class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      overview: props.overview,
      poster: props.poster,
      rating: props.rating,
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
      rating: this.state.rating

    };

    this.setState({ show: true });

    movieRef.push(movie);
  }

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
              </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

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
              <Button onClick={this.addMovie.bind(this)}>
                Add to Watchlist
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
