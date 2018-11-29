import React, { Component } from 'react';
import api from '../../api';


class AddDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title2: "",
      category: "",
      card: [],
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
      card: this.state.card,
      description: this.state.description,
    }
    api.postDecks(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          title: "",
          category: "",
          card: "",
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
        <form>
          Title: <input type="text" value={this.state.title} onChange={(e) => { this.handleInputChange("title", e) }} /> <br />
          Categories: <input type="text" value={this.state.category} onChange={(e) => { this.handleInputChange("category", e) }} /> <br />
          Card: <input type="number" value={this.state.card} onChange={(e) => { this.handleInputChange("card", e) }} /> <br />
          Description: <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
          <button onClick={(e) => this.handleClick(e)}>Create deck</button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default AddDeck;
