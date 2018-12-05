import React, { Component } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import SettingsIcon from '/Users/GG/Documents/SofDev/Ironhack/w8/Project_3/learning-app/client/src/images/original/Settings2.svg';


export default class Profile extends Component {
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
      decks: [],
      message: null,

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
      name: this.state.name,
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

  handleFileChange = e => {
    this.setState({
      name: null
    })
    let name = e.target.name
      .then(data => {
        this.setState({
          name: name
        })
      })
  }

  handleLogoutClick(e) {
    api.logout()
  }
  render() {
    // If there is 
    if (!this.state.email) {
      return <div><h2>Profile</h2><p>Loading...</p></div>
    }
    return (



      <div className="Profile">
        <div className="flexWrap">
          <div className="flexBasic">
          <img className="picProfile" src={this.state.pictureUrl} alt="profile picture" />
            <h2>{this.state.name}ProfileName</h2>
          </div>
            <div>
              {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}> <p>Logout</p> </Link>}
              <botton className="info">
                <Link to={`/profile/edit`}> <img src={SettingsIcon} style={{ height: "30px" }} /> </Link>
              </botton>
            </div>
        </div>

        {/* If we have this.state.message, display the message  */}
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
        <h2>Your decks:</h2>
        <div className="scrollFlex">
          {this.state.decks.map(deck => (
            <Link className="deck deckHome" to={`/details/${deck._id}`}> {deck.title} </Link>
          ))}
        </div>
      </div>
    );
  }
  componentDidMount() {
    api.getProfile()
      .then((data) => {
        this.setState({
          user: data.user,
          email: data.user.email,
          pictureUrl: data.user.pictureUrl,
          decks: data.decks
        })
      })
  }
}