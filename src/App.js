import React, { Component } from 'react';
import './App.css';
import Notebook from './containers/notebook'
import Navbar from './components/navbar'
import Notecards from './containers/notecards'
import Login from './components/login'

import {Switch, BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {

    render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/notecards" component={Notecards}></Route>
            <Route path="/notebook" component={Notebook}></Route>
            <Route path="/" component={Login}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
