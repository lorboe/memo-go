import React, { Component } from 'react';
import api from '../../api';
import {Link} from 'react-router-dom'



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
       Id: {this.state.deck._id}

       </div>

        {/* {this.state.message && <div className="info">
          {this.state.message}
        </div>} */}
      <div className="cardLinks">
      {/* here the link for each card in the deck will go */}
      <Link deckId={this.state.deck._id} to={{pathname:`/details/${this.state.deck._id}/add-card`,state:{deckId:this.state.deck._id}}} > New card</Link>


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
