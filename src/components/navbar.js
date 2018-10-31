import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends Component{

  render(){
    const loggedIn = !!this.props.userId

    return(
      <Fragment>

      <div class="ui menu">
        <div class="header item">
          {this.props.username ? `${this.props.username}'s Study Buddy` : "//"}
        </div>
        <a class="item">
          <Link to="/notebook">Notebook</Link>
        </a>
        <a class="item">
          <Link to="/notecards">Notecards</Link>
        </a>
          <div class="right menu">
        <a class="item">
          {loggedIn ? <button onClick={this.props.logout}>Logout</button > : <Link to="/login">Login</Link>}
        </a>
      </div>
    </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    username: state.login.username,
  }
}

export default connect(mapStateToProps,null)(Navbar)
