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
          <div key={"c-" + i} className="iconCategories">
            <img src={Atom} style={{ width: "7vh" }} />
            {sortedDecks[i].category}
          </div>
        )
      }
      tableContent.push(

        <div className="flexRow flexShadow">
          <div className="scrollFlex">
            <div>
              <div className="deck deckHome">
                <img className="picOnDeck" style={{ height: "30px", width: "30px" }} src={sortedDecks[i]._owner.pictureUrl} alt="pictures" />
                <Link to={`/details/${sortedDecks[i]._id}`}>{sortedDecks[i].title}</Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <input
          name="searchbar"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={e => this.handleSearch(e.target.value)}
        />
        {/* <div className="scrollFlex"> */}
          {tableContent}
        {/* </div> */}
      </div>
    )
  }


  componentDidMount() {
    api.getDecks()
      .then(decks => {
        this.setState({
          decks: decks,
        })
        // api.getUsers()
        //   .then(user => {
        //     this.setState({
        //       pictureUrls: user.pictureUrl
        //     })
        //   })
      })
  }
}

export default Home;
