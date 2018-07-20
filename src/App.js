import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";
import Loader from "./components/Loader";
import "./App.css";

const TOKEN = "MY-TOKEN";

class App extends Component {
  state = {
    data: {},
    query: "",
    category: "",
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
        />{" "}
        <div className="row">
          {" "}
          {this.state.isDataLoaded === false && <Loader />}{" "}
          <CardList data={this.state.data} />{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
