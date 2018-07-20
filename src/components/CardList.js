import React, { Component } from "react";
import Card from "./Card";

class CardList extends Component {
  renderData = () => {
    const { data } = this.props;
    if (Object.keys(data).length) {
      return data.map((e, i) => {
        return <Card data={e} key={i} />;
      });
    }
    return null // NO DATA
  };

  render() {
    return this.renderData();
  }
}

export default CardList;
