import React, { Component } from "react";
import Table from "./common/table";

class MyMoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rating" },
    {
      key: "Delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onRemove(movie)}
          className="btn btn-danger btn-sm"
        >
          Remove
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
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
