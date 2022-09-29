import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import config from "./config.json";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import SignUpForm from "./components/signUpForm";
import Profile from "./components/Profile";
import MyMovies from "./components/myMovies";
import { getUser } from "./services/userService";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    user: {
      admin: false,
    },
    loggedIn: false,
  };

  async updateUserCredentials() {
    const app = initializeApp(config.fbConfig);
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (cred) => {
      if (cred) {
        this.setState({ loggedIn: true });
        await getUser().then((user) => {
          if (user) this.setState({ user });
          else this.setState({ loggedIn: false });
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  async componentDidMount() {
    await this.updateUserCredentials();
  }

  render() {
    const { admin } = this.state.user;
    const { loggedIn } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <ToastContainer />
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route
              path="/profile"
              element={
                loggedIn ? <Profile /> : <Navigate to="/login?then=profile" />
              }
            />
            <Route
              path="/login"
              element={loggedIn ? <Navigate to="/movies" /> : <LoginForm />}
            />
            <Route
              path="/movies/:id"
              element={
                admin ? (
                  <MovieForm />
                ) : loggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Navigate to="/login?then=movies" />
                )
              }
            />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/mymovies"
              element={
                loggedIn ? <MyMovies /> : <Navigate to="/login?then=mymovies" />
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route index element={<Navigate to="/movies" />} />
            <Route
              path="*"
              element={<Navigate to="/not-found" replace={false} />}
            />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
