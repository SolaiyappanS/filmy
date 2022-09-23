import React, { Component } from "react";
import ld from "lodash";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { withNavigate } from "../services/routerService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: { _id: "", name: "All Movies" },
    sortColumn: { path: "title", order: "asc" },
  };

  async updateMovieDatabase() {
    const movies = await getMovies();
    this.setState({ movies });
  }

  async updateGenreDatabase() {
    const genreList = await getGenres();
    const genres = [{ _id: "", name: "All Movies" }, ...genreList];
    this.setState({ genres });
  }

  async componentDidMount() {
    this.updateGenreDatabase();
    this.updateMovieDatabase();
  }

  handleDelete = async (movie) => {
    await deleteMovie(movie._id, this.props.uid).then((snap) => {
      if (snap) this.props.navigate("/");
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
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
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          {this.props.user.admin ? (
            <Link to="/movies/new" className="btn btn-primary mb-2">
              New Movie
            </Link>
          ) : null}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            user={this.props.user}
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
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
    );
  }
}

export default withNavigate(Movies);
