import React, { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";

import './Home.css';

class Home extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div className="home">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col col={10} md={10} lg={8} xl={7} className="mt-4">
            <h1>The Watchlist</h1>
            <p className="lead">
              This simple app creates meetings, allows people to check in, and
              picks random users to award giveaways. It's a good example of a
              Single Page Application which includes connection to a database
              and routing. It's a practical way to learn{" "}
              <a href="https://reactjs.org/">React </a>
              with <a href="https://firebase.google.com">Firebase</a>.
            </p>

            {/* if user has no value is true, show login and register btns*/}
            {user == null && (
              <div>
                <a href="/register" className="btn btn-outline-primary mr-2">
                  Register
                </a>
                <a href="/login" className="btn btn-primary mr-2">
                  Login
                </a>
              </div>
            )}
            {/* if user has a value is true, show movies btn*/}
            {user && (
              <a href="/movies" className="btn btn-primary mr-2">
                Movies
              </a>
            )}
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Home;
