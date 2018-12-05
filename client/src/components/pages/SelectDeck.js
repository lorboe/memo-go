import React, { Component } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'



// let cardId = this.props.cardId
// console.log(cardId)

export default class SelectDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decks: [],
            card: null,
            currUserId:null,
            selectedDeck: null,
        }
    }

    handleInputChange(stateFieldTitle, event) {
      // let newState = {}
      // selectedDeck[stateFieldTitle] = event.target.value

      this.setState({
        selectedDeck: event.target.value})
    }

    handleCopyClick(e){
      console.log(this.props.cardId)
      console.log(this.state.selectedDeck)
      e.preventdefault()
      api.copyCards(this.props.cardId, this.state.selectedDeck). then( result => {
        console.log("SUCCESS!")
      })
      
    }
  

  
  render() {
    if (!this.state.decks) {
      return <div>Loading...</div>;
    }
    console.log(this.state.selectedDeck)


    return (
      <div>
        <form>
        <select name="selectedDeck" className="selectBox" onChange={(e) => { this.handleInputChange("selectedDeck", e) }} value={this.state.selectedDeck}> 
        {this.state.decks.map((deck, i)=>  
        <option key={i} value={deck._id}> {deck.title} </option>
        )}
        </select>
        <button onClick={(e) => this.handleCopyClick(e)}>copy</button>
        </form>
      </div>
    )
  }



  componentDidMount() {

    api.getMyDecks()
      .then(decks => {
        this.setState({
          decks: decks,
          selectedDeck: decks[0]._id
        })
      })
  }

  //   componentDidMount() {
  //     let cardId = this.props.cardId
  //     console.log(cardId)
  //     api.getCardDetail(cardId)
  //         .then(card => {
  //             this.setState({
  //                 card: card,
  //             })
  //         })
  // }
}
