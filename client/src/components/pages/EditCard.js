import React, { Component } from 'react';
import api from '../../api';


class EditCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: "",
      answers: "",
      visibility: "",
      // difficulty: "",
      deck: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      question: this.state.question,
      answers: this.state.answers,
      // visibility: this.state.visibility,
      // difficulty: this.state.difficulty,
    }
    let deckId = this.state.deck
    api.updateCard(this.props.match.params.id, data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          message: `Your card '${this.state.question}' has been updated`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .then(result => { this.props.history.push('/details/' + deckId) }
      )
      .catch(err => this.setState({ message: err.toString() }))
  }
  render() {
    return (
      <div className="EditCard">
        <h2>Edit cards</h2>
        <div className="flexWrap center">
          <div id="cardContainer" style={{marginBottom: "10vh"}}></div>
          <div className="flexBasic" style={{width: "-webkit-fill-available"}}>
            <form className="center">
              <input className="iconCenter" type="text" value={this.state.question} onChange={(e) => { this.handleInputChange("question", e) }} placeholder="Question" /> <br />

              <input className="iconCenter" type="text" value={this.state.answers} onChange={(e) => { this.handleInputChange("answers", e) }} placeholder="Answer" /> <br />
              <div>
                {/* Visibility: */}
                </div>
              {/* <select onChange={(e) => { this.handleInputChange("visibility", e) }}>
                <option value={this.state.visibility}>public</option>
                <option value={this.state.visibility}>private</option>
              </select> */}
              <div>
                {/* Difficulty: */}
              </div>
              {/* <select onChange={(e) => { this.handleInputChange("difficulty", e) }}>
                <option value={this.state.difficulty}>beginner</option>
                <option value={this.state.difficulty}>advanced-beginner</option>
                <option value={this.state.difficulty}>experienced</option>
                <option value={this.state.difficulty}>expert</option>
              </select> */}
              {/* Difficulty: <textarea value={this.state.difficulty} cols="30" rows="10" onChange={(e) => { this.handleInputChange("difficulty", e) }} ></textarea> <br /> */}
              <button onClick={(e) => this.handleClick(e)}>Save<i style={{marginLeft: "2vh"}} className="fas fa-check"></i></button>
            </form>
            {this.state.message && <div className="info">
              {this.state.message}
            </div>}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let id = this.props.match.params.id
    api.getCardDetail(id)
      .then(card => {
        this.setState({
          question: card.question,
          answers: card.answers,
          // visibility: card.visibility,
          // difficulty: card.difficulty,
          deck: card._deck
        })
      })
  }
}

export default EditCard;
