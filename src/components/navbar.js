import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'


export default class Navbar extends Component{

  state={
    logoutClicks: 0
  }

  handleLogout = () =>{
    this.setState({logoutClicks: this.state.logoutClicks+1})
    if(this.state.logoutClicks === 1){
      alert("nah")
    }else if (this.state.logoutClicks === 5) {
      alert("keep goin'")
    }else if (this.state.logoutClicks === 10) {
        alert("almost there...")
    }else if (this.state.logoutClicks === 15) {
      alert("lol jk")
    }else if (this.state.logoutClicks === 20) {
      alert("keep goin'")
    }
  }

  render(){
    return(
      <Fragment>

      <div class="ui menu">
      <div class="header item">
        //
      </div>
      <a class="item">
        <Link to="/notebook">Notebook</Link>
      </a>
      <a class="item">
        <Link to="/notecards">Notecards</Link>
      </a>
        <div class="right menu">
      <a class="item" onClick={this.handleLogout}>
        Logout
      </a>
    </div>
  </div>
      </Fragment>
    )
  }
}
