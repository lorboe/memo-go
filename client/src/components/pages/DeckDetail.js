import React, { Component } from "react";
import api from "../../api";
import { Link, Route } from "react-router-dom";
import AddCard from './AddCard'

class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      cards: [],
      isFormVisible: false
    };
  }
   
  handleClick() {
    if (this.state.isFormVisible === true)
      this.setState({
      isFormVisible: false
      })
    else 
      this.setState({
        isFormVisible:true
      })
  }


  render() {
    if (!this.state.deck)
      return <div>Loading...</div>
    return (
      <div>
        <div className="deckInfo">
          Title: {this.state.deck.title} <br />
          Category: {this.state.deck.category}
          <br />
          Difficulty: {this.state.deck.difficulty}
          <br />
          Is this deck public?{" "}
          {this.state.deck.visibility === "private" ? "No" : "Yes"}
          <br />
          Id: {this.state.deck._id}
        </div>

        {/* {this.state.message && <div className="info">
          {this.state.message}
        </div>} */}
        <div className="cardLinks">
       
          <button className={this.state.isFormVisible ? "shown" : "hidden"} onClick={() => this.handleClick()} >
          <Link to={ `/details/${this.props.match.params.deckId}/add-card`}          >
            New card
          </Link>
          </button>
           
           {this.state.isFormVisible === true && <Route path="/details/:deckId/add-card" component={AddCard}/> }
          

          {this.state.deck && this.state.deck.cards.map((card, i) => (
            <div key={i}>
            <div style={{fontWeight:"bold"}}>{card.question}</div>
            <div>{card.answers}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  componentDidMount() {
    let id = this.props.match.params.deckId;
    api.getDeckDetail(id).then(deck => {
      this.setState({
        deck: deck
      });
    });
  }
}

export default DeckDetail;
