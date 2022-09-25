import React from "react";
import Joi from "joi-browser";
import { withRouterAndNavigate } from "../services/routerService";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "./../services/movieService";
import { getUid } from "../services/userService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rating"),
  };

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });

    const movieId = this.props.params.id;
    if (movieId === "new") return;

    const movie = await getMovie(movieId);
    if (!movie) this.props.navigate("/not-found", { replace: true });

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data, getUid());

    this.props.navigate("/movies", { replace: false });
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rating", "number")}
          {this.renderButton("Save Movie")}
        </form>
      </div>
    );
  }
}

export default withRouterAndNavigate(MovieForm);
