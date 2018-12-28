import React, { Component, Fragment } from 'react';
import UserAdapter from '../adapters/UserAdapter'
import { connect } from 'react-redux'
import { setUserId, setUsername, setUser } from '../actions/login'
import { API_ROOT } from '../constants';

class Login extends Component{

  state={
    username: "",
    password: ""
  }

  handleChange = (event) =>{
    this.setState({[event.target.id]: event.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    UserAdapter.login(this.state)
    .then(data =>{
      if(!data.error){
        console.log(data, 'data from login comp');
        this.props.setUser(data.user)
        this.props.history.push('/notebook')
        localStorage.setItem("token", data.user.token)
      }
    })
  }
  // fix what happens when a new user tries to login
  handleNewUser = (event) =>{
    fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers:{
          "Content-type": "application/json"
      },
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      }
    ).then(res => res.json())
    // .then(console.log)
  }

  render(){
    const {username, password} = this.state
    return(
      <Fragment>
        <h3>Login or sign up here!</h3>
        <br/>
        <br/>
          <form onSubmit={this.handleSubmit}>
            <label> username </label>
            <input type="text" id="username" value={username} onChange={this.handleChange} />
            <br/>
            <br/>
            <label> password </label>
            <input type="password" id="password" value={password} onChange={this.handleChange} />
            <br/>
            <br/>
            <input type="submit" id="submit" value="login"/>
          </form>
          <button onClick={this.handleNewUser}>new user</button>
      </Fragment>
    )
  }
}

export default connect(null,{ setUserId, setUsername, setUser })(Login)
