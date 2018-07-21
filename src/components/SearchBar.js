import React, { Component } from "react";



class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      category: "artist",
      typingTimeout: 0,
    };
  }


  handleChange = event => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.props.isTyping(this.state.query)

    const { name, value } = event.target;
    this.setState({
      [name]: value,
      typingTimeout: setTimeout(() => {
          this.props.callAPI(this.state.query,this.state.category);
      }, 2000)
    });
  };



  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a href="#" className="text-white ml-5">
          Spotify-app
        </a>
        <button className="btn btn-danger" onClick={this.props.handleBack}>Back</button>
        <input type="text" name="query" onChange={this.handleChange} />
        <select name="category" onChange={this.handleChange}>
          <option value="artist">Artist</option>
          <option value="track">Song</option>
          <option value="album">Album</option>
        </select>
      </nav>
    );
  }
}

export default SearchBar;
