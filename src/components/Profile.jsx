import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getUser, saveUser } from "../services/userService";

class Profile extends Form {
  state = {
    data: { name: "" },
    user: { username: "", name: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).required().label("Name"),
  };

  async componentDidMount() {
    const user = await getUser(this.props.uid);
    const data = { name: user.name };
    this.setState({ data, user });
  }

  doSubmit = async () => {
    await saveUser(this.state.data.name, this.props.uid).then((snap) => {
      if (snap && this.state.data.name !== this.state.user.name) {
        window.location = "/";
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Edit Profile</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderReadOnlyInput(
            "username",
            "Username",
            this.state.user.username
          )}
          {this.renderInput("name", "Name")}
          {this.renderButton("Save", false)}
        </form>
      </div>
    );
  }
}

export default Profile;
