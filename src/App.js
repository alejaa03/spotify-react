import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";
import Loader from "./components/Loader";
import "./App.css";

const TOKEN =
  "BQDfJiHsesRgxbl7IO7wd3bHhuOX7Fb2fEYsvXoJ4JpeX5sZki2GIMgi46CgAN0OroHtCDy_Hg3GebXHhdFN7S5SLMKtjm1zpZNZNO7eE0dBn5zytmyMJKoDVpmhXOdy1a1zfK4EhsJf2WEZC7fgdOy31rzjAAkTEsxyYsFRubMK0_BvhStC";

class App extends Component {
  state = {
    data: {},
    isDataLoaded: null
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
  handleBack = () => {
    this.setState(prevState => {
      return { data: prevState.data };
    });
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
    return (
      <div className="App">
        <SearchBar
          callAPI={this.callAPI}
          isDataLoaded={this.state.isDataLoaded}
          isTyping={this.isTyping}
          handleBack={this.handleBack}
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
  }
}

export default App;
