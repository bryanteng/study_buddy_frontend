import React, { Component, Fragment } from 'react';
import UserAdapter from '../adapters/UserAdapter'
import { connect } from 'react-redux'
import { setUserId } from '../actions/login'

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
        this.props.setUserId(data.user.user_id)
        this.props.history.push('/notebook')
        localStorage.setItem("token", data.user.token)
      }
    })
  }

  render(){
    const {username, password} = this.state
    return(
      <Fragment>
        <div>"lol a login page XD"</div>
          <form onSubmit={this.handleSubmit}>
            <label> username </label>
            <input type="text" id="username" value={username} onChange={this.handleChange} />
            <br/>
            <br/>
            <label> password </label>
            <input type="password" id="password" value={password} onChange={this.handleChange} />
            <br/>
            <br/>
            <input type="submit" id="submit" />
          </form>
      </Fragment>
    )
  }
}

export default connect(null,{ setUserId })(Login)
