import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import { withNavigate } from "../services/routerService";

class SignUpForm extends Form {
  state = {
    data: { username: "", password: "", confirmPassword: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
    confirmPassword: Joi.string().min(6).required().label("Password"),
    name: Joi.string().min(3).required().label("Name"),
  };

  doSubmit = async () => {
    await register(this.state.data).then((snap) => {
      if (snap) {
        this.props.navigate("/movies");
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Sign Up with Email</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("confirmPassword", "Confirm password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Sign Up")}
        </form>
      </div>
    );
  }
}

export default withNavigate(SignUpForm);
