import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/userService";
import { withRouterAndNavigate } from "../services/routerService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    if (await login(this.state.data)) {
      const thenPath = this.props.searchParams.get("then")
        ? "/" + this.props.searchParams.get("then")
        : "";
      this.props.navigate(thenPath);
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouterAndNavigate(LoginForm);
