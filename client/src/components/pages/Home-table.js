import React, { Component } from 'react';
import Atom from "../../images/original/science-icon_25410.png";
import Food from "../../images/original/Food-icon_379338.png";
import Sport from "../../images/original/Sport_icon_289620.svg";
import { Link } from 'react-router-dom'
// import DeckDetail from './pages/DeckDetail';
import api from '../../api'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      // owners: [],
      // ownerPics: [],
      search: ""
    }
  }

  handleSearch = (newSearch) => {
    this.setState({
      search: newSearch
    })
  }

  render() {
    let sortedDecks = this.state.decks.sort((a, b) => a.category > b.category ? 1 : -1).filter(deck => deck.title.toUpperCase().includes(this.state.search.toUpperCase()))
    let tableContent = [];
    for (let i = 0; i < sortedDecks.length; i++) {
      if (i === 0 || sortedDecks[i].category !== sortedDecks[i - 1].category) {
        tableContent.push(
          <thead >
            <tr key={"c-" + i}>
              <th>{sortedDecks[i].category}</th>
            </tr>
          </thead>
        )
      }

      tableContent.push(
        <tbody className="scrollFlex">
          <tr key={"p-" + i}>
            <td><Link to={`/profile/${user._id}`} ><img className="picOneDeck" style={{ height: "30px", width: "30px" }} src={sortedDecks[i]._owner.pictureUrl} alt="ownerImage" /></Link></td>
            <td><Link to={`/details/${sortedDecks[i]._id}`} >{sortedDecks[i].title}</Link></td>
          </tr>
        </tbody>
      )
    }

    console.log("tableContent",tableContent)
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
            {tableContent}
          </table>
        </div>
      </div>
    )
  }


  componentDidMount() {
    api.getDecks()
      .then(decks => {
        this.setState({
          decks: decks,
        })
      })
    // api.getUsers()
    // .then(User => {
    //   this.setState({
    //     users: users,
    //   })
    // })
  }
}

export default Home;
