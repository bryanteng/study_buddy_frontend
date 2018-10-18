import React, { Component, Fragment } from 'react';

export default class Navbar extends Component{

  render(){
    return(
      <Fragment>

      <div class="ui menu">
      <div class="header item">
        Home
      </div>
      <a class="item">
        Documents
      </a>
      <a class="item">
        Notecards
      </a>
      <a class="item">
        Logout
      </a>
    </div>
      </Fragment>
    )
  }
}
