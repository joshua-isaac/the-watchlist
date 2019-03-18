import React, { Component } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";

import './Home.css';

export default class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="home">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col col={10} md={10} lg={10} xl={7} className="mt-4">
            <h1>The Watchlist</h1>
            <p className="lead">
              Remember that new movie your friend told you to watch? Probably not. Never forget to watch a movie again, with The Watchlist.
            </p>
            { !user && (
              <Button className="cta-btn" href="/login">Get Started</Button>
            )

            }
            {/* if user has a value is true, show movies btn*/}
            {user && (
              <Button href="/movies" className="cta-btn">
                Browse Movies
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}
