import React, { Component } from "react";
import logo from "../logo.svg";
import Register from "./Register";
class Login extends Component {
  state = {
    username: null,
    password: null
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

  handleLogin = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.setLogin(username, password);
  };



  render() {
    if (!this.props.enableRegister) {
      return (
        <div className="text-center align-self p-3 ">
          <form className="form-signin" method="post" onSubmit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <img src={logo} className="App-logo" />
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={this.keepUsername}
              required
              autoFocus
            />
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
              Login{" "}
            </button>
            <p className="mt-5 mb-3 text-muted" />
          </form>
          <button onClick={this.props.toggleRegister} className="btn btn-dark">Go to register</button>
        </div>
      );
    } else {
      return (
        <Register
          setRegister={this.props.setRegister}
          disableRegister={this.props.disableRegister}
        />
      );
    }
  }
}

export default Login;
