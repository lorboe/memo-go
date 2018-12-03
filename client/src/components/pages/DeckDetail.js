import React, { Component } from "react";
import api from "../../api";
import { Link, Route } from "react-router-dom";
import AddCard from './AddCard'
import SettingsIcon from '../../images/original/Settings.svg';
import Bin from '../../images/original/Bin.svg';

class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      owner: null,  
      isFormVisible: true
    };
  }

  handleClick() {
    if (this.state.isFormVisible === false)
      this.setState({
        isFormVisible: true
      })
    else
      this.setState({
        isFormVisible: false
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
    this.props.history.push('/edit-card/' + idClicked)
  }

  handleAdd = (card) => {
    this.setState({
      deck: {
        ...this.state.deck,
        cards: [...this.state.deck.cards, card]
      }
    })
  }


  render() {
    if (!this.state.deck && !this.state.owner) 
      return <div>Loading...</div>
      console.log('state Owner: '+ this.state.owner._id)
      console.log('deck Owner: '+ this.state.deck._owner)
    return (
      <div>
        <div className="flexWrap justCenter">
          <div className="flexBasic">
            <div className="deck deckHome">
              {this.state.deck.title}
            </div>
            <div className="deckInfo">
              Category: {this.state.deck.category}
              <br />
              Difficulty: {this.state.deck.difficulty}
              <br />
              Is this deck public?{" "}
              {this.state.deck.visibility === "private" ? "No" : "Yes"}
              <br />
              {/* Id: {this.state.deck._id} */}
            </div>
          </div>
         
         
        </div>

        <div className="cardLinks">
       
      
        {this.state.deck._owner === this.state.owner._id  && 
        <button  onClick={() => this.handleClick()} >
        New card
        </button> }

       {this.state.deck._owner === this.state.owner._id  && !!this.state.isFormVisible &&
       <div>
          <AddCard 
            deckId={this.props.match.params.deckId} 
         onAdd={this.handleAdd} />  
         </div>}

        </div>
      
     

        <div className="flexWrap justCenter">
          <div className="cardLinks justCenter">




            <hr />
            {/* <div id="cardContainer"></div> */}
            {this.state.deck && this.state.deck.cards.map((card, _id) => (
              <div key={card._id} className="flexWrap justCenter">
                <div style={{ fontWeight: "bold" }} id="cardContainer">{card.question}</div>
                <div id="cardContainer">{card.answers}</div>
                {api.isLoggedIn() && <button onClick={() => this.handleEdit(card._id)}>
                  <i class="fas fa-cog"></i>
                </button>}

                {api.isLoggedIn() && <button onClick={() => this.handleDelete(card._id)}>
                  <i class="fas fa-trash"></i>
                </button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
   let id = this.props.match.params.deckId;
    api.getDeckDetail(id).then(data=> {
      this.setState({
        deck: data.deckDoc,
        owner: data.user
      });
    })
  }
}

export default DeckDetail;
