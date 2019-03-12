import React, { Component } from 'react'

import { Container } from 'react-bootstrap';
import axios from 'axios';

import MovieCard from './MovieCard';

export default class Movies extends Component {
    constructor(props){
        super(props);
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
    console.log(this.props.user);

      
    return (
      <Container>
          {this.state.movies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster={`http://image.tmdb.org/t/p/w300//${movie.poster_path}`}
                rating={movie.vote_average}
                user={this.props.user}
              />
          ))}
      </Container>
    )
  }
}
