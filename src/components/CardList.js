import React, { Component } from "react";
import Card from "./Card";

class CardList extends Component {
  renderData = (data) => {
    if (Object.keys(data).length) {
      return data.map((e, i) => {
        return <Card data={e} key={i} token={this.props.token} updateCards={this.props.updateCards}/>;
      });
    }
    return null // NO DATA
  };

  render() {
    return this.renderData(this.props.data);
  }
}

export default CardList;
