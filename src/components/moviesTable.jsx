import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
  ];

  addMovieColumn = {
    key: "AddMovie",
    content: (movie) => {
      if (
        this.props.user.movies &&
        Object.values(this.props.user.movies).includes(movie._id)
      )
        return (
          <button
            onClick={() => this.props.onRemoveMovie(movie)}
            className="btn btn-success btn-sm"
          >
            Added to My Movies
          </button>
        );
      else
        return (
          <button
            onClick={() => this.props.onAddMovie(movie)}
            className="btn btn-primary btn-sm"
          >
            Add to My Movies
          </button>
        );
    },
  };

  deleteColumn = {
    key: "Delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete Movie
      </button>
    ),
  };

  movieNameColumn = { path: "title", label: "Title" };

  movieLinkColumn = {
    path: "title",
    label: "Title",
    content: (movie) => (
      <Link style={{ textDecoration: "none" }} to={`/movies/${movie._id}`}>
        {movie.title}
      </Link>
    ),
  };

  render() {
    const { movies, sortColumn, onSort } = this.props;
    if (movies.length <= 0) return <p>No movies to show in the database</p>;
    return (
      <Table
        items={movies}
        columns={
          this.props.loggedIn
            ? this.props.user.admin
              ? [
                  this.movieLinkColumn,
                  ...this.columns,
                  this.addMovieColumn,
                  this.deleteColumn,
                ]
              : [this.movieNameColumn, ...this.columns, this.addMovieColumn]
            : [this.movieNameColumn, ...this.columns]
        }
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
