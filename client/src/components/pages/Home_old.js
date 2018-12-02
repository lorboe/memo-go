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
      decks:[],
      // owners: [],
      // ownerPics: [],
      search: ""
    }
  }

  handleSearch = (newSearch) =>{
    this.setState({
      search:newSearch
    })
    }

  render() {
    let sortedDecks= this.state.decks.sort((a,b) => a.category > b.category ? 1: -1 ) 
    let deckCategories = [];
    for (let i = 0; i < sortedDecks.length; i++) {
      if(i===0 || sortedDecks[i].category !== sortedDecks[i-1].category) {
        deckCategories.push(<div key={"c-"+i}> {sortedDecks[i].category}</div>)
      }
  
    }
    //   // rows.push(<ProductRow key={"p-"+i} name={products[i].name} price={products[i].price} stocked={products[i].stocked} />);
    //   rows.push(<ProductRow key={"p-"+i} {...products[i]} />)
    // }
  






    return (
      <div>

         <input
          name="searchbar"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={e => this.handleSearch(e.target.value)}
        />
        {/* <div className="Home">
          <h2>Home</h2>
        </div>
        <div className="flexRow">
          <div className="">
            <div className="deck deckHome"></div>

          </div>
        </div>
        <hr /> */}
        {deckCategories.map(category => 
        <div className="iconCategories">
          <img src={Atom} style={{ width: "7vh" }} />
          {category}
          
        </div>
        )}

        <div className="flexRow flexShadow">
          <div className="scrollFlex">
            <div className="deck deckHome"><img src={Atom} style={{ backgroundSize: "cover", margin: "auto", }} /></div>
            {this.state.decks
            .filter(deck => deck.title.toUpperCase().includes(this.state.search.toUpperCase()))
            .map(deck =>
              <div>
              <div className="deck deckHome">
                <Link to={`/details/${deck._id}`} className="bubble"> {deck.title} </Link>
                <img style={{height:"30px", width:"30px"}} src={deck._owner.pictureUrl} alt="pictures" />
              </div>
              </div>
            )}
          </div>
        </div>


        <div className="iconCategories">
          <img src={Food} style={{ width: "7vh" }} />
        </div>
        <div className="flexRow flexShadow">
          <div className="scrollFlex">
            <div className="deck deck1 deckHome"><img src={Food} style={{ width: "14vh", backgroundSize: "cover", margin: "auto", }} /></div>
            <div className="deck deck1 deckHome"></div>
          </div>
        </div>


        <div className="iconCategories">
          <img src={Sport} style={{ width: "7vh" }} />
        </div>
        <div className="flexRow flexShadow">
          <div className="scrollFlex">
            <div className="deck deck2 deckHome"><img src={Sport} style={{ width: "14vh", backgroundSize: "cover", margin: "auto", }} /></div>
            <div className="deck deck2 deckHome"></div>

          </div>
        </div>


      </div>
    );
  }

  componentDidMount() {
    api.getDecks()
      .then(decks => {
        this.setState({
          decks: decks,
        })
      })
  }
}

export default Home;
