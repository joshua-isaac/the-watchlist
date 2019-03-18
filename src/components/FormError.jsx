import React, { Component } from 'react'

// Import Bootstrap Components
import { Col } from 'react-bootstrap';

export default class FormError extends Component {
  render() {

    const { theMessage } = this.props;

    return (
      <Col className="alert alert-danger px-3">
        {theMessage}
      </Col>
    )
  }
}
