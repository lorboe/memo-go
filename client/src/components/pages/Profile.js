import React, { Component } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import EditIcon from '../../../src/images/original/pencil.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MoveRight from '../../../src/images/original/Move_Right2.png'
import MoveLeft from '../../../src/images/original/Move_Left.png'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      // currentPassword: null,
      // newPassword: null,
      pictureUrl: null,
      decks: [],
      message: null,
      search: "",
      deckIdToDelete: null,
    }
    this.scrollRef = React.createRef()
  }

  handleSearch = (newSearch) => {
    this.setState({
      search: newSearch
    })
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
    //    })
    //  })
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

  handleDelete(idClicked) {
    api
      .deleteDeck(idClicked)
      .then(deck => {
        console.log("Delete", deck);
        this.setState({
          // The new cards are the ones where their _id are diffrent from idClicked
          decks: this.state.decks.filter(deck => deck._id !== idClicked),
          deckIdToDelete: null
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  // deckId can be an id or undefined
  toggleDeleteModal = (deckId) => {
    this.setState({
      deckIdToDelete: deckId
    })
  }


  handleLogoutClick(e) {
    console.log("logout click")
    api.logout().then (res => {
    this.props.history.push('/')})
  }
  // Defining the scroll "size"
  scroll(delta) {
    let $scroll = this.scrollRef.current
    $scroll.scroll($scroll.scrollLeft + 0.9 * delta * $scroll.clientWidth, 0) // clientWidth dettects the size of the screen 
  }

  render() {
    // If there is 
    if (!this.state.email) {
      // this.props.history.push(`/login/`)
      return <div><h2>Profile</h2><p>Loading...</p></div>
    }
    return (

      <div>
        <input
          className="searchBar"
          name="searchbar"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={e => this.handleSearch(e.target.value)}
        />


        <div className="Profile">
          <div className="flexWrap center">
            <div className="flexBasic center">
              <div>
                <img className="picProfile" src={this.state.pictureUrl} alt="profile picture" />
              </div>
              <div style={{ margin: "5vh 0" }}>
                <h2>{this.state.name}</h2>
              </div>
            </div>
            <div>
           {api.isLoggedIn() && <button onClick={(e) => this.handleLogoutClick(e)}>
                 {/* <Link to="/" >
                </Link> */}
                <i class="fas fa-sign-out-alt" style={{ marginRight: "0.5vh" }}></i> Logout
              </button>}
              <button>
                <Link to={`/profile/edit`}> <img src={EditIcon} style={{ height: "23px", marginRight: "1vh" }} /></Link>
                Edit
              </button>
            </div>
          </div>

          {/* If we have this.state.message, display the message  */}
          {this.state.message && <div className="info">
            {this.state.message}
          </div>}
          <h2>Your decks:</h2>
          <div className="flexRow">
            <div className="arrow" onClick={() => this.scroll(-1)}>
              <img src={MoveLeft} />
            </div>
            <div className="scrollFlex" ref={this.scrollRef}>
              {this.state.decks.filter(deck => deck.title.toUpperCase().includes(this.state.search.toUpperCase())).map((deck, i) => (
                <div>
                  <Link key={i} className="deck deckHome" to={`/details/${deck._id}`}> {deck.title} </Link>
                  {api.isLoggedIn() && <button onClick={() => this.toggleDeleteModal(deck._id)}>Delete</button>}
                  {/* {api.isLoggedIn() && <button onClick={() => this.handleDelete(deck._id)}>Delete</button>} */}
                </div>
              ))}
            </div>
            <div className="arrow" onClick={() => this.scroll(1)}>
              <img src={MoveRight} />
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.deckIdToDelete} toggle={() => this.toggleDeleteModal()} size="sm">
          <ModalHeader toggle={() => this.toggleDeleteModal()}>Are you sure you want to delete this deck?</ModalHeader>
          <ModalBody className="center">
            <Button color="danger" onClick={() => this.handleDelete(this.state.deckIdToDelete)}>Delete</Button>{' '}
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
          name: data.user.name,
          email: data.user.email,
          pictureUrl: data.user.pictureUrl,
          decks: data.decks
        })
      })
  }
}