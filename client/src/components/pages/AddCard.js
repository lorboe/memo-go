import React, { Component } from 'react';
import api from '../../api';


class AddCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: "",
      answers: [],
      // difficulty: "beginner",
      message: null,
      // const {deckId} = props.location.state
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value

    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.question, this.state.answers)
    let data = {
      question: this.state.question,
      answers: this.state.answers,
      // difficulty: this.state.difficulty,
    }
    api.postCards(data, this.props.deckId)
      .then(data => {
        console.log('SUCCESS!')
        this.setState({
          question: "",
          answers: "",
          // difficulty: this.state.difficulty,
          message: `Your card '${this.state.question}' has been created`
        })
        this.props.onAdd(data.card)

        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }


  render() {
    let card = this.state
    return (
      <div className="AddCard">
        <div className="flexBasic">
          <form className="center">
            <h3>Create new card</h3>

            <textarea type="text" value={this.state.question} onChange={(e) => { this.handleInputChange("question", e) }} placeholder="Question" />

            <textarea type="text" value={this.state.answers} onChange={(e) => { this.handleInputChange("answers", e) }} placeholder="Answer" />
            <div>
              Difficulty:
            </div>
            <select onChange={(e) => { this.handleInputChange("difficulty", e) }} value={this.state.difficulty} placeholder="Difficulty">
              <option value="beginner">beginner</option>
              <option value="advanced-beginner">advanced-beginner</option>
              <option value="experienced">experienced</option>
              <option value="expert">expert</option>
            </select>
            {/* Difficulty: <textarea value={this.state.difficulty} cols="30" rows="10" onChange={(e) => { this.handleInputChange("difficulty", e) }} ></textarea> <br /> */}
            <button style={{ margin: "auto" }} onClick={(e) => this.handleClick(e)}>Create card</button>
          </form>
          <hr />
          {this.state.message && <div className="info">
            {this.state.message}
          </div>}
        </div>
      </div>
    );
  }


  // componentDidMount() {
  //   let id = this.props.deckId
  //   api.getDeckDetail(id)
  //     .then(deck => {
  //       this.setState({
  //         deckId: deck._id
  //       })
  //     })
  // }

}





export default AddCard;
