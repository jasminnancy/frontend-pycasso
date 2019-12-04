import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from "react-router-dom"
import './App.css';
import LoginPage from './containers/LoginPage'
import Navigation from './components/Navigation'
import HomePage from './containers/HomePage'
import UsersPage from './containers/UsersPage'
import ProfilePage from './containers/ProfilePage'
import SingleUsersPage from './containers/SingleUserPage'
import EditProfilePage from './containers/EditProfilePage'
import CloseFriendsPage from './containers/CloseFriendsPage'
import MessagesPage from './containers/MessagesPage'

class App extends Component {
  componentDidMount() {
    if (localStorage.jwt) {
      fetch('http://localhost:3000/profile', {
        headers: {
            'Authorization': `Bearer ${localStorage.jwt}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
      })
      .then(response => response.json())
      .then(data => {
        this.props.loggedIn(data.user)
      })

      fetch('http://localhost:3000/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.jwt}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        this.props.getUsers(data)
      })
    } else {
      localStorage.clear()
    }
  }

  render() {
    if (this.props.currentUser.user.username) {
      fetch('http://localhost:3000/getConvos', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${localStorage.jwt}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({id: this.props.currentUser.user.id})
      })
      .then(r => r.json())
      .then(data => {
          this.props.getConvos(data)
      })
    }

    return (
      <div className="App">
        {localStorage.jwt
          ? <Navigation /> 
            : null }
        <Switch>
          <Route exact path='/'>
            {!localStorage.jwt
              ? <Redirect to='/login' /> 
                : <div className='mainPage'><HomePage /></div>}
          </Route>

          <Route exact path='/login'>
            {localStorage.jwt
            ? <Redirect to='/' />
              : <LoginPage />}
          </Route>

          <Route exact strict path='/users'>
            <div className='mainPage'><UsersPage /></div>
          </Route>

          <Route exact strict path='/users/:username'>
            <div className='mainPage'><SingleUsersPage/></div>
          </Route>

          <Route exact strict path='/profile'>
            {!localStorage.jwt
              ? <Redirect to='/login' />
                : <div className='mainPage'><ProfilePage /></div>}
          </Route>

          <Route exact strict path='/profile/edit'>
            {!localStorage.jwt
              ? <Redirect to='/login' />
                : <div className='mainPage'><EditProfilePage /></div>}
          </Route>
          <Route exact strict path='/closefriends'>
            {!localStorage.jwt
              ? <Redirect to='/login' />
                : <div className='mainPage'><CloseFriendsPage /></div>}
          </Route>
          <Route exact strict path='/messages'>
            {!localStorage.jwt
              ? <Redirect to='/login'/>
                : <div className='mainPage'><MessagesPage /></div>}
          </Route>
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggedIn: (user) => { 
      dispatch({
          type: 'LOGGED_IN',
          payload: user
      }) 
    },
    getUsers: (users) => {
      dispatch({
        type: 'ADD_USERS',
        payload: users
      })
    },
    getConvos: (convos) => {
      dispatch({
        type: 'GET_CONVOS',
        payload: convos
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
