import React, { Component } from "react";

// Import Bootstrap Components
import { Container, Row, Col } from "react-bootstrap";

// Import Styles
import "./FAQ.css";

export default class FAQ extends Component {
  render() {
    return (
      <Container className="faq-container">
        <Row>
          <Col lg={9} className="mx-auto">
            <h1 className="text-center">FAQ</h1>
            <p className="faq-text">
              The Watchlist is a Web App where users can add new and upcoming
              movies to their list, so they never forget to watch it. The
              Watchlist is built using{" "}
              <a href="https://reactjs.org/" target="_blank">
                React.js
              </a>{" "}
              for the user interface, and{" "}
              <a href="https://react-bootstrap.github.io/" target="_blank">
                React-Bootstrap
              </a>{" "}
              for it's responsiveness.{" "}
              <a href="https://firebase.google.com/" target="_blank">
                Google Firebase
              </a>{" "}
              is used for user authentication, and for its real-time database to
              store movies. All the movie data is fetched from the{" "}
              <a href="https://www.themoviedb.org/" target="_blank">
                Movie DB API
              </a>{" "}
              using <a href="https://www.npmjs.com/package/axios">Axios.</a>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
