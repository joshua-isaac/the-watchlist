import React, { Component } from 'react'
import firebase from '../config/Firebase';

import { Container, Row, Col } from 'react-bootstrap';

import WatchlistMovie from './WatchlistMovie';

export default class Watchlist extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
    }
  }

  render() {

    console.log(this.props.user);

    const movieRef = firebase.database().ref(`watchlist/${this.props.user}`);

    movieRef.on("value", snapshot => {
      let movies = snapshot.val();

      console.log(movies);

      let newState = [];

      for(let movie in movies){
        newState.push({
          id: movies[movie].id,
          title: movies[movie].title,
          overview: movies[movie].overview,
          rating: movies[movie].rating,
          poster: movies[movie].poster
        });

      }

      console.log(newState);

      this.setState({
        movies: newState
      });

      console.log(movies);

    });

    return (
      <div>
        <Container>
          {this.state.movies.map(movie => (
             <WatchlistMovie

              />
          ))}
        </Container>
      </div>
    )
  }
}
