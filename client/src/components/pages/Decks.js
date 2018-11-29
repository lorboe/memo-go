import React, { Component } from 'react';
import api from '../../api';

class Decks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: []
    }
  }
  handleDelete(idClicked) {
    api.deleteDeck(idClicked)
      .then(data => {
        console.log('Delete', data)
        this.setState({
          // The new decks are the ones where their _id are diffrent from idClicked
          decks: this.state.decks.filter(c => c._id !== idClicked)
        })
      })
      .catch(err => {
        console.log("ERROR", err);
      })
  }
  handleEdit(idClicked) {
    // Redirects the user to '/edit-deck/'+idClicked
    this.props.history.push('/edit-deck/' + idClicked)
  }
  render() {
    return (
      <div className="contentCenter">
        <div className="Decks">
          <h2>List of decks</h2>
          <table style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.decks.map(c => (
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td>{c.category}</td>
                  <td>{c._owner.username}</td>
                  <td>
                    {api.isLoggedIn() && <button onClick={() => this.handleEdit(c._id)}>Edit</button>}
                    {api.isLoggedIn() && <button onClick={() => this.handleDelete(c._id)}>Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  componentDidMount() {
    api.getDecks()
      .then(decks => {
        console.log(decks)
        this.setState({
          decks: decks
        })
      })
      .catch(err => console.log(err))
  }
}

export default Decks;
