import React, { Component } from "react";
import api from "../../api";
import { Link, Route } from "react-router-dom";
import AddCard from './AddCard'

class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      // cards: [],
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

  handleDelete(idClicked) {
    api.deleteCard(idClicked)
    .then(data => {
      console.log('Delete', data)
      this.setState({
        // The new cards are the ones where their _id are diffrent from idClicked
        deck: {
          ...this.state.deck,
          cards: this.state.deck.cards.filter(card => card._id !== idClicked)
        }        
      })
    })
    .catch(err => {
      console.log("ERROR", err);
    })
  }
  handleEdit(idClicked) {
    // Redirects the user to '/edit-card/'+idClicked
    this.props.history.push('/edit-card/'+idClicked)
  }

  handleAdd = (card) => {
    this.setState({
      deck: {
        ...this.state.deck,
        cards: [...this.state.deck.cards,card]
      }
    })
  }


  render() {
    if (!this.state.deck)
      return <div>Loading...</div>
    return (
      <div className="flexWrap">
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
            New card
          </button>
           
          {this.state.isFormVisible && <AddCard 
            deckId={this.props.match.params.deckId} 
            onAdd={this.handleAdd} /> }
          

          {this.state.deck && this.state.deck.cards.map((card, _id) => (
            <div key={card._id}>
            <div style={{fontWeight:"bold"}}>{card.question}</div>
            <div>{card.answers}</div>
            {api.isLoggedIn() && <button onClick={() => this.handleEdit(card._id)}>Edit</button>}
            {api.isLoggedIn() && <button onClick={() => this.handleDelete(card._id)}>Delete</button>}
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
        deck: deck,
        // cards: deck.cards
      });
    });
  }
}

export default DeckDetail;
