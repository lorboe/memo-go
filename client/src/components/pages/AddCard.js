import React, { Component } from 'react';
import api from '../../api';


class AddCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: "",
      answers: "",
      visibility: "public",
      difficulty: "beginner",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value

    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.question, this.state.description)
    let data = {
      question: this.state.question,
      answers: this.state.answers,
      difficulty: this.state.difficulty,
    }
    api.postCards(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          question: "",
          answers: "",
          difficulty: "",
          message: `Your card '${this.state.question}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  render() {
    return (
      <div className="AddCard">
        <h2>New card</h2>
        <form>
          Question: <input type="text" value={this.state.question} onChange={(e) => { this.handleInputChange("question", e) }} /> <br />
          Answers: <input type="text" value={this.state.answers} onChange={(e) => { this.handleInputChange("answers", e) }} /> <br />
          <br />
          Difficulty:
          <select onChange={(e) => { this.handleInputChange("difficulty", e) }}>
          <option value={this.state.difficulty}>beginner</option>
          <option value={this.state.difficulty}>advanced-beginner</option>
          <option value={this.state.difficulty}>experienced</option>
          <option value={this.state.difficulty}>expert</option>
          </select>
          {/* Difficulty: <textarea value={this.state.difficulty} cols="30" rows="10" onChange={(e) => { this.handleInputChange("difficulty", e) }} ></textarea> <br /> */}
          <button onClick={(e) => this.handleClick(e)}>Create card</button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default AddCard;
