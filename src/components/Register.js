import React, { Component } from "react";
import logo from "../logo.svg";

class Register extends Component {
  state = {
    username: null,
    password: null
  };

  handleRegister = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.setRegister(username, password)
  };

  keepUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  keepPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    return (
      <div className="text-center align-self p-3 ">
        <form className="form-signin" method="post" onSubmit={this.handleRegister}>
          <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
          <img src={logo} className="App-logo" />
          <label className="sr-only" />
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={this.keepUsername}
            required="required"
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
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Submit registration{" "}
          </button>
          <p className="mt-5 mb-3 text-muted" />
        </form>
        <button className="btn btn-success" onClick={this.props.disableRegister}>Go back</button>
      </div>
    );
  }
}

export default Register;
