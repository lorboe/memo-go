import React, { Component } from 'react';
import api from '../../api';
import BrainLogo from '../../../src/images/brain.svg'
import {Redirect} from 'react-router-dom'

class AddDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      category: "web development",
      visibility: "public",
      difficulty: "beginner",
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
    console.log(this.state.title, this.state.description, this.state.visibility, this.state.difficulty)
    let data = {
      title: this.state.title,
      category: this.state.category,
      visibility: this.state.visibility,
      difficulty: this.state.difficulty,
      description: this.state.description,
    }

    api.postDecks(data)
      .then(deck => {
        console.log('SUCCESS!', deck);
      //  <Redirect to={`/details/${deck._id}`}/>
       this.props.history.push(`/details/${deck._id}`)

        console.log("DECKid", deck._id);
        this.setState({
          title: this.state.title,
          category: this.state.category,
          visibility: this.state.visibility,
          difficulty: this.state.difficulty,
          description: this.state.description,
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
        <h2>Create deck</h2>
        <div className="flexWrap center">
          <div className="deck deckHome">
            <img className="center" src={BrainLogo} style={{objectFit: "cover", width: "60%", margin: "auto"}}/>
          </div>
          <div className="flexBasic" style={{width: "-webkit-fill-available"}}>
            <form className="center">
              {/* Title: */}
              <input className="selectBox" type="text" value={this.state.title} onChange={(e) => { this.handleInputChange("title", e) }} placeholder="Title of your deck" />
              <br />
              {/* Category: */}
              <select className="selectBox" onChange={(e) => { this.handleInputChange("category", e) }} value={this.state.category}>
                <option value="web developmenet"> web development</option>
                <option value="languages">languages</option>
                <option value="business">business</option>
                <option value="other">other</option>
              </select>
              <br />
              {/* Card: <input type="number" value={this.state.card} onChange={(e) => { this.handleInputChange("card", e) }} /> <br /> */}
              {/* Visibility: */}
              <select className="selectBox" onChange={(e) => { this.handleInputChange("visibility", e) }} value={this.state.visibility}>
                <option value="public">public</option>
                <option value="private">private</option>
              </select>
              <br />
              {/* Difficulty: */}
              <select className="selectBox" onChange={(e) => { this.handleInputChange("difficulty", e) }} value={this.state.difficulty}>
                <option value="beginner">beginner</option>
                <option value="advanced-beginner">advanced-beginner</option>
                <option value="experienced">experienced</option>
                <option value="expert">expert</option>
              </select>
              <br />
              {/* Description:  */}
              <textarea className="selectBox" value={this.state.description} cols="30" rows="2" onChange={(e) => { this.handleInputChange("description", e) }} />
              <br />
              <button onClick={(e) => this.handleClick(e)}>Create deck</button>
            </form>
          </div>
        </div>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default AddDeck;
