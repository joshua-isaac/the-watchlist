import React, { Component } from 'react'

import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state = {
            movies: []
        }
    }

  fetchMovies(){
    // Use axios to get data from api call
    axios.get(this.props.url).then((res) => {
    console.log(res);
    const movies = res.data.results;
    this.setState({
        movies: movies
    })
    });
  }

  componentDidMount(){
      this.fetchMovies();
  }

  render() {

      
    return (
      <div>
        {/* {this.state.movies.map(movie => (
            // <MovieTile 
            //     key={movie.id}
            //     id={movie.id}
            // />
        ))} */}
      </div>
    )
  }
}
