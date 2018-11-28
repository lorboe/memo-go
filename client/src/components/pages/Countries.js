import React, { Component } from 'react';
import api from '../../api';

class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }
  handleDelete(idClicked) {
    api.deleteCountry(idClicked)
    .then(data => {
      console.log('Delete', data)
      this.setState({
        // The new countries are the ones where their _id are diffrent from idClicked
        countries: this.state.countries.filter(c => c._id !== idClicked)
      })
    })
    .catch(err => {
      console.log("ERROR", err);
    })
  }
  handleEdit(idClicked) {
    // Redirects the user to '/edit-country/'+idClicked
    this.props.history.push('/edit-country/'+idClicked)
  }
  render() {
    return (
      <div className="Countries">
        <h2>List of countries</h2>
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
            {this.state.countries.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.capitals}</td>
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
    );
  }
  componentDidMount() {
    api.getCountries()
      .then(countries => {
        console.log(countries)
        this.setState({
          countries: countries
        })
      })
      .catch(err => console.log(err))
  }
}

export default Countries;
