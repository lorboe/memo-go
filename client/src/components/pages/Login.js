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
        <div className="flexWrap editProfPic">
          <div className="flexBasic">
            <form>
              <div className="justCenter">
                <div>
                  <input className="selectBox" type="text" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} placeholder="Email" />
                </div>
                <br />
                <div>
                  <input className="selectBox" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} placeholder="Password" />
                </div>
                <br />
                <div style={{textAlign: "center"}}>
                  <button onClick={(e) => this.handleClick(e)}><i className="fas fa-sign-in-alt"></i> Login</button>
                </div>
              </div>
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
