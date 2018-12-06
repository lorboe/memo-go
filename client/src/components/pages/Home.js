import React, { Component } from 'react';
import Atom from "../../images/original/science-icon_25410.png";
import Sport from "../../images/original/Sport_icon_289620.svg";
import { Link } from 'react-router-dom'
import api from '../../api'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      search: "",
      category: null,
      difficulty: null,
      filterBox: false
    }
  }

  handleSearch = (newSearch) => {
    this.setState({
      search: newSearch
    })
  }

  handleCategory(event) {
    this.setState({
      category: event.target.value
    })
    }

  handleDifficulty(event) {
      this.setState({
       difficulty: event.target.value
      })
      }

 handleFilter() {
  this.setState({
       filterBox: !this.state.filterBox
      })
      }
 


  render() {
    let sortedDecks = this.state.decks
    .filter(deck => {
      if(this.state.category && deck.category != this.state.category) return false 
      if(this.state.difficulty && deck.difficulty != this.state.difficulty) return false 
      if (deck.title.toUpperCase().includes(this.state.search.toUpperCase())) return true
      return false
    }).sort((a, b) => a.category > b.category ? 1 : -1)
    let tableContent = [];
    for (let i = 0; i < sortedDecks.length; i++) {
      if (i === 0 || sortedDecks[i].category !== sortedDecks[i - 1].category) {

        tableContent.push(
          <div key={"c-" + i} className="iconCategories">
            {/* <img src={Atom} style={{ width: "7vh" }} /> */}
            <h3>
              {sortedDecks[i].category}
            </h3>
          </div>
        )
        console.log("line 36 - DECKS is: ", this.state.decks)
      }
      if (sortedDecks[i].visibility === "public") {
        let userId = sortedDecks[i]._id
        tableContent.push(


          <div className="deck deckHome">
            {/* <div className="flexRow flexShadow"> */}
            {/* <div className="scrollFlex"> */}
            <Link to={`/public-profile/${sortedDecks[i]._owner._id}`}><img className="picOnDeck" src={sortedDecks[i]._owner.pictureUrl} alt="pictures" /></Link>
            <Link to={`/details/${userId}`}>{sortedDecks[i].title}</Link>
            {/* </div> */}

            {/* </div> */}
          </div>
        )
      }
    }

    this.state.decks.map(e => console.log("line 55 data for each card", e))
    return (
      <div style={{margin: "20px"}}>
        <input
          className="searchBar"
          name="searchbar"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={e => this.handleSearch(e.target.value)}
        />  <button onClick={() => this.handleFilter()} >Filter results</button>
        {this.state.filterBox && 
        <div>
       <select className="selectBox" onChange={(e) => { this.handleCategory(e) }} value={this.state.category}>
                <option value="">all</option>
                <option value="web development"> web development</option>
                <option value="languages">languages</option>
                <option value="business">business</option>
                <option value="other">other</option>
        </select>
              <select className="selectBox" onChange={(e) => { this.handleDifficulty(e) }} value={this.state.difficulty}>
               <option value="">all</option>
                <option value="beginner">beginner</option>
                <option value="advanced-beginner">advanced-beginner</option>
                <option value="experienced">experienced</option>
                <option value="expert">expert</option>
              </select>
              </div>
        }
       

        {/* <div className="scrollFlex"> */}
        {tableContent}
        {/* </div> */}

      </div>
    )
  }


  componentDidMount() {
    api.getDecks()
      .then(data => {
        this.setState({
          decks: data.decks,
        })

      })
  }
}

export default Home;
