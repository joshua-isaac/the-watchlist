import React, { Component } from 'react'
import firebase from '../config/Firebase';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import './MovieCard.css';

export default class MovieCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            overview: props.overview,
            poster: props.poster,
            rating: props.rating,
        }

    }

    addMovie(){
        const movieRef = firebase.database().ref(`watchlist/${this.props.user}`);

        const movie = {
            id: this.state.id,
            title: this.state.title,
            poster: this.state.poster,
            overview: this.state.overview,
            rating: this.state.rating
          };
    
          movieRef.push(movie);

    }

  render() {

    return (
      <Container>
        <Row className="movie-card mt-4 mb-4">
            <Col lg={3} sm={12} className="text-center">
                <img className="img-fluid" src={this.state.poster}
                     alt={this.state.title}
                    />
            </Col>
            <Col lg={6} sm={12}>
                <h1>{this.state.title}</h1>
                <p>{this.state.overview}</p>
                <h4>Rating: {this.state.rating}</h4>
                <Form>
                    <Button onClick={this.addMovie.bind(this)}>Add to Watchlist</Button>
                </Form>
            </Col>
        </Row>
      </Container>
    )
  }
}
