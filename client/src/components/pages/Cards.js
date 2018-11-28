import React, { Component } from 'react';
import api from '../../api';

class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
  }
  handleDelete(idClicked) {
    api.deleteCard(idClicked)
    .then(data => {
      console.log('Delete', data)
      this.setState({
        // The new cards are the ones where their _id are diffrent from idClicked
        cards: this.state.cards.filter(c => c._id !== idClicked)
      })
    })
    .catch(err => {
      console.log("ERROR", err);
    })
  }
  handleEdit(idClicked) {
    // Redirects the user to '/edit-card/'+idClicked
    this.props.history.push('/edit-card/'+idClicked)
  }
  render() {
    return (
      <div className="Cards">
        <h2>List of cards</h2>
        <table style={{margin: 'auto'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capitals</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cards.map(c => (
              <tr key={c._id}>
                <td>{c.question}</td>
                <td>{c.answers}</td>
                <td>{c._owner.name}</td>
                <td>
                  {api.isLoggedIn() && <button onClick={() => this.handleEdit(c._id)}>Edit</button>}
                  {api.isLoggedIn() && <button onClick={() => this.handleDelete(c._id)}>Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  componentDidMount() {
    api.getCards()
      .then(cards => {
        console.log(cards)
        this.setState({
          cards: cards
        })
      })
      .catch(err => console.log(err))
  }
}

export default Cards;
