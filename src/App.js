import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"
import './App.css';
import LoginPage from './containers/LoginPage'
import Navigation from './components/Navigation'
import HomePage from './containers/HomePage'

function App() {
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
        <Route exact path='/'>
          {localStorage.jwt.length < 1 
            ? <Redirect to='/login' /> 
              : <HomePage />}
        </Route>
        <Route exact path='/profile' />
        <Route exact Path='/user/:userId' />
      </Switch>
    </div>
  )
}

export default App;
