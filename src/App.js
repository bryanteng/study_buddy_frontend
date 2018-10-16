import React, { Component } from 'react';
import './App.css';
import Notebook from './containers/notebook'
import CreateDocumentForm from './components/createDocumentForm'

class App extends Component {

    render() {
    return (
      <div className="App">
        <CreateDocumentForm />
        <Notebook />
      </div>
    );
  }
}

export default App
