import React, { Component } from 'react';
import api from '../../api';
import Signup from '../pages/Signup';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
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
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        Don't have your account? <Link to="/signup">Signup</Link>
        <div className="flexWrap">
          <div className="flexBasic">
            <form>
              <input className="selectBox" type="text" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} placeholder="Email" />
              <br />
              <input className="selectBox" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} placeholder="Password" />
              <br />
              <button className="info" onClick={(e) => this.handleClick(e)}>Login</button>
            </form>
            {this.state.message && <div className="info info-danger">
              {this.state.message}
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
