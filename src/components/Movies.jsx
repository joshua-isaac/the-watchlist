import React, { Component } from "react";

// Import Bootstrap Componenets
import { Container } from "react-bootstrap";

// Import Axios
import axios from "axios";

// Import App Componenets
import MovieCard from "./MovieCard";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  // Fetch Movies Function
  fetchMovies() {
    // Use axios to get data from api call
    axios.get(this.props.url).then(res => {
      console.log(res);
      const movies = res.data.results;
      this.setState({
        movies: movies
      });
    });
  }

  // Fetch movies when component mounts
  componentDidMount() {
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
            release={movie.release_date}
            user={this.props.user}
          />
        ))}
      </Container>
    );
  }
}
