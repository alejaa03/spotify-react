import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";
import Loader from "./components/Loader";
import Login from "./components/Login";
import ErrorPanel from "./components/ErrorPanel";
import Settings from "./components/Settings";
import swal from 'sweetalert';
import logic from "./logic";
import "./App.css";

const TOKEN =
  "BQCWpUWFuRSAxczaOI6cfD2XE-Q5hYgn-E9_x6DD9A1xkph_MlDJ6A0HQPtqnWIOHjSftYg16-ENLnaBbuO9Ue8H8vNWQYHLY6OlKk1wX3QKTOCe1k0O5FrDidcEp4mUF_6hDEAGTXKucc8v6iHWXw5suNohyWPIGkM1pG7aknc1Ptrjt7gv";

class App extends Component {
  state = {
    data: {},
    isDataLoaded: null,
    isLogged: logic.loggedIn,
    enableRegister: false,
    err: null,
    toggleSettings: false
  };

  isTyping = query => {
    if (!query.trim().length) {
      this.setState({
        isDataLoaded: null
      });
    } else if (this.state.isDataLoaded !== false) {
      this.setState({
        isDataLoaded: false,
        data: {}
      });
    }
  };

  // BACK BUTTON WORK IN PROGRESS //
  handleBack = e => {
    e.preventDefault();
    this.setState({
      data: {}
    });
  };

  handleLogOut = e => {
    e.preventDefault();
    this.setState({
      isLogged: false,
      data: {}
    });
    logic.logout();
  };

  callAPI = (query, category) => {
    if (query.trim().length > 0) {
      fetch(
        `https://api.spotify.com/v1/search?type=${category}&query=${query}`,
        {
          method: "get",
          headers: new Headers({
            Authorization: "Bearer " + TOKEN,
            Accept: "application/json"
          })
        }
      )
        .then(function(response) {
          return response.json();
        })
        .then(
          function(myJson) {
            let _category = category + "s";
            let items = myJson[_category].items;
            this.setState({
              data: items,
              isDataLoaded: true
            });
          }.bind(this)
        );
    }
  };
  updateCards = (data, token) => {
    let detail = "";
    if (data.type === "artist") {
      detail = "albums";
    } else if (data.type === "album") {
      detail = "tracks";
    }
    fetch(`https://api.spotify.com/v1/${data.type}s/${data.id}/${detail}`, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + token,
        Accept: "application/json"
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(
        function(myJson) {
          //error
          let items = myJson.items;
          this.setState({
            data: items
          });
        }.bind(this)
      );
  };

  toggleRegister = () => {
    this.setState({
      err: null,
      enableRegister: true
    });
  };

  toggleSettings = e => {
    e.preventDefault();
    if (this.state.toggleSettings) {
      this.setState({
        toggleSettings: false
      });
    } else {
      this.setState({
        toggleSettings: true
      });
    }
  };

  applySettings = (password, newUsername, newPassword) => {
    logic.updateUser(password, newUsername, newPassword).then(res => {
      swal("Update OK","You updated your credentials", "success")
      .then(this.setState({
        toggleSettings:false
      }))

    })
    .catch(err => {
      swal("Error",err.message,"error")
    })
  };

  disableRegister = () => {
    this.setState({
      enableRegister: false,
      err: null
    });
  };

  registerUser = (user, pass) => {
    logic
      .registerUser(user, pass)
      .then(res => {
        if (res) {
          this.setState({
            enableRegister: false
          });
        }
      })
      .catch(err => {
        this.setState({
          err: err.message
        });
      });
  };

  logUser = (user, pass) => {
    logic
      .loginUser(user, pass)
      .then(res => {
        if (res) {
          this.setState({
            isLogged: true,
            err: null
          });
        }
      })
      .catch(err => {
        this.setState({
          err: err.message
        });
      });
  };

  // renderData = () => {
  //   const { data } = this.state;
  //   if (Object.keys(data).length) {
  //       return data.map((e,i) => {
  //         return <Card data={e} key={i}/>
  //       }
  //     );
  //   }
  // };

  render() {
    if (this.state.isLogged && this.state.toggleSettings) {
      return (
        <Settings
          toggleSettings={this.toggleSettings}
          updateUsers={this.applySettings}
        />
      );
    }
    if (this.state.isLogged) {
      return (
        <div>
          <SearchBar
            callAPI={this.callAPI}
            isDataLoaded={this.state.isDataLoaded}
            isTyping={this.isTyping}
            handleBack={this.handleBack}
            handleLogOut={this.handleLogOut}
            toggleSettings={this.toggleSettings}
          />{" "}
          <div className="row">
            {" "}
            {this.state.isDataLoaded === false && <Loader />}{" "}
            <CardList
              data={this.state.data}
              token={TOKEN}
              updateCards={this.updateCards}
            />{" "}
          </div>{" "}
        </div>
      );
    } else {
      return (
        <div>
          <Login
            setRegister={this.registerUser}
            enableRegister={this.state.enableRegister}
            toggleRegister={this.toggleRegister}
            setLogin={this.logUser}
            isLogged={this.state.isLogged}
            disableRegister={this.disableRegister}
          />
          {this.state.err !== null && (
            <ErrorPanel errMessage={this.state.err} />
          )}
        </div>
      );
    }
  }
}

export default App;
