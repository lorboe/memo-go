import React, { Component } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // user: null,
      id: null,
      name: null,
      email: null,
      currentPassword: null,
      newPassword: null,
      pictureUrl: null,
      alt: null,
      message: null,
      idToDelete: null,
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
          user: { ...this.state.user, pictureUrl: data.pictureUrl }
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

  handleDelete() {
   api
      .deleteProfile()
      .then(user => {
        console.log("Delete", user);
        api.logout()
        this.props.history.push('/')
      })
      .catch(err => {
        console.log("ERROR", err);
      });
    }
    
    toggleDeleteModal = (id) => {
      api.getProfile()
      .then((data) => {
        this.setState({
          id:data.user._id,
      
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
        {/* <h2>Profile</h2> */}


        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="flexWrap editProfPic">
            <div style={{ margin: "20px" }}>
              {this.state.pictureUrl && <img className="picProfile" src={this.state.pictureUrl} alt={this.state.alt} />}
            </div>
            <div style={{ margin: "20px" }}>
              <input type="file" onChange={this.handleFileChange} className="selectBox" />
            </div>
          </div>
          <br />

          <div className="flexBasic center spc">
            <div>
              Edit username:
              </div>

            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="New Username" />

            <div>
              Edit e-mail:
                </div>
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />

            <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.handleChange} placeholder="Current Password" />

            <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} placeholder="New Password" />

          </div>

          <button type="submit"><i className="far fa-check-circle"></i>Update</button><span></span>
          <button type="delete" onClick={() => this.toggleDeleteModal(this.state.idToDelete)}><i className="fas fa-trash"></i>Delete</button>
          
        </form>

        {/* If we have this.state.message, display the message  */}
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
        <Modal isOpen={this.state.id} toggle={() => this.toggleDeleteModal()} size="sm">
          <ModalHeader toggle={() => this.toggleDeleteModal()}>Are you sure?</ModalHeader>
          <ModalBody className="center">
            <Button color="danger" onClick={() => this.handleDelete(this.state.id)}>Delete</Button>{' '}
            <Button color="secondary" outline onClick={() => this.toggleDeleteModal()}>Cancel</Button>
          </ModalBody>
        </Modal>

      </div>
    );
  }
  componentDidMount() {
    api.getProfile()
      .then((data) => {
        this.setState({
          // id:data.user._id,
          name: data.user.name,
          email: data.user.email,
          pictureUrl: data.user.pictureUrl,
        })
      })
  }
}