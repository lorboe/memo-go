import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AddDeck from './pages/AddDeck';
import EditDeck from './pages/EditDeck';
import Cards from './pages/Cards';
import AddCard from './pages/AddCard';
import EditCard from './pages/EditCard';
// import Secret from './pages/Secret';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import DeckDetail from './pages/DeckDetail';
import HomeIcon from '../../src/images/original/Home-icon-66_2180674.svg';
// import SearchIcon from '../../src/images/Search_icon.svg';
import PlusIcon from '../../src/images/original/plus-icon-79_2180657.svg';
import ProfileIcon from '../../src/images/original/Profile-icon-74_2180663.svg';
// import DeckIcon from '../../src/images/Deck-icon_3525389.svg';
import PublicProfile from './pages/PublicProfile'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],

    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="prfl">
        <div id="navbar">
          <nav className="flexRow">
            <NavLink to="/" exact className="navIcon">
              <div className="iconCenter">
                <i className="fab fa-accusoft" style={{ color: "white" }}></i>
              </div>
            </NavLink>
            <NavLink to="/" exact className="navIcon">
              <img src={HomeIcon} />
            </NavLink>
            {/* <NavLink to="/decks" className="navIcon">
              <img src={DeckIcon} />
            </NavLink> */}

            <NavLink to="/add-deck" className="navIcon">
              <img src={PlusIcon} />
            </NavLink>

            {api.isLoggedIn() ? <Link to="/profile" className="navIcon">
              <div className="justCenter">
                <i class="fas fa-user"></i>
              </div>
            </Link> :
              <Link to="/login" className="navIcon">
                <div className="justCenter">
                  <i class="fas fa-user"></i>
                </div>
              </Link>}

          </nav>
          <div className="navbar2"></div>
        </div>
        <div className="content">
          {/* <div className="fixed">
          <header>
            <div>
              <div className="flexBasic">
                <h1>Profile</h1>
              </div>
              <div>
                <div className="deck deckHome"></div>
              </div>
            </div>
            <NavLink to="/cards">Cards</NavLink>
            {/* <NavLink to="/add-card">Add card</NavLink> */}
          {/* {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
            {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
            {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
            <NavLink to="/secret">Secret</NavLink>
          </header> */}
          {/* </div> */}

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add-deck" component={AddDeck} />
            <Route path="/details/:deckId/" component={DeckDetail} />
            <Route path="/edit-deck/:id" component={EditDeck} />
            <Route path="/cards" component={Cards} />
            <Route path="/edit-card/:id" component={EditCard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/edit" component={EditProfile} />

         
            <Route path="/public-profile/:userId" component={PublicProfile} />


            {/* <Route path="/decks" component={Decks} /> */}
            {/* <Route path="/details/:deckId/add-card" component={AddCard}/> */}
            {/* <Route path="/secret" component={Secret} /> */}
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
        <div className="footer">FOOTER</div>
      </div>
      // </div>
    );
  }



}

export default App;