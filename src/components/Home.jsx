import React, { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";

import './Home.css';

export default class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="home">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col col={10} md={10} lg={8} xl={7} className="mt-4">
            <h1>The Watchlist</h1>
            <p className="lead">

            </p>
            {/* if user has a value is true, show movies btn*/}
            {user && (
              <a href="/movies" className="btn btn-primary mr-2">
                Browse Movies
              </a>
            )}
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}
