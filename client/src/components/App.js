import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AddDeck from './pages/AddDeck';
import EditDeck from './pages/EditDeck';
import Cards from './pages/Cards';
import EditCard from './pages/EditCard';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import DeckDetail from './pages/DeckDetail';
import SelectDeck from './pages/SelectDeck'
import HomeIcon from '../../src/images/original/Home-icon-66_2180674.svg';
import PlusIcon from '../../src/images/original/plus.svg';
import ProfileIcon from '/Users/GG/Documents/SofDev/Ironhack/w8/Project_3/learning-app/client/src/images/original/Profile_icon.svg';
import Heard from '../../src/images/original/Heart.svg';
import PublicProfile from './pages/PublicProfile'
import BrainLogo from '../../src/images/brain2.svg'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],

    }
    // api.loadUser();
  }

  render() {
    return (
      <div className="prfl">
        <div id="navbar">
          <nav className="flexRow">
            <NavLink to="/" exact className="navIcon">
              <div className="center">
                <img src={BrainLogo} style={{ color: "white" }} />
              </div>
            </NavLink>
            {/* <NavLink to="/" exact className="navIcon">
              <img src={HomeIcon} />
            </NavLink> */}

            {api.isLoggedIn() ? 
            <NavLink 
            to="/add-deck" 
            className="navIcon">
              <img src={PlusIcon} />
            </NavLink> :
             <NavLink 
             to="/login" 
             className="navIcon" >
             <img src={PlusIcon} />
            </NavLink>}

            {api.isLoggedIn() ? <NavLink to="/profile" className="navIcon">
              <div className="center">
                <img src={ProfileIcon} />
              </div>
            </NavLink> :
              <NavLink to="/login" className="navIcon">
                <div className="center">
                  <i class="fas fa-user"></i>
                </div>
              </NavLink>}

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
        
          {/* {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
            {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
            {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          </header> */}
          {/* </div> */}

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add-deck" component={AddDeck} />
            <Route path="/details/:deckId/" component={DeckDetail} />
            <Route path="/:deckId/learn" component={Learn} />
            <Route path="/cards" component={Cards} />
            {/* <Route path="/selectDeck/:cardId" component={SelectDeck} /> */}

            <Route path="/edit-card/:id" component={EditCard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="/public-profile/:userId" component={PublicProfile} />
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