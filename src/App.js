import React, { Component } from 'react';
import './App.css';
import Notebook from './containers/notebook'
import CreateDocumentForm from './components/createDocumentForm'
import Navbar from './components/navbar'
import Notecards from './containers/notecards'
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom'

class App extends Component {

    render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Notecards />
          <CreateDocumentForm />
          <Notebook />
        </div>
      </Router>
    );
  }
}

export default App
