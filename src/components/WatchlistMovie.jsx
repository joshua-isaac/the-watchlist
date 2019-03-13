import React, { Component } from 'react'

import { Row, Col, Button } from 'react-bootstrap';

export default class WatchlistMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            poster: props.poster,
            overview: props.overview,
            rating: props.rating
        }
    }

  render() {
    return (
        <p>hi from watchlist movie</p>
    )
  }
}
