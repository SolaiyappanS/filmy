import React, { Component } from "react";
import { Link } from "react-router-dom";
import ld from "lodash";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import DropDown from "./common/dropDown";
import {
  getMovies,
  deleteMovie,
  addMovie,
  removeMovie,
} from "../services/movieService";
import { getGenres } from "../services/genreService";
import { getUid, getUser } from "../services/userService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    user: { admin: false },
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: { _id: "", name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
  };

  async updateMovieDatabase() {
    const movies = await getMovies();
    this.setState({ movies });
  }

  async updateUser() {
    const user = await getUser();
    this.setState({ user });
  }

  async updateGenreDatabase() {
    const genreList = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...genreList];
    this.setState({ genres });
  }

  async componentDidMount() {
    await this.updateGenreDatabase();
    await this.updateMovieDatabase();
    await this.updateUser();
  }

  handleAddMovie = async (movie) => {
    await addMovie(movie._id, getUid()).then((snap) => {
      if (snap) {
        this.updateUser();
        this.updateMovieDatabase();
      }
    });
  };

  handleRemoveMovie = async (movie) => {
    await removeMovie(movie._id, getUid()).then((snap) => {
      if (snap) {
        this.updateUser();
        this.updateMovieDatabase();
      }
    });
  };

  handleDelete = async (movie) => {
    await deleteMovie(movie._id, getUid()).then((snap) => {
      if (snap) this.updateMovieDatabase();
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: { _id: "", name: "All Genres" },
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies: allMovies,
    } = this.state;

    let filteredMovies = allMovies;

    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === selectedGenre._id
      );

    const sortedMovies = ld.orderBy(
      filteredMovies,
      sortColumn.path,
      sortColumn.order
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { moviesCount: filteredMovies.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { moviesCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3 d-none d-sm-none d-md-block my-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <div className="d-flex flex-row my-3">
            {this.state.user && this.state.user.admin ? (
              <Link to="/movies/new" className="btn btn-primary mx-2">
                Add Movie
              </Link>
            ) : null}
            <div className="d-block d-sm-block d-md-none">
              <DropDown
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
                selectedItem={this.state.selectedGenre}
              />
            </div>
          </div>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div className="text-center">
            <MoviesTable
              user={this.state.user}
              loggedIn={getUid()}
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onAddMovie={this.handleAddMovie}
              onRemoveMovie={this.handleRemoveMovie}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={moviesCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
