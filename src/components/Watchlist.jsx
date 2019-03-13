import React, { Component } from 'react'
import firebase from '../config/Firebase';

import { Container } from 'react-bootstrap';

import WatchlistMovie from './WatchlistMovie';

export default class Watchlist extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      watchlist: []
    }
  }



  componentDidMount(){
    console.log(this.props.user);
  }

  render() {

    // const movieRef = firebase.database().ref(`watchlist/${this.props.user}`);

    // movieRef.on("value", snapshot => {
    //   let movies = snapshot.val();

    //   console.log(movies);

    //   let newState = [];

    //   for(let movie in movies){
    //     newState.push({
    //       id: movies[movie].id,
    //       title: movies[movie].title,
    //       rating: movies[movie].rating,
    //       poster: movies[movie].poster
    //     });
    //   }

    //   this.setState({
    //     movies: newState
    //   });

    //   console.log(this.state.movies);

    // });


    return (
      <div>
        {
          
        }
        <Container>
            <WatchlistMovie

            />
        </Container>
      </div>
    )
  }
}
