import React, { Component } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // user: null,
      email: null,
      currentPassword: null,
      newPassword: null,
      pictureUrl: null,
      alt: null,
      decks: [],
      message: null
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // handleChange(e) {
  //   this.setState({
  //     file: e.target.files[0]
  //   })
  // }
  handleSubmit(e) {
    e.preventDefault()
    let body = {
      // user: this.state.user,
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
    // api.addPicture(this.state.file)
    // .then(data => {
    //   this.setState({
    //     user: {...this.state.user, pictureUrl: data.pictureUrl}
    //   })
    // })
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

      <div>
        <div className="Profile">
          <h2>Profile</h2>
          {/* <div className="flex"></div> */}
          <form className="flexRow" onSubmit={(e) => this.handleSubmit(e)}>
            {/* Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          <br />

          Current Password:
          <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.handleChange} />
          <br />

          New Password:
          <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} />
          <br /> */}
            <div>
              {this.state.pictureUrl && <img className="picProfile flex1" src={this.state.pictureUrl} style={{ height: 160 }} alt={this.state.alt} />}
            </div>
            {/* <p>
              {this.state.user}
            </p> */}
            <div>
              <button type="submit">Save profile</button>
            </div>
            <div>
              <input type="file" onChange={this.handleFileChange} placeholder="Choose File" />
            </div><br />
          </form>
          {/* If we have this.state.message, display the message  */}
          {this.state.message && <div className="info">
            {this.state.message}
          </div>}

          Decks:
         {this.state.decks.map(deck => (
            <div className="flexBasic">
              <div className="flexRow">
                {/* {deck._id} */}
                <Link className="deck" to={`/details/${deck._id}`}> {deck.title} </Link>
              </div>
            </div>
          ))}
        </div>
      </div >
    );
  }
  componentDidMount() {
    api.getProfile()
      .then((data) => {
        this.setState({
          email: data.user.email,
          pictureUrl: data.user.pictureUrl,
          decks: data.decks
        })
      })
  }
}