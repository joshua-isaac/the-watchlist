import React, { Component } from 'react'

import { Container } from 'react-bootstrap';

export default class Welcome extends Component {
  render() {
      const { user } = this.props;
    return (
     <Container>
        {user}
     </Container>
    )
  }
}
