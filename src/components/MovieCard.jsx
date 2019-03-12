import React, { Component } from 'react'

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
            rating: props.rating
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.addMovie(
            this.state.id,
            this.state.title,
            this.state.overview,
            this.state.poster,
            this.state.rating
            );
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
                <Form onSubmit={this.handleSubmit}>
                    <Button type="submit" onClick={this.addMovie}>Add to Watchlist</Button>
                </Form>
            </Col>
        </Row>
      </Container>
    )
  }
}
