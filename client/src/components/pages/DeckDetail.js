import React, { Component } from 'react';
import api from '../../api';


class DeckDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
    deck: {}
    }
  }
 
  render() {
    return (
      <div>
        <div className="deckInfo">
       Title: {this.state.deck.title} <br/>
       Category: {this.state.deck.category}<br/>
       Difficulty: {this.state.deck.difficulty}<br/>
       Is this deck public? {this.state.deck.visibility === "private" ? "No" : "Yes"}
       <br/>
       </div>
        {/* {this.state.message && <div className="info">
          {this.state.message}
        </div>} */}
      <div className="cardLinks">
{/* here the link for each card in the deck will go */}


      </div>

      </div>
    );
  }
  componentDidMount() {
    let id = this.props.match.params.id
    api.getDeckDetail(id)
      .then(deck => {
        this.setState({
          deck: deck
        })
      })
  }
}

export default DeckDetail;
