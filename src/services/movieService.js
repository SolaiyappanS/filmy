import { initializeApp } from "firebase/app";
import { get, getDatabase, push, ref, remove, set } from "firebase/database";
import config from "../config.json";
import { toast } from "react-toastify";
import { getGenres } from "./genreService";
import { getUid } from "./userService";

const app = initializeApp(config.fbConfig);
const db = getDatabase(app);

export async function getMovies() {
  var movies = {};
  await get(ref(db, "movies"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        movies = snapshot.val();
      }
    })
    .catch((error) => {
      toast.error(error);
    });
  return Object.values(movies);
}

export async function getMovie(id) {
  var movie = {};
  await get(ref(db, "movies/" + id)).then((snap) => {
    movie = snap.val();
  });
  return movie;
}

export async function getUserMovies() {
  const uid = getUid();

  var allMovies = {};
  var userMovieIds = [];
  await get(ref(db, "users/" + uid + "/movies")).then((snap) => {
    if (snap.exists()) userMovieIds = Object.values(snap.val());
  });
  await get(ref(db, "movies"))
    .then((snapshot) => {
      if (snapshot.exists()) allMovies = snapshot.val();
    })
    .catch((error) => {
      toast.error(error);
    });

  return Object.values(
    filterObject(allMovies, (m) => userMovieIds.indexOf(m._id) !== -1)
  );
}

export async function saveMovie(movie, uid) {
  await isAdmin(uid).then(async (snap) => {
    if (snap === true) {
      const movies = await getMovies();
      const genres = await getGenres();
      let movieInDb = movies.find((m) => m._id === movie._id) || {};
      movieInDb.title = movie.title;
      movieInDb.genre = genres.find((g) => g._id === movie.genreId);
      movieInDb.numberInStock = movie.numberInStock;
      movieInDb.dailyRentalRate = movie.dailyRentalRate;

      if (!movieInDb._id) {
        movieInDb._id = Date.now().toString();
        movieInDb.movies = [];
      }

      set(ref(db, "movies/" + movieInDb._id), movieInDb);

      return movieInDb;
    } else toast.warn("Permission denied");
  });
}

export async function deleteMovie(id, uid) {
  var result = false;
  await isAdmin(uid).then(async (snap) => {
    if (snap === true) {
      await remove(ref(db, "movies/" + id));
      result = true;
    } else {
      toast.warn("Permission denied");
      result = false;
    }
  });
  return result;
}

export async function addMovie(id, uid) {
  var result = false;
  var movieIdList = [];

  await get(ref(db, "users/" + uid + "/movies")).then((snap) => {
    if (snap.exists()) movieIdList = Object.values(snap.val());
  });

  if (movieIdList.includes(id))
    toast.error((await getMovieName(id)) + " already added to My Movies");
  else
    await push(ref(db, "users/" + uid + "/movies"), id)
      .then(async () => {
        result = true;
        toast.success((await getMovieName(id)) + " added to My Movies");
      })
      .catch(() => {
        result = false;
        toast.warn("Permission denied");
      });
  return result;
}

export async function removeMovie(id, uid) {
  var result = false;
  var movieIdObj = [];

  await get(ref(db, "users/" + uid + "/movies")).then((snap) => {
    if (snap.exists()) movieIdObj = snap.val();
  });

  const movieIdList = Object.values(movieIdObj);
  const movieKeyList = Object.keys(movieIdObj);

  if (movieIdList.includes(id)) {
    await remove(
      ref(
        db,
        "users/" + uid + "/movies/" + movieKeyList[movieIdList.indexOf(id)]
      )
    );
    toast.success((await getMovieName(id)) + " removed from My movies.");
    result = true;
  } else {
    toast.error((await getMovieName(id)) + " already removed from My movies.");
    result = false;
  }
  return result;
}

export async function isAdmin(uid) {
  var result = false;
  await get(ref(db, "users/" + uid)).then((snap) => {
    result = snap.val().admin;
  });
  return result;
}

function filterObject(obj, callback) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(val, key))
  );
}

async function getMovieName(id) {
  const movie = await getMovie(id);
  if (movie) return movie.title;
  return "No movie";
}
