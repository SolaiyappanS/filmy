import React, { Component } from "react";
import Table from "./common/table";

class MyMoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    {
      key: "Delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onRemove(movie)}
          className="btn btn-danger btn-sm"
        >
          Remove from My Movies
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    if (movies.length <= 0) return <p>No movies to show in the database</p>;
    return (
      <Table
        items={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MyMoviesTable;
