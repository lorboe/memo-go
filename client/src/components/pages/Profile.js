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

       {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}

        <h2>Profile</h2>


        <img style={{width: "150px", height: "150px"}}src={this.state.pictureUrl} alt="profile picture"/>

        <Link to={`/profile/edit`}> Edit profile </Link>



        {/* If we have this.state.message, display the message  */}
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
        <div>
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