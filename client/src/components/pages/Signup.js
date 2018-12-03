import React, { Component } from 'react';
import api from '../../api';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      password: "",
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
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <form className="spc">
          <div>
          Email:
          </div>
          <br/> 
          <input type="text" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} placeholder="Email"/> <br />
          <div>
          Name:
          </div>
          <br/> 
          <input type="text" value={this.state.name} onChange={(e) => this.handleInputChange("name", e)} placeholder="Name"/> <br />
          <div>
          Password: 
          </div>
          <br/> 
          <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} placeholder="password"/> <br />
          <button onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default Signup;
