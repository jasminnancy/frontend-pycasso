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

class App extends Component {
  componentDidMount() {
    if (localStorage.jwt.length > 0) {
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
      localStorage.setItem('jwt', '')
    }
  }

  render() {
    return (
      <div className="App">
        {localStorage.jwt.length > 0 
          ? <Navigation /> 
            : null }
        <Switch>
          <Route exact path='/login'>
            {localStorage.jwt.length > 0 
            ? <Redirect to='/' />
              : <LoginPage />}
          </Route>

          <Route exact path='/users'>
            <div className='mainPage'><UsersPage /></div>
          </Route>

          <Route path='/users/:username'>
              <div className='mainPage'><SingleUsersPage/></div>
          </Route>

          <Route exact path='/'>
            {localStorage.jwt.length < 1 
              ? <Redirect to='/login' /> 
                : <div className='mainPage'><HomePage /></div>}
          </Route>

          <Route exact path='/profile'>
            {localStorage.jwt.length < 1
              ? <Redirect to='/login' />
                : <div className='mainPage'><ProfilePage /></div>}
          </Route>
        </Switch>
      </div>
    )
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
    }
  }
}

export default connect(null, mapDispatchToProps)(App)
