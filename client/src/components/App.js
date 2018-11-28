import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Decks from './pages/Decks';
import AddDeck from './pages/AddDeck';
import EditDeck from './pages/EditDeck';
import Secret from './pages/Secret';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import logo from '../logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: []
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Learn with FlashCards</h1>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/decks">Deck</NavLink>
          <NavLink to="/add-deck">Add deck</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/profile">Profile</Link>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <NavLink to="/secret">Secret</NavLink>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/decks" component={Decks} />
          <Route path="/add-deck" component={AddDeck} />
          <Route path="/edit-deck/:id" component={EditDeck} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
