import React, { Component } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // user: null,
      name: null,
      email: null,
      currentPassword: null,
      newPassword: null,
      pictureUrl: null,
      alt: null,
      message: null
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleChange(e) {
    this.setState({
      file: e.target.files[0]
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    let body = {
      name: this.state.name,
      email: this.state.email,
      pictureUrl: this.state.pictureUrl,
    }
    if (this.state.newPassword && this.state.newPassword.length > 0) {
      body.currentPassword = this.state.currentPassword
      body.newPassword = this.state.newPassword
    }
    api.editProfile(body)
      .then(data => {
        // Add a message for 3 seconds
        this.setState({
          message: "Your profile was updated"
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 3000)
      })
    api.addPicture(this.state.file)
    .then(data => {
      this.setState({
        user: {...this.state.user, pictureUrl: data.pictureUrl}
      })
    })
  }
  handleFileChange = e => {
    this.setState({
      pictureUrl: null
    })
    let file = e.target.files[0]
    api.addPicture(file)
      .then(data => {
        this.setState({
          pictureUrl: data.pictureUrl
        })
      })
  }
  render() {
    // If there is 
    if (!this.state.email) {
      return <div><h2>Profile</h2><p>Loading...</p></div>
    }
    return (


      <div className="Profile">
        <h2>Profile</h2>


        <form onSubmit={(e) => this.handleSubmit(e)}>
        <input type="file" onChange={this.handleFileChange} className="selectBox" /> <br />
          {this.state.pictureUrl && <img src={this.state.pictureUrl} style={{ height: 200 }} alt={this.state.alt} />}
          <br />     <br />


        Change your username: 
        <br/> 
          New username:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          <br /> <br />


        Update youre email address: 
        <br/> 
          New e-mail:
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          <br /> <br />


        Would you like to change your password?
        <br/>

          Current Password:
          <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.handleChange} />
          <br />

          New Password:
          <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} />
          <br />

         

          <button className="info" type="submit">Update details</button>
        </form>

        {/* If we have this.state.message, display the message  */}
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
        <div>

        </div>

      </div>
    );
  }
  componentDidMount() {
    api.getProfile()
      .then((data) => {
        this.setState({
          name: data.user.name,
          email: data.user.email,
          pictureUrl: data.user.pictureUrl,
        })
      })
  }
}