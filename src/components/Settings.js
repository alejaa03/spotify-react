import React, { Component } from "react";
import logo from "../logo.svg";

class Settings extends Component {
  state = {
    newUsername: null,
    password: null,
    newPassword: null
  };
  handlerSettings = event => {
    event.preventDefault();
    const { newUsername, password,newPassword } = this.state;
    this.props.updateUsers(password, newUsername, newPassword);
  };

  keepNewUsername = event => {
      this.setState({
          newUsername: event.target.value
      })
  };

  keepPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  keepNewPassword = event => {
      this.setState({
          newPassword: event.target.value
      })
  };

  render() {
    return (
      <div className="text-center align-self p-3 ">
        <form
          className="form-signin"
          method="post"
          onSubmit={this.handlerSettings}
        >
          <h1 className="h3 mb-3 font-weight-normal">
            Change your username/password
          </h1>
          <img src={logo} className="App-logo" />
          <label className="sr-only" />
          <input
            type="text"
            className="form-control"
            placeholder="New Username"
            onChange={this.keepNewUsername}
            autoFocus
          />
          <label className="sr-only">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={this.keepPassword}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            onChange={this.keepNewPassword}
            required
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Submit registration{" "}
          </button>
          <p className="mt-5 mb-3 text-muted" />
        </form>
        <button className="btn btn-success" onClick={this.props.toggleSettings}>
          Go back
        </button>
      </div>
    );
  }
}

export default Settings;
