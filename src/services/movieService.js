import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import config from "../config.json";
import { toast } from "react-toastify";
import { getGenres } from "./genreService";

const app = initializeApp(config.fbConfig);
const db = getDatabase(app);
const dbRef = ref(db);

export async function getMovies() {
  var movies = [];
  await get(child(dbRef, "movies"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        movies = snapshot.val();
      } else {
        toast.warn("No data available");
      }
    })
    .catch((error) => {
      toast.error(error);
    });
  return Object.keys(movies).map((key) => movies[key]);
}

export async function getMovie(id) {
  var movies = await getMovies();
  return movies.find((m) => m._id === id);
}

export async function saveMovie(movie) {
  const movies = await getMovies();
  const genres = await getGenres();
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genres.find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movieInDb.liked = false;
  }

  set(ref(db, "movies/" + movieInDb._id), movieInDb);

  return movieInDb;
}

export async function deleteMovie(id) {
  await remove(ref(db, "movies/" + id));
}
