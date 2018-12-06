import React, { Component } from "react";
import Atom from "../../images/original/science-icon_25410.png";
import Sport from "../../images/original/Sport_icon_289620.svg";
import { Link } from "react-router-dom";
import api from "../../api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      search: ""
    };
  }

  handleSearch = newSearch => {
    this.setState({
      search: newSearch
    });
  };

  render() {
    let sortedDecks = this.state.decks
      .sort((a, b) => (a.category > b.category ? 1 : -1))
      .filter(deck =>
        deck.title.toUpperCase().includes(this.state.search.toUpperCase())
      );
    let tableCategories = [];
    let tableData = [];
    for (let i = 0; i < sortedDecks.length; i++) {
      if (i === 0 || sortedDecks[i].category !== sortedDecks[i - 1].category) {
        tableCategories.push(<th key={"c-" + i}>{sortedDecks[i].category}</th>);
      }

      if (sortedDecks[i].visibility === "public") {
        let userId = sortedDecks[i]._id;
        tableData.push(
          <div>
            <td key={"p-" + i}>
              <Link to={`/public-profile/${sortedDecks[i]._owner._id}`}>
                <img
                  className="picOnDeck"
                  src={sortedDecks[i]._owner.pictureUrl}
                  alt="pictures"
                />
              </Link>
            </td>
            <td key={"p-" + i}>
              <Link to={`/details/${userId}`}>{sortedDecks[i].title}</Link>
            </td>
          </div>
        );
      }
    }
    // console.log("tableContent",tableContent)
    return (
      <div>
        <input
          name="searchbar"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={e => this.handleSearch(e.target.value)}
        />

        <div>
          <table>
            <tr>{tableCategories}</tr>
            <tr>{tableData}</tr>
          </table>
        </div>
      </div>
    );
  }

  componentDidMount() {
    api.getDecks().then(data => {
      this.setState({
        decks: data.decks
      });
    });
    // api.getUsers()
    // .then(User => {
    //   this.setState({
    //     users: users,
    //   })
    // })
  }
}

export default Home;
