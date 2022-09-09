import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Routes>
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
