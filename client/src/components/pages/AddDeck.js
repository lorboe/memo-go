import React, { Component } from 'react';
import api from '../../api';


class AddDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title2: "",
      category: "",
      visibility: "",
      difficulty: "",
      description: "",
      message: null
    }
  }

  handleInputChange(stateFieldTitle, event) {
    let newState = {}
    newState[stateFieldTitle] = event.target.value

    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.title, this.state.description)
    let data = {
      title: this.state.title,
      category: this.state.category,
      visibility: this.state.visibility,
      difficulty: this.state.difficulty,
      // card: this.state.card,
      description: this.state.description,
    }
    api.postDecks(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          title: "",
          category: "",
          visibility: "",
          difficulty: "",
          // card: "",
          description: "",
          message: `Your deck '${this.state.title}' has been created`
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
      <div className="AddDeck">
        <h2>Add deck</h2>
        <div className="flexBasic">
          <form className="test">
            Title: <input type="text" value={this.state.title} onChange={(e) => { this.handleInputChange("title", e) }} placeholder="Your deck topic" />
            <br />
            Category:
          <select onChange={(e) => { this.handleInputChange("category", e) }}>
              <option value={this.state.category}>web development</option>
              <option value={this.state.category}>languages</option>
              <option value={this.state.category}>business</option>
              <option value={this.state.category}>other</option>
            </select>
            <br />
            {/* Card: <input type="number" value={this.state.card} onChange={(e) => { this.handleInputChange("card", e) }} /> <br /> */}
            Visibility:
          <select onChange={(e) => { this.handleInputChange("visibility", e) }}>
              <option value={this.state.visibility}>public</option>
              <option value={this.state.visibility}>private</option>
            </select>
            <br />
            Difficulty:
          <select onChange={(e) => { this.handleInputChange("difficulty", e) }}>
              <option value={this.state.difficulty}>beginner</option>
              <option value={this.state.difficulty}>advanced-beginner</option>
              <option value={this.state.difficulty}>experienced</option>
              <option value={this.state.difficulty}>expert</option>
            </select>
            <br />
            Description: <textarea value={this.state.description} cols="30" rows="2" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
            <button onClick={(e) => this.handleClick(e)}>Create deck</button>
          </form>
        </div>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default AddDeck;
