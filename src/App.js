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
    user: {
      name: "",
      username: "",
    },
  };

  async updateUserCredentials() {
    const app = initializeApp(config.fbConfig);
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (cred) => {
      if (cred) {
        await getUser(cred.uid).then((user) => this.setState({ user }));
      }
    });
  }

  async componentDidMount() {
    await this.updateUserCredentials();
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className="container">
          <ToastContainer />
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/movies/:id" element={<MovieForm />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route index element={<Navigate to="movies" />} />
            <Route path="*" element={<Navigate to="not-found" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
