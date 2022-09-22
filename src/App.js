import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "./services/userService";

class App extends Component {
  state = {
    uid: "",
    user: {
      admin: false,
      name: "",
      username: "",
    },
    loggedIn: false,
  };

  async updateUserCredentials() {
    const app = initializeApp(config.fbConfig);
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (cred) => {
      if (cred) {
        this.setState({ uid: cred.uid, loggedIn: true });
        await getUser(cred.uid).then((user) => this.setState({ user }));
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
    const { loggedIn, uid, user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <ToastContainer />
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/login"
              element={loggedIn ? <Navigate to="/movies" /> : <LoginForm />}
            />
            <Route
              path="/movies/:id"
              element={
                admin ? (
                  <MovieForm uid={uid} />
                ) : loggedIn ? (
                  <Navigate to="/movies" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/movies" element={<Movies uid={uid} user={user} />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route index element={<Navigate to="/movies" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
