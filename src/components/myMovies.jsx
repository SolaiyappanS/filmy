import React, { Component } from "react";
import ld from "lodash";
import MyMoviesTable from "./myMoviesTable";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { getUserMovies, removeMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import DropDown from "./common/dropDown";
import { getUid, getUser } from "../services/userService";

class MyMovies extends Component {
  state = {
    user: {},
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: { _id: "", name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
  };

  async updateUser() {
    const user = await getUser();
    this.setState({ user });
  }

  async updateMovieDatabase() {
    const movies = await getUserMovies();
    this.setState({ movies });
  }

  async updateGenreDatabase() {
    const genreList = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...genreList];
    this.setState({ genres });
  }

  async componentDidMount() {
    await this.updateGenreDatabase();
    await this.updateMovieDatabase();
  }

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

  handleRemove = async (movie) => {
    await removeMovie(movie._id, getUid()).then((snap) => {
      if (snap) this.updateMovieDatabase();
    });
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
            <div className="d-block d-sm-block d-md-none mx-1">
              <DropDown
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
                selectedItem={this.state.selectedGenre}
              />
            </div>
          </div>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div className="text-center">
            <MyMoviesTable
              user={this.state.user}
              movies={movies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onRemove={this.handleRemove}
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

export default MyMovies;
