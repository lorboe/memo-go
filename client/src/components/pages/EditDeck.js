import React, { Component } from 'react';
import api from '../../api';


class EditDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      category: "",
      cards: [],
      description: "",
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
      title: this.state.title,
      category: this.state.category,
      cards: this.state.cards,
      description: this.state.description,
    }
    api.updateDeck(this.props.match.params.id, data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          message: `Your deck '${this.state.title}' has been updated`
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
      <div className="EditDeck">
        <h3>Create Deck</h3>
        <div className="flexWrap">
          <div className="deck"></div>
          <div>
            <form>
              Title: <input type="text" value={this.state.title} onChange={(e) => { this.handleInputChange("title", e) }} />
              <br />
              Category: <input type="text" value={this.state.category} onChange={(e) => { this.handleInputChange("category", e) }} />
              <br />
              {/* Cards: <input type="number" value={this.state.cards} onChange={(e) => { this.handleInputChange("cards", e) }} /> <br /> */}
              {/* Description: <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
            <button onClick={(e) => this.handleClick(e)}>Update deck</button> */}
            </form>
            {this.state.message && <div className="info">
              {this.state.message}
            </div>}
          </div>
        </div>
        <hr />
        <div id="cardContainer">
          <div className="card">
          </div>
        </div>

      </div>
    );
  }
  componentDidMount() {
    let id = this.props.match.params.id
    api.getDeckDetail(id)
      .then(deck => {
        this.setState({
          title: deck.title,
          category: deck.category,
          cards: deck.cards,
          description: deck.description,
        })
      })
  }
}

export default EditDeck;
