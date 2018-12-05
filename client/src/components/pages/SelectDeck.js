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
            message: null,
        }
    }

    handleInputChange(stateFieldTitle, event) {

      this.setState({
        selectedDeck: event.target.value})
    }

    handleCopyClick =(e)=>{
      e.preventDefault()
      api.copyCards(this.props.cardId, this.state.selectedDeck).then( result => {
        console.log("SUCCESS!", result)
        this.setState({
          message: "You have copied your card to your deck",
      
        })
        console.log('this.state.message',this.state.message)
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
        console.log('this.props.history',this.props.history)
        this.props.history.push('/details/' + this.props.deckId)
      })
      .catch(err => this.setState({ message: err.toString() }))
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
        </form>
        <button onClick={this.handleCopyClick}>copy</button>
       
        {this.state.message && <div className="info">
   {this.state.message}</div>}


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
