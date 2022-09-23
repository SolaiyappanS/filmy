import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rating" },
    {
      key: "Like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: "Delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
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
    return (
      <Table
        items={movies}
        columns={
          this.props.user.admin
            ? [this.movieLinkColumn, ...this.columns, this.deleteColumn]
            : [this.movieNameColumn, ...this.columns]
        }
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
