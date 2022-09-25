import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getUid, getUser, saveUser } from "../services/userService";

class Profile extends Form {
  state = {
    data: { name: "" },
    user: { username: "", name: "", admin: false },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).required().label("Name"),
  };

  async componentDidMount() {
    const user = await getUser();
    const data = { name: user.name };
    this.setState({ data, user });
  }

  doSubmit = async () => {
    await saveUser(this.state.data.name, getUid()).then((snap) => {
      if (snap && this.state.data.name !== this.state.user.name) {
        window.location = "/";
      }
    });
  };

  render() {
    return (
      <div>
        <h1>My Profile</h1>
        {this.state.user.admin ? (
          <p style={{ color: "orange" }}>*Admin User</p>
        ) : null}
        <form onSubmit={this.handleSubmit}>
          {this.renderReadOnlyInput(
            "username",
            "Username",
            this.state.user.username
          )}
          {this.renderInput("name", "Name")}
          {this.renderButton("Edit Profile")}
        </form>
      </div>
    );
  }
}

export default Profile;
