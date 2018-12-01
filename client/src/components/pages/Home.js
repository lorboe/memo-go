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
      pictureUrls: []
    }
  }

  render() {
    return (
      <div>
        {/* <div className="Home">
          <h2>Home</h2>
        </div>
        <div className="flexRow">
          <div className="">
            <div className="deck deckHome"></div>

          </div>
        </div>
        <hr /> */}

        <div className="iconCategories">
          <img src={Atom} style={{ width: "7vh" }} />
        </div>
        <div className="flexRow flexShadow">
          <div className="scrollFlex">
            <div className="deck deckHome">
              <img src={Atom} style={{ objectFit: "cover", margin: "auto", }} />
            </div>
            {this.state.decks.map(deck =>
              <div className="deck deckHome">
                <div className="circlePic">
                  <img className="picOnDeck" src={this.state.pictureUrl} alt={this.state.alt} />
                </div>
                <Link to={`/details/${deck._id}`} className="bubble"> {deck.title} </Link>
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
          decks: decks
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
