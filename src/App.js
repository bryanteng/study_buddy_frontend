import React, { Component } from 'react';
import './App.css';
import Notebook from './containers/notebook'
import Navbar from './components/navbar'
import Notecards from './containers/notecards'
import Login from './components/login'
import { connect } from 'react-redux'
import UserAdapter from './adapters/UserAdapter'
import { setUserId } from './actions/login'
import { setUserDocuments, setCategories } from './actions/page'


import {Switch, BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    if(localStorage.getItem("token")){
      UserAdapter.persist(localStorage.getItem("token"))
      .then(resp => {
        if(!resp.error){
          this.props.setUserId(resp.user.user_id)
        }
        else{
          this.logout()
        }
      })
    }
  }

  logout = () => {
    localStorage.clear()
    this.props.setUserId(0)
  }

    render() {
    return (
      <Router>
        <div className="App">
          <Navbar userId={this.props.user_id} logout={this.logout}/>

          <Switch>
            <Route path="/login" render={(routeProps)=> <Login {...routeProps}/>}></Route>
            <Route path="/notebook" render={() => <Notebook />}></Route>
            <Route path="/notecards" render={() => <Notecards />}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    user_id: state.login.user_id,
  }
}

export default connect(mapStateToProps, { setUserId, setUserDocuments, setCategories })(App)
