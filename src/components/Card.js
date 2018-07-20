import React, { Component } from "react";

class Card extends Component {
  // constructor(props) {
  //   super(props);
  // }

  renderHelper = () => {
    if (this.props.data.type === "track") {
      return (
        <iframe
          src={"https://open.spotify.com/embed?uri=spotify:track:" + this.props.data.id }
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
      );
    } else {
      return (
        <img
          className="card-img-top"
          src={
            this.props.data.images.length
              ? this.props.data.images[0].url
              : "http://www.ampedmusic.com/sites/all/themes/custom/melody/img/default-artist-300x300.png"
          }
          alt="Artist"
        />
      );
    }
  };

  render() {
    return (
      <div className="col-md-3 text-center">
        <div className="card mt-4">
          {this.renderHelper()}
          <div className="card-body">
            <p>{this.props.data.name}</p>
          </div>
          <div className="card-footer">
            <h4>{this.props.popularity}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

// src={this.props.data.images.length ? this.props.data.images[2].url : ""}
