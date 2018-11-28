import React, { Component } from 'react';
import api from '../../api';


class EditCountry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      capitals: "",
      area: "",
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
      name: this.state.name,
      capitals: this.state.capitals,
      area: this.state.area,
      description: this.state.description,
    }
    api.updateCountry(this.props.match.params.id, data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          message: `Your country '${this.state.name}' has been updated`
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
      <div className="EditCountry">
        <h2>Edit country</h2>
        <form>
          Name: <input type="text" value={this.state.name} onChange={(e) => { this.handleInputChange("name", e) }} /> <br />
          Capitals: <input type="text" value={this.state.capitals} onChange={(e) => { this.handleInputChange("capitals", e) }} /> <br />
          Area: <input type="number" value={this.state.area} onChange={(e) => { this.handleInputChange("area", e) }} /> <br />
          Description: <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
          <button onClick={(e) => this.handleClick(e)}>Update country</button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
  componentDidMount() {
    let id = this.props.match.params.id
    api.getCountryDetail(id)
      .then(country => {
        this.setState({
          name: country.name,
          capitals: country.capitals,
          area: country.area,
          description: country.description,
        })
      })
  }
}

export default EditCountry;
