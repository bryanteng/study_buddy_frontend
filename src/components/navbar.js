import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'


export default class Navbar extends Component{

  render(){
    return(
      <Fragment>

      <div class="ui menu">
      <div class="header item">
        <Link to="/">Home</Link>
      </div>
      <a class="item">
        <Link to="/notebook">Notebook</Link>
      </a>
      <a class="item">
        <Link to="/notecards">Notecards</Link>
      </a>
        <div class="right menu">
      <a class="item">
        Logout
      </a>
    </div>
  </div>
      </Fragment>
    )
  }
}
