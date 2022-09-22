import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import { withNavigate } from "../services/routerService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default withNavigate(RegisterForm);
